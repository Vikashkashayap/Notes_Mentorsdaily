import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const ETHICS_SUBJECT_KEY = "ethics" as const;

export const ETHICS_TOPIC_IDS = [
  "ethics-topic01",
  "ethics-topic02",
  "ethics-topic03",
  "ethics-topic04",
  "ethics-topic05",
  "ethics-topic06",
  "ethics-topic07",
  "ethics-topic08",
  "ethics-topic09",
] as const;

export type EthicsTopicId = (typeof ETHICS_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(ETHICS_TOPIC_IDS);

export function isEthicsTopicId(value: string): value is EthicsTopicId {
  return topicIdSet.has(value);
}

export const ETHICS_BASE = `/${SUBJECT_SLUG.ethics}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getEthicsTopicSlug(topicId: EthicsTopicId): string {
  const chapter = getEthicsChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function ethicsTopicPath(topicId: string): string {
  if (!isEthicsTopicId(topicId)) {
    return `${ETHICS_BASE}/${topicId}`;
  }
  return `${ETHICS_BASE}/${getEthicsTopicSlug(topicId)}`;
}

export function isEthicsTopicSlug(slug: string): boolean {
  return getEthicsChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getEthicsTopicIdBySlug(slug: string): EthicsTopicId | null {
  const chapter = getEthicsChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isEthicsTopicId(chapter.id) ? chapter.id : null;
}

export function getEthicsChapters(): Chapter[] {
  return SYLLABUS_DATA.ethics.chapters.filter((ch) =>
    isEthicsTopicId(ch.id),
  );
}

export function getEthicsChapter(topicId: string): Chapter | undefined {
  return getEthicsChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentEthicsTopics(topicId: EthicsTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getEthicsChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
