import { SiteNavbar } from "@/components/SiteNavbar";
import { FAQ } from "@/components/seo/FAQ";
import { PageSEO } from "@/components/seo/SEO";
import { TopicPageSections } from "@/components/notes/TopicPageSections";
import { RelatedTopics } from "@/components/notes/RelatedTopics";
import { generateTopicFaqs } from "@/lib/seo/faqs";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { subjectHubPath, UPSC_HUB_PATH } from "@/lib/seo";
import type { Chapter } from "@/lib/upsc-syllabus/types";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus";
import "@/styles/seo.css";
import "@/styles/topic-notes.css";

type TopicPageLayoutProps = {
  subjectKey: SubjectKey;
  chapter: Chapter;
  children?: React.ReactNode;
};

export function TopicPageLayout({
  subjectKey,
  chapter,
  children,
}: TopicPageLayoutProps) {
  const subject = SYLLABUS_DATA[subjectKey];
  const faqs = generateTopicFaqs(subjectKey, chapter);
  const breadcrumbs = [
    { label: "Home", href: UPSC_HUB_PATH },
    { label: subject.name, href: subjectHubPath(subjectKey) },
    { label: chapter.title },
  ];

  return (
    <div className="notes-topic-page">
      <PageSEO
        schemas={[articleSchema(subjectKey, chapter), breadcrumbSchema(breadcrumbs)]}
      />
      <SiteNavbar
        variant="notes"
        breadcrumbs={breadcrumbs}
        backHref={subjectHubPath(subjectKey)}
        backLabel={`← ${subject.name}`}
      />
      {!children ? (
        <TopicPageSections subjectKey={subjectKey} chapter={chapter} />
      ) : (
        children
      )}
      <RelatedTopics subjectKey={subjectKey} chapter={chapter} />
      <div className="topic-sections">
        <FAQ faqs={faqs} />
      </div>
    </div>
  );
}
