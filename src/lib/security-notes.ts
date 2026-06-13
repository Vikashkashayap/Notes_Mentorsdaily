import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const SECURITY_SUBJECT_KEY = "security" as const;

export const SECURITY_TOPIC_IDS = [
  "security-topic01",
  "security-topic02",
  "security-topic03",
  "security-topic04",
  "security-topic05",
  "security-topic06",
  "security-topic07",
  "security-topic08",
  "security-topic09",
  "security-topic10",
  "security-topic11",
  "security-topic12",
  "security-topic13",
] as const;

export type SecurityTopicId = (typeof SECURITY_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(SECURITY_TOPIC_IDS);

export function isSecurityTopicId(value: string): value is SecurityTopicId {
  return topicIdSet.has(value);
}

export const SECURITY_BASE = `/${SUBJECT_SLUG.security}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getSecurityTopicSlug(topicId: SecurityTopicId): string {
  const chapter = getSecurityChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function securityTopicPath(topicId: string): string {
  if (!isSecurityTopicId(topicId)) {
    return `${SECURITY_BASE}/${topicId}`;
  }
  return `${SECURITY_BASE}/${getSecurityTopicSlug(topicId)}`;
}

export function isSecurityTopicSlug(slug: string): boolean {
  return getSecurityChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getSecurityTopicIdBySlug(slug: string): SecurityTopicId | null {
  const chapter = getSecurityChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isSecurityTopicId(chapter.id) ? chapter.id : null;
}

export function getSecurityChapters(): Chapter[] {
  return SYLLABUS_DATA.security.chapters.filter((ch) =>
    isSecurityTopicId(ch.id),
  );
}

export function getSecurityChapter(topicId: string): Chapter | undefined {
  return getSecurityChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentSecurityTopics(topicId: SecurityTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getSecurityChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
