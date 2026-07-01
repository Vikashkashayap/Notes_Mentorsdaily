import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const WORLDGEO_SUBJECT_KEY = "worldgeo" as const;

export const WORLDGEO_TOPIC_IDS = [
  "worldgeo-topic01",
  "worldgeo-topic02",
  "worldgeo-topic03",
  "worldgeo-topic04",
  "worldgeo-topic05",
  "worldgeo-topic06",
  "worldgeo-topic07",
  "worldgeo-topic08",
  "worldgeo-topic09",
  "worldgeo-topic10",
  "worldgeo-topic11",
  "worldgeo-topic12",
  "worldgeo-topic13",
  "worldgeo-topic14",
] as const;

export type WorldGeoTopicId = (typeof WORLDGEO_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(WORLDGEO_TOPIC_IDS);

export function isWorldGeoTopicId(value: string): value is WorldGeoTopicId {
  return topicIdSet.has(value);
}

export const WORLD_GEOGRAPHY_BASE = `/${SUBJECT_SLUG.worldgeo}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getWorldGeoTopicSlug(topicId: WorldGeoTopicId): string {
  const chapter = getWorldGeoChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function worldGeoTopicPath(topicId: string): string {
  if (!isWorldGeoTopicId(topicId)) {
    return `${WORLD_GEOGRAPHY_BASE}/${topicId}`;
  }
  return `${WORLD_GEOGRAPHY_BASE}/${getWorldGeoTopicSlug(topicId)}`;
}

export function isWorldGeoTopicSlug(slug: string): boolean {
  return getWorldGeoChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getWorldGeoTopicIdBySlug(slug: string): WorldGeoTopicId | null {
  const chapter = getWorldGeoChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isWorldGeoTopicId(chapter.id) ? chapter.id : null;
}

export function getWorldGeoChapters(): Chapter[] {
  return SYLLABUS_DATA.worldgeo.chapters.filter((ch) =>
    isWorldGeoTopicId(ch.id),
  );
}

export function getWorldGeoChapter(topicId: string): Chapter | undefined {
  return getWorldGeoChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentWorldGeoTopics(topicId: WorldGeoTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getWorldGeoChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
