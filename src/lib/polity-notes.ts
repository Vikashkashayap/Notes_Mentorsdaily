import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const POLITY_SUBJECT_KEY = "polity" as const;

export const POLITY_TOPIC_IDS = [
  "polity-topic01",
  "polity-topic02",
  "polity-topic03",
  "polity-topic04",
  "polity-topic05",
  "polity-topic06",
  "polity-topic07",
  "polity-topic08",
  "polity-topic09",
  "polity-topic10",
  "polity-topic11",
  "polity-topic12",
  "polity-topic13",
  "polity-topic14",
  "polity-topic15",
  "polity-topic16",
  "polity-topic17",
  "polity-topic18",
  "polity-topic19",
  "polity-topic20",
  "polity-topic21",
  "polity-topic22",
] as const;

export type PolityTopicId = (typeof POLITY_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(POLITY_TOPIC_IDS);

export function isPolityTopicId(value: string): value is PolityTopicId {
  return topicIdSet.has(value);
}

export const POLITY_BASE = `/${SUBJECT_SLUG.polity}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getPolityTopicSlug(topicId: PolityTopicId): string {
  const chapter = getPolityChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function polityTopicPath(topicId: string): string {
  if (!isPolityTopicId(topicId)) {
    return `${POLITY_BASE}/${topicId}`;
  }
  return `${POLITY_BASE}/${getPolityTopicSlug(topicId)}`;
}

export function isPolityTopicSlug(slug: string): boolean {
  return getPolityChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getPolityTopicIdBySlug(slug: string): PolityTopicId | null {
  const chapter = getPolityChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isPolityTopicId(chapter.id) ? chapter.id : null;
}

export function getPolityChapters(): Chapter[] {
  return SYLLABUS_DATA.polity.chapters.filter((ch) =>
    isPolityTopicId(ch.id),
  );
}

export function getPolityChapter(topicId: string): Chapter | undefined {
  return getPolityChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentPolityTopics(topicId: PolityTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getPolityChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
