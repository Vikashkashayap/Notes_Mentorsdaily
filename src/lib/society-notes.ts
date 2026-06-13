import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const SOCIETY_SUBJECT_KEY = "society" as const;

export const SOCIETY_TOPIC_IDS = [
  "society-topic01",
  "society-topic02",
  "society-topic03",
  "society-topic04",
  "society-topic05",
  "society-topic06",
  "society-topic07",
  "society-topic08",
] as const;

export type SocietyTopicId = (typeof SOCIETY_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(SOCIETY_TOPIC_IDS);

export function isSocietyTopicId(value: string): value is SocietyTopicId {
  return topicIdSet.has(value);
}

export const SOCIETY_BASE = `/${SUBJECT_SLUG.society}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getSocietyTopicSlug(topicId: SocietyTopicId): string {
  const chapter = getSocietyChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function societyTopicPath(topicId: string): string {
  if (!isSocietyTopicId(topicId)) {
    return `${SOCIETY_BASE}/${topicId}`;
  }
  return `${SOCIETY_BASE}/${getSocietyTopicSlug(topicId)}`;
}

export function isSocietyTopicSlug(slug: string): boolean {
  return getSocietyChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getSocietyTopicIdBySlug(slug: string): SocietyTopicId | null {
  const chapter = getSocietyChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isSocietyTopicId(chapter.id) ? chapter.id : null;
}

export function getSocietyChapters(): Chapter[] {
  return SYLLABUS_DATA.society.chapters.filter((ch) =>
    isSocietyTopicId(ch.id),
  );
}

export function getSocietyChapter(topicId: string): Chapter | undefined {
  return getSocietyChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentSocietyTopics(topicId: SocietyTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getSocietyChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
