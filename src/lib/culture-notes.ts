import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const CULTURE_SUBJECT_KEY = "culture" as const;

export const CULTURE_TOPIC_IDS = [
  "culture-topic01a",
  "culture-topic01b",
  "culture-topic02",
  "culture-topic03",
  "culture-topic04a",
  "culture-topic04b",
  "culture-topic05",
  "culture-topic06",
  "culture-topic07",
  "culture-topic08",
  "culture-topic09",
  "culture-topic10",
  "culture-topic11",
  "culture-topic12",
  "culture-topic13",
  "culture-topic14",
  "culture-topic15",
  "culture-topic16",
  "culture-topic17",
  "culture-topic18",
  "culture-topic19",
  "culture-topic20",
  "culture-topic21",
  "culture-topic22",
  "culture-topic23",
  "culture-topic24",
  "culture-topic25",
] as const;

export type CultureTopicId = (typeof CULTURE_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(CULTURE_TOPIC_IDS);

export function isCultureTopicId(value: string): value is CultureTopicId {
  return topicIdSet.has(value);
}

export const CULTURE_BASE = `/${SUBJECT_SLUG.culture}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getCultureTopicSlug(topicId: CultureTopicId): string {
  const chapter = getCultureChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function cultureTopicPath(topicId: string): string {
  if (!isCultureTopicId(topicId)) {
    return `${CULTURE_BASE}/${topicId}`;
  }
  return `${CULTURE_BASE}/${getCultureTopicSlug(topicId)}`;
}

export function isCultureTopicSlug(slug: string): boolean {
  return getCultureChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getCultureTopicIdBySlug(slug: string): CultureTopicId | null {
  const chapter = getCultureChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isCultureTopicId(chapter.id) ? chapter.id : null;
}

export function getCultureChapters(): Chapter[] {
  return SYLLABUS_DATA.culture.chapters.filter((ch) =>
    isCultureTopicId(ch.id),
  );
}

export function getCultureChapter(topicId: string): Chapter | undefined {
  return getCultureChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentCultureTopics(topicId: CultureTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getCultureChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
