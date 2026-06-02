import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicNotesBody } from "@/components/notes/TopicNotesBody";
import { TopicNotesEnhancements } from "@/components/notes/TopicNotesEnhancements";
import { TopicNotesFooterNav } from "@/components/notes/TopicNotesFooterNav";
import { TopicPageLayout } from "@/components/notes/TopicPageLayout";
import { EthicsTopicFooterNav } from "@/components/notes/EthicsTopicFooterNav";
import { EthicsTopicNotesBody } from "@/components/notes/EthicsTopicNotesBody";
import { MedievalTopicFooterNav } from "@/components/notes/MedievalTopicFooterNav";
import { MedievalTopicNotesBody } from "@/components/notes/MedievalTopicNotesBody";
import { buildTopicMetadata, publisherMetadata } from "@/lib/seo/metadata";
import { getChapterByTopicSlug } from "@/lib/seo/routes";
import {
  getAllTopicPaths,
  resolveSubjectFromParam,
} from "@/lib/seo/routes";
import { SUBJECT_SLUG } from "@/lib/seo/slugs";
import { isAncientTopicId, type AncientTopicId } from "@/lib/ancient-notes";
import { isEthicsTopicId, type EthicsTopicId } from "@/lib/ethics-notes";
import { isMedievalTopicId, type MedievalTopicId } from "@/lib/medieval-notes";

export const revalidate = 86400;

const RESERVED_SLUGS = new Set([
  "upsc-notes",
  "search",
  "api",
  "admin",
  "dashboard",
]);

type PageProps = {
  params: Promise<{ subjectSlug: string; topicSlug: string }>;
};

export function generateStaticParams() {
  return getAllTopicPaths().map(({ subjectKey, slug }) => ({
    subjectSlug: SUBJECT_SLUG[subjectKey],
    topicSlug: slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subjectSlug, topicSlug } = await params;
  const subjectKey = resolveSubjectFromParam(subjectSlug);
  if (!subjectKey) return { title: "Not Found" };
  const chapter = getChapterByTopicSlug(subjectKey, topicSlug);
  if (!chapter || chapter.status !== "live") return { title: "Not Found" };
  return { ...buildTopicMetadata(subjectKey, chapter), ...publisherMetadata };
}

export default async function TopicPage({ params }: PageProps) {
  const { subjectSlug, topicSlug } = await params;
  if (RESERVED_SLUGS.has(subjectSlug)) notFound();
  const subjectKey = resolveSubjectFromParam(subjectSlug);
  if (!subjectKey) notFound();

  const chapter = getChapterByTopicSlug(subjectKey, topicSlug);
  if (!chapter || chapter.status !== "live") notFound();

  const isAncient =
    subjectKey === "ancient" && isAncientTopicId(chapter.id);
  const isMedieval =
    subjectKey === "medieval" && isMedievalTopicId(chapter.id);
  const isEthics = subjectKey === "ethics" && isEthicsTopicId(chapter.id);

  if (isAncient) {
    const topicId = chapter.id as AncientTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <TopicNotesBody topicId={topicId} />
        <TopicNotesFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isMedieval) {
    const topicId = chapter.id as MedievalTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <MedievalTopicNotesBody topicId={topicId} />
        <MedievalTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isEthics) {
    const topicId = chapter.id as EthicsTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <EthicsTopicNotesBody topicId={topicId} />
        <EthicsTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  return <TopicPageLayout subjectKey={subjectKey} chapter={chapter} />;
}
