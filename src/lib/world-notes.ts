import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const WORLD_SUBJECT_KEY = "worldhistory" as const;

export const WORLD_TOPIC_IDS = [
  "world-topic01",
  "world-topic02",
  "world-topic03",
  "world-topic04",
  "world-topic05",
  "world-topic06",
  "world-topic07",
  "world-topic08",
  "world-topic09",
  "world-topic10",
  "world-topic11",
  "world-topic12",
  "world-topic13",
  "world-topic14",
  "world-topic15",
  "world-topic16",
  "world-topic17",
  "world-topic18",
] as const;

export type WorldTopicId = (typeof WORLD_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(WORLD_TOPIC_IDS);

export function isWorldTopicId(value: string): value is WorldTopicId {
  return topicIdSet.has(value);
}

export const WORLD_HISTORY_BASE = `/${SUBJECT_SLUG.worldhistory}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getWorldTopicSlug(topicId: WorldTopicId): string {
  const chapter = getWorldChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function worldTopicPath(topicId: string): string {
  if (!isWorldTopicId(topicId)) {
    return `${WORLD_HISTORY_BASE}/${topicId}`;
  }
  return `${WORLD_HISTORY_BASE}/${getWorldTopicSlug(topicId)}`;
}

export function isWorldTopicSlug(slug: string): boolean {
  return getWorldChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getWorldTopicIdBySlug(slug: string): WorldTopicId | null {
  const chapter = getWorldChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isWorldTopicId(chapter.id) ? chapter.id : null;
}

export function getWorldChapters(): Chapter[] {
  return SYLLABUS_DATA.worldhistory.chapters.filter((ch) =>
    isWorldTopicId(ch.id),
  );
}

export function getWorldChapter(topicId: string): Chapter | undefined {
  return getWorldChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentWorldTopics(topicId: WorldTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getWorldChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
