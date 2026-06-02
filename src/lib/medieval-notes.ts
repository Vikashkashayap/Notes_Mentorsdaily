import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const MEDIEVAL_SUBJECT_KEY = "medieval" as const;

export const MEDIEVAL_TOPIC_IDS = [
  "medieval-topic01",
  "medieval-topic02",
  "medieval-topic03",
  "medieval-topic04",
  "medieval-topic05",
  "medieval-topic06",
  "medieval-topic07",
  "medieval-topic08",
] as const;

export type MedievalTopicId = (typeof MEDIEVAL_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(MEDIEVAL_TOPIC_IDS);

export function isMedievalTopicId(value: string): value is MedievalTopicId {
  return topicIdSet.has(value);
}

export const MEDIEVAL_HISTORY_BASE = `/${SUBJECT_SLUG.medieval}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getMedievalTopicSlug(topicId: MedievalTopicId): string {
  const chapter = getMedievalChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function medievalTopicPath(topicId: string): string {
  if (!isMedievalTopicId(topicId)) {
    return `${MEDIEVAL_HISTORY_BASE}/${topicId}`;
  }
  return `${MEDIEVAL_HISTORY_BASE}/${getMedievalTopicSlug(topicId)}`;
}

export function isMedievalTopicSlug(slug: string): boolean {
  return getMedievalChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getMedievalTopicIdBySlug(slug: string): MedievalTopicId | null {
  const chapter = getMedievalChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isMedievalTopicId(chapter.id) ? chapter.id : null;
}

export function getMedievalChapters(): Chapter[] {
  return SYLLABUS_DATA.medieval.chapters.filter((ch) =>
    isMedievalTopicId(ch.id),
  );
}

export function getMedievalChapter(topicId: string): Chapter | undefined {
  return getMedievalChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentMedievalTopics(topicId: MedievalTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getMedievalChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
