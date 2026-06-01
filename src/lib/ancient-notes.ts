import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const ANCIENT_SUBJECT_KEY = "ancient" as const;

export const ANCIENT_TOPIC_IDS = [
  "ancient-topic01",
  "ancient-topic02",
  "ancient-topic03",
  "ancient-topic04",
  "ancient-topic05",
  "ancient-topic06",
  "ancient-topic07",
  "ancient-topic08",
  "ancient-topic09",
  "ancient-topic10",
  "ancient-topic11",
  "ancient-topic12",
] as const;

export type AncientTopicId = (typeof ANCIENT_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(ANCIENT_TOPIC_IDS);

export function isAncientTopicId(value: string): value is AncientTopicId {
  return topicIdSet.has(value);
}

export const ANCIENT_HISTORY_BASE = `/${SUBJECT_SLUG.ancient}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getAncientTopicSlug(topicId: AncientTopicId): string {
  const chapter = getAncientChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function ancientTopicPath(topicId: string): string {
  if (!isAncientTopicId(topicId)) {
    return `${ANCIENT_HISTORY_BASE}/${topicId}`;
  }
  return `${ANCIENT_HISTORY_BASE}/${getAncientTopicSlug(topicId)}`;
}

export function isAncientTopicSlug(slug: string): boolean {
  return getAncientChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getAncientTopicIdBySlug(slug: string): AncientTopicId | null {
  const chapter = getAncientChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isAncientTopicId(chapter.id) ? chapter.id : null;
}

export function getAncientChapters(): Chapter[] {
  return SYLLABUS_DATA.ancient.chapters.filter((ch) =>
    isAncientTopicId(ch.id),
  );
}

export function getAncientChapter(topicId: string): Chapter | undefined {
  return getAncientChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentTopics(topicId: AncientTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getAncientChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
