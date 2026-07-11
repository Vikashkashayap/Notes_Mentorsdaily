import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const ENVIRONMENT_SUBJECT_KEY = "environment" as const;

export const ENVIRONMENT_TOPIC_IDS = [
  "environment-topic01",
  "environment-topic02",
  "environment-topic03",
  "environment-topic04",
  "environment-topic05",
  "environment-topic06",
  "environment-topic07",
  "environment-topic08",
  "environment-topic09",
  "environment-topic10",
  "environment-topic11",
  "environment-topic12",
  "environment-topic13",
  "environment-topic14",
  "environment-topic15",
  "environment-topic16",
  "environment-topic17",
  "environment-topic18",
  "environment-topic19",
  "environment-topic20",
  "environment-topic21",
  "environment-topic22",
  "environment-topic23",
  "environment-topic24",
  "environment-topic25",
  "environment-topic26",
  "environment-topic27",
  "environment-topic28",
  "environment-topic29",
  "environment-topic30",
  "environment-topic31",
  "environment-topic32",
  "environment-topic33",
  "environment-topic34",
  "environment-topic35",
  "environment-topic36",
  "environment-topic37",
  "environment-topic38",
  "environment-topic39",
] as const;

export type EnvironmentTopicId = (typeof ENVIRONMENT_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(ENVIRONMENT_TOPIC_IDS);

export function isEnvironmentTopicId(
  value: string,
): value is EnvironmentTopicId {
  return topicIdSet.has(value);
}

export const ENVIRONMENT_BASE = `/${SUBJECT_SLUG.environment}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getEnvironmentTopicSlug(topicId: EnvironmentTopicId): string {
  const chapter = getEnvironmentChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function environmentTopicPath(topicId: string): string {
  if (!isEnvironmentTopicId(topicId)) {
    return `${ENVIRONMENT_BASE}/${topicId}`;
  }
  return `${ENVIRONMENT_BASE}/${getEnvironmentTopicSlug(topicId)}`;
}

export function isEnvironmentTopicSlug(slug: string): boolean {
  return getEnvironmentChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getEnvironmentTopicIdBySlug(
  slug: string,
): EnvironmentTopicId | null {
  const chapter = getEnvironmentChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isEnvironmentTopicId(chapter.id) ? chapter.id : null;
}

export function getEnvironmentChapters(): Chapter[] {
  return SYLLABUS_DATA.environment.chapters.filter((ch) =>
    isEnvironmentTopicId(ch.id),
  );
}

export function getEnvironmentChapter(topicId: string): Chapter | undefined {
  return getEnvironmentChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentEnvironmentTopics(topicId: EnvironmentTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getEnvironmentChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
