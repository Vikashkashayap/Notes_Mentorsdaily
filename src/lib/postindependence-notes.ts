import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const POSTINDEPENDENCE_SUBJECT_KEY = "postindependence" as const;

export const POSTINDEPENDENCE_TOPIC_IDS = [
  "postindependence-topic01",
  "postindependence-topic02",
  "postindependence-topic03",
  "postindependence-topic04",
  "postindependence-topic05",
  "postindependence-topic06",
  "postindependence-topic07",
  "postindependence-topic08",
  "postindependence-topic09",
  "postindependence-topic10",
  "postindependence-topic11",
  "postindependence-topic12",
  "postindependence-topic13",
  "postindependence-topic14",
  "postindependence-topic15",
  "postindependence-topic16",
  "postindependence-topic17",
  "postindependence-topic18",
] as const;

export type PostindependenceTopicId =
  (typeof POSTINDEPENDENCE_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(POSTINDEPENDENCE_TOPIC_IDS);

export function isPostindependenceTopicId(
  value: string,
): value is PostindependenceTopicId {
  return topicIdSet.has(value);
}

export const POSTINDEPENDENCE_BASE = `/${SUBJECT_SLUG.postindependence}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getPostindependenceTopicSlug(
  topicId: PostindependenceTopicId,
): string {
  const chapter = getPostindependenceChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function postindependenceTopicPath(topicId: string): string {
  if (!isPostindependenceTopicId(topicId)) {
    return `${POSTINDEPENDENCE_BASE}/${topicId}`;
  }
  return `${POSTINDEPENDENCE_BASE}/${getPostindependenceTopicSlug(topicId)}`;
}

export function isPostindependenceTopicSlug(slug: string): boolean {
  return getPostindependenceChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getPostindependenceTopicIdBySlug(
  slug: string,
): PostindependenceTopicId | null {
  const chapter = getPostindependenceChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isPostindependenceTopicId(chapter.id) ? chapter.id : null;
}

export function getPostindependenceChapters(): Chapter[] {
  return SYLLABUS_DATA.postindependence.chapters.filter((ch) =>
    isPostindependenceTopicId(ch.id),
  );
}

export function getPostindependenceChapter(
  topicId: string,
): Chapter | undefined {
  return getPostindependenceChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentPostindependenceTopics(
  topicId: PostindependenceTopicId,
): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getPostindependenceChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
