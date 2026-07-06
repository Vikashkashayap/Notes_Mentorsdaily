import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const ECONOMY_SUBJECT_KEY = "economy" as const;

export const ECONOMY_TOPIC_IDS = [
  "economy-topic01",
  "economy-topic02",
  "economy-topic03",
  "economy-topic04",
  "economy-topic05",
  "economy-topic06",
  "economy-topic07",
  "economy-topic08",
  "economy-topic09",
  "economy-topic10",
  "economy-topic11",
  "economy-topic12",
  "economy-topic13",
  "economy-topic14",
  "economy-topic15",
  "economy-topic16",
  "economy-topic17",
  "economy-topic18",
  "economy-topic19",
  "economy-topic20",
  "economy-topic21",
  "economy-topic22",
] as const;

export type EconomyTopicId = (typeof ECONOMY_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(ECONOMY_TOPIC_IDS);

export function isEconomyTopicId(value: string): value is EconomyTopicId {
  return topicIdSet.has(value);
}

export const ECONOMY_BASE = `/${SUBJECT_SLUG.economy}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getEconomyTopicSlug(topicId: EconomyTopicId): string {
  const chapter = getEconomyChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function economyTopicPath(topicId: string): string {
  if (!isEconomyTopicId(topicId)) {
    return `${ECONOMY_BASE}/${topicId}`;
  }
  return `${ECONOMY_BASE}/${getEconomyTopicSlug(topicId)}`;
}

export function isEconomyTopicSlug(slug: string): boolean {
  return getEconomyChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getEconomyTopicIdBySlug(slug: string): EconomyTopicId | null {
  const chapter = getEconomyChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isEconomyTopicId(chapter.id) ? chapter.id : null;
}

export function getEconomyChapters(): Chapter[] {
  return SYLLABUS_DATA.economy.chapters.filter((ch) =>
    isEconomyTopicId(ch.id),
  );
}

export function getEconomyChapter(topicId: string): Chapter | undefined {
  return getEconomyChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentEconomyTopics(topicId: EconomyTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getEconomyChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
