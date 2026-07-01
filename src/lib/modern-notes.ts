import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const MODERN_SUBJECT_KEY = "history" as const;

export const MODERN_TOPIC_IDS = [
  "modern-topic01",
  "modern-topic02",
  "modern-topic03",
  "modern-topic04",
  "modern-topic05",
  "modern-topic06",
  "modern-topic07",
  "modern-topic08",
  "modern-topic09",
  "modern-topic10",
  "modern-topic11",
  "modern-topic12",
  "modern-topic13",
  "modern-topic14",
  "modern-topic15",
  "modern-topic16",
  "modern-topic17",
  "modern-topic18",
  "modern-topic19",
] as const;

export type ModernTopicId = (typeof MODERN_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(MODERN_TOPIC_IDS);

export function isModernTopicId(value: string): value is ModernTopicId {
  return topicIdSet.has(value);
}

export const MODERN_HISTORY_BASE = `/${SUBJECT_SLUG.history}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getModernTopicSlug(topicId: ModernTopicId): string {
  const chapter = getModernChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function modernTopicPath(topicId: string): string {
  if (!isModernTopicId(topicId)) {
    return `${MODERN_HISTORY_BASE}/${topicId}`;
  }
  return `${MODERN_HISTORY_BASE}/${getModernTopicSlug(topicId)}`;
}

export function isModernTopicSlug(slug: string): boolean {
  return getModernChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getModernTopicIdBySlug(slug: string): ModernTopicId | null {
  const chapter = getModernChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isModernTopicId(chapter.id) ? chapter.id : null;
}

export function getModernChapters(): Chapter[] {
  return SYLLABUS_DATA.history.chapters.filter((ch) =>
    isModernTopicId(ch.id),
  );
}

export function getModernChapter(topicId: string): Chapter | undefined {
  return getModernChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentModernTopics(topicId: ModernTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getModernChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
