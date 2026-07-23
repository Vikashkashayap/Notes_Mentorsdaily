import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const SCIENCE_SUBJECT_KEY = "science" as const;

export const SCIENCE_TOPIC_IDS = [
  "science-topic01",
  "science-topic02",
  "science-topic03",
  "science-topic04",
  "science-topic05",
  "science-topic06",
  "science-topic07",
  "science-topic08",
  "science-topic09",
  "science-topic10",
  "science-topic11",
  "science-topic12",
  "science-topic13",
  "science-topic14",
  "science-topic15",
  "science-topic16",
  "science-topic17",
  "science-topic18",
] as const;

export type ScienceTopicId = (typeof SCIENCE_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(SCIENCE_TOPIC_IDS);

export function isScienceTopicId(value: string): value is ScienceTopicId {
  return topicIdSet.has(value);
}

export const SCIENCE_BASE = `/${SUBJECT_SLUG.science}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getScienceTopicSlug(topicId: ScienceTopicId): string {
  const chapter = getScienceChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function scienceTopicPath(topicId: string): string {
  if (!isScienceTopicId(topicId)) {
    return `${SCIENCE_BASE}/${topicId}`;
  }
  return `${SCIENCE_BASE}/${getScienceTopicSlug(topicId)}`;
}

export function isScienceTopicSlug(slug: string): boolean {
  return getScienceChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getScienceTopicIdBySlug(slug: string): ScienceTopicId | null {
  const chapter = getScienceChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isScienceTopicId(chapter.id) ? chapter.id : null;
}

export function getScienceChapters(): Chapter[] {
  return SYLLABUS_DATA.science.chapters.filter((ch) =>
    isScienceTopicId(ch.id),
  );
}

export function getScienceChapter(topicId: string): Chapter | undefined {
  return getScienceChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentScienceTopics(topicId: ScienceTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getScienceChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
