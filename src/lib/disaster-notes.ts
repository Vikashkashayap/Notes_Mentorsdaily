import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const DISASTER_SUBJECT_KEY = "disaster" as const;

export const DISASTER_TOPIC_IDS = [
  "disaster-topic01",
  "disaster-topic02",
  "disaster-topic03",
  "disaster-topic04",
  "disaster-topic05",
  "disaster-topic06",
  "disaster-topic07",
  "disaster-topic08",
  "disaster-topic09",
] as const;

export type DisasterTopicId = (typeof DISASTER_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(DISASTER_TOPIC_IDS);

export function isDisasterTopicId(value: string): value is DisasterTopicId {
  return topicIdSet.has(value);
}

export const DISASTER_BASE = `/${SUBJECT_SLUG.disaster}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getDisasterTopicSlug(topicId: DisasterTopicId): string {
  const chapter = getDisasterChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function disasterTopicPath(topicId: string): string {
  if (!isDisasterTopicId(topicId)) {
    return `${DISASTER_BASE}/${topicId}`;
  }
  return `${DISASTER_BASE}/${getDisasterTopicSlug(topicId)}`;
}

export function isDisasterTopicSlug(slug: string): boolean {
  return getDisasterChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getDisasterTopicIdBySlug(slug: string): DisasterTopicId | null {
  const chapter = getDisasterChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isDisasterTopicId(chapter.id) ? chapter.id : null;
}

export function getDisasterChapters(): Chapter[] {
  return SYLLABUS_DATA.disaster.chapters.filter((ch) =>
    isDisasterTopicId(ch.id),
  );
}

export function getDisasterChapter(topicId: string): Chapter | undefined {
  return getDisasterChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentDisasterTopics(topicId: DisasterTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getDisasterChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
