import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicNotesBody } from "@/components/notes/TopicNotesBody";
import { TopicNotesEnhancements } from "@/components/notes/TopicNotesEnhancements";
import { TopicNotesFooterNav } from "@/components/notes/TopicNotesFooterNav";
import { TopicPageLayout } from "@/components/notes/TopicPageLayout";
import {
  ANCIENT_TOPIC_IDS,
  getAncientChapter,
  getAncientTopicIdBySlug,
  getAncientTopicSlug,
  isAncientTopicSlug,
  type AncientTopicId,
} from "@/lib/ancient-notes";
import { buildTopicMetadata, publisherMetadata } from "@/lib/seo/metadata";

export const revalidate = 86400;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ANCIENT_TOPIC_IDS.map((topicId) => ({
    slug: getAncientTopicSlug(topicId),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topicId = getAncientTopicIdBySlug(slug);
  if (!topicId) return { title: "Not Found" };
  const chapter = getAncientChapter(topicId);
  if (!chapter) return { title: "Not Found" };
  return { ...buildTopicMetadata("ancient", chapter), ...publisherMetadata };
}

export default async function AncientHistoryTopicPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isAncientTopicSlug(slug)) notFound();

  const topicId = getAncientTopicIdBySlug(slug) as AncientTopicId;
  const chapter = getAncientChapter(topicId);
  if (!chapter) notFound();

  return (
    <TopicPageLayout subjectKey="ancient" chapter={chapter}>
      <TopicNotesBody topicId={topicId} />
      <TopicNotesFooterNav topicId={topicId} />
      <TopicNotesEnhancements />
    </TopicPageLayout>
  );
}
