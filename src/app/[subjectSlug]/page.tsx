import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageSEO } from "@/components/seo/SEO";
import { UpscHubTopics } from "@/components/upsc-hub/UpscHubTopics";
import { buildSubjectMetadata, publisherMetadata } from "@/lib/seo/metadata";
import {
  collectionPageSchema,
  itemListSchema,
} from "@/lib/seo/schema";
import { resolveSubjectFromParam } from "@/lib/seo/routes";
import { SUBJECT_SLUG } from "@/lib/seo/slugs";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";
import "@/styles/upsc-hub.css";

export const revalidate = 86400;

const RESERVED_SLUGS = new Set([
  "upsc-notes",
  "search",
  "api",
  "admin",
  "dashboard",
  "_next",
  "rss.xml",
]);

type PageProps = {
  params: Promise<{ subjectSlug: string }>;
};

export function generateStaticParams() {
  return (Object.values(SUBJECT_SLUG) as string[]).map((subjectSlug) => ({
    subjectSlug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subjectSlug } = await params;
  const subjectKey = resolveSubjectFromParam(subjectSlug);
  if (!subjectKey) return { title: "Not Found" };
  return { ...buildSubjectMetadata(subjectKey), ...publisherMetadata };
}

export default async function SubjectHubPage({ params }: PageProps) {
  const { subjectSlug } = await params;
  if (RESERVED_SLUGS.has(subjectSlug)) notFound();
  const subjectKey = resolveSubjectFromParam(subjectSlug);
  if (!subjectKey) notFound();

  return (
    <>
      <PageSEO
        schemas={[
          collectionPageSchema(subjectKey),
          itemListSchema(subjectKey),
        ]}
      />
      <UpscHubTopics subjectKey={subjectKey} />
    </>
  );
}
