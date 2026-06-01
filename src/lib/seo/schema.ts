import type { FaqItem } from "./faqs";

export type SchemaBreadcrumbItem = { label: string; href?: string };
import type { Chapter } from "@/lib/upsc-syllabus/types";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import {
  ORG_NAME,
  SITE_BRAND,
  SITE_NAME,
  SITE_URL,
  UPSC_EXAM_YEAR,
} from "./constants";
import { absoluteUrl, SEARCH_PATH, subjectHubPath, topicPath } from "./routes";

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_BRAND,
    url: SITE_URL,
    description:
      "India's dedicated UPSC Notes platform — IAS study material for Prelims and Mains.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${SEARCH_PATH}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function educationalOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_BRAND,
    url: SITE_URL,
    description: "UPSC exam preparation — free structured notes for IAS aspirants.",
    areaServed: "IN",
    knowsAbout: [
      "UPSC Civil Services Examination",
      "IAS preparation",
      "UPSC Prelims",
      "UPSC Mains",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Free UPSC Notes",
    },
  };
}

export function breadcrumbSchema(
  items: SchemaBreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function faqPageSchema(faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function articleSchema(
  subjectKey: SubjectKey,
  chapter: Chapter,
): Record<string, unknown> {
  const subject = SYLLABUS_DATA[subjectKey];
  const url = absoluteUrl(topicPath(subjectKey, chapter.id));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${chapter.title} Notes for UPSC ${UPSC_EXAM_YEAR}`,
    description: chapter.sub,
    author: { "@type": "Organization", name: ORG_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/mentors-daily-logo.png`,
      },
    },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: subject.name,
    keywords: (chapter.tags ?? []).join(", "),
    about: chapter.tags ?? [chapter.title],
    isAccessibleForFree: true,
    inLanguage: "en-IN",
  };
}

export function collectionPageSchema(
  subjectKey: SubjectKey,
): Record<string, unknown> {
  const subject = SYLLABUS_DATA[subjectKey];
  const url = absoluteUrl(subjectHubPath(subjectKey));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${subject.name} UPSC Notes`,
    description: subject.description,
    url,
    isPartOf: { "@type": "WebSite", url: SITE_URL },
    about: subject.name,
  };
}

export function itemListSchema(
  subjectKey: SubjectKey,
): Record<string, unknown> {
  const subject = SYLLABUS_DATA[subjectKey];
  const url = absoluteUrl(subjectHubPath(subjectKey));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${subject.name} — Topic List`,
    url,
    numberOfItems: subject.chapters.length,
    itemListElement: subject.chapters.map((ch, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: ch.title,
      url: absoluteUrl(topicPath(subjectKey, ch.id)),
    })),
  };
}

export function homeItemListSchema(): Record<string, unknown> {
  const subjects = Object.keys(SYLLABUS_DATA) as SubjectKey[];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UPSC Notes Subjects",
    url: SITE_URL,
    numberOfItems: subjects.length,
    itemListElement: subjects.map((key, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: SYLLABUS_DATA[key].name,
      url: absoluteUrl(subjectHubPath(key)),
    })),
  };
}
