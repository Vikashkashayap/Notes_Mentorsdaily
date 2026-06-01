import type { Metadata } from "next";
import type { Chapter } from "@/lib/upsc-syllabus/types";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  ORG_NAME,
  PRIMARY_KEYWORDS,
  SITE_BRAND,
  SITE_NAME,
  SITE_URL,
  UPSC_EXAM_YEAR,
} from "./constants";
import { absoluteUrl, subjectHubPath, topicPath } from "./routes";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export function buildTopicTitle(topicName: string, subtitle?: string): string {
  const detail = subtitle ? ` | ${subtitle}` : "";
  return `${topicName} Notes for UPSC ${UPSC_EXAM_YEAR} | Prelims + Mains${detail} | ${SITE_BRAND}`;
}

export function buildTopicDescription(
  topicName: string,
  subjectName: string,
  chapter?: Chapter,
): string {
  const prelims = chapter?.prelims ? `Prelims (${chapter.prelims} Qs).` : "Prelims.";
  const mains = chapter?.mains ? `Mains (${chapter.mains} Qs).` : "Mains.";
  const raw = `${topicName} UPSC notes for ${subjectName}. ${prelims} ${mains} PYQs, key concepts & exam tips for IAS ${UPSC_EXAM_YEAR}.`;
  return truncate(raw, 155);
}

export function buildSubjectTitle(subjectName: string): string {
  return `${subjectName} Notes for UPSC ${UPSC_EXAM_YEAR} | Prelims + Mains | ${SITE_BRAND}`;
}

export function buildSubjectDescription(
  subjectName: string,
  description: string,
): string {
  return truncate(
    `${subjectName} UPSC notes — Prelims & Mains study material, PYQs & syllabus-wise topics for IAS ${UPSC_EXAM_YEAR}. ${description}`,
    155,
  );
}

export function buildHomeMetadata(): Metadata {
  const title = `UPSC Notes & IAS Study Material ${UPSC_EXAM_YEAR} | Prelims + Mains | ${SITE_BRAND}`;
  const description = truncate(
    "Free UPSC Notes & IAS study material — Indian Polity, History, Geography, Economy, Environment & Current Affairs. Prelims + Mains PYQs for UPSC 2027.",
    155,
  );
  const canonical = SITE_URL;

  return {
    title,
    description,
    keywords: [...PRIMARY_KEYWORDS],
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title,
      description,
      url: canonical,
      type: "website",
    }),
    twitter: buildTwitter({ title, description }),
    robots: { index: true, follow: true },
  };
}

type OgInput = {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildOpenGraph(input: OgInput): Metadata["openGraph"] {
  const imageUrl = `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  return {
    title: input.title,
    description: input.description,
    url: input.url,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: input.type ?? "website",
    images: [
      {
        url: imageUrl,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: `${SITE_NAME} — UPSC Notes Open Graph`,
      },
    ],
    ...(input.publishedTime
      ? { publishedTime: input.publishedTime }
      : undefined),
    ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : undefined),
  };
}

export function buildTwitter(input: {
  title: string;
  description: string;
}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: input.title,
    description: input.description,
    images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
  };
}

export function buildTopicMetadata(
  subjectKey: SubjectKey,
  chapter: Chapter,
): Metadata {
  const subject = SYLLABUS_DATA[subjectKey];
  const title = buildTopicTitle(chapter.title, chapter.sub);
  const description = buildTopicDescription(
    chapter.title,
    subject.name,
    chapter,
  );
  const path = topicPath(subjectKey, chapter.id);
  const url = absoluteUrl(path);
  const keywords = [
    `${chapter.title} UPSC`,
    `${chapter.title} notes`,
    "UPSC Prelims",
    "UPSC Mains",
    subject.name,
    ...(chapter.tags ?? []).slice(0, 8),
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: buildOpenGraph({
      title,
      description,
      url,
      type: "article",
      publishedTime: "2026-01-01",
      modifiedTime: new Date().toISOString().slice(0, 10),
    }),
    twitter: buildTwitter({ title, description }),
    robots: { index: true, follow: true },
  };
}

export function buildSubjectMetadata(subjectKey: SubjectKey): Metadata {
  const subject = SYLLABUS_DATA[subjectKey];
  const title = buildSubjectTitle(subject.name);
  const description = buildSubjectDescription(subject.name, subject.description);
  const path = subjectHubPath(subjectKey);
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [
      `${subject.name} UPSC`,
      `${subject.name} notes`,
      "UPSC study material",
      "IAS notes",
      subject.paper,
    ],
    alternates: { canonical: path },
    openGraph: buildOpenGraph({ title, description, url, type: "website" }),
    twitter: buildTwitter({ title, description }),
    robots: { index: true, follow: true },
  };
}

export function buildSearchMetadata(query: string): Metadata {
  const q = query.trim();
  const title = q
    ? `Search: ${q} | UPSC Notes | ${SITE_BRAND}`
    : `Search UPSC Notes | ${SITE_BRAND}`;
  const description = q
    ? truncate(`Search results for "${q}" across UPSC notes — Prelims, Mains & PYQs on ${SITE_NAME}.`, 155)
    : "Search Indian Polity, History, Geography, Economy, Environment & Current Affairs UPSC notes.";

  const path = q ? `/search?q=${encodeURIComponent(q)}` : "/search";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: buildOpenGraph({
      title,
      description,
      url: absoluteUrl(path),
      type: "website",
    }),
    twitter: buildTwitter({ title, description }),
    robots: { index: true, follow: true },
  };
}

export const publisherMetadata: Pick<
  Metadata,
  "creator" | "publisher" | "applicationName"
> = {
  creator: ORG_NAME,
  publisher: SITE_BRAND,
  applicationName: `${SITE_NAME} Notes`,
};
