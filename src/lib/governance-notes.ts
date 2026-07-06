import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const GOVERNANCE_SUBJECT_KEY = "governance" as const;

export const GOVERNANCE_TOPIC_IDS = [
  "governance-topic01",
  "governance-topic02",
  "governance-topic03",
  "governance-topic04",
  "governance-topic05",
  "governance-topic06",
  "governance-topic07",
  "governance-topic08",
  "governance-topic09",
  "governance-topic10",
  "governance-topic11",
  "governance-topic12",
  "governance-topic13",
  "governance-topic14",
  "governance-topic15",
  "governance-topic16",
] as const;

export type GovernanceTopicId = (typeof GOVERNANCE_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(GOVERNANCE_TOPIC_IDS);

export function isGovernanceTopicId(value: string): value is GovernanceTopicId {
  return topicIdSet.has(value);
}

export const GOVERNANCE_BASE = `/${SUBJECT_SLUG.governance}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getGovernanceTopicSlug(topicId: GovernanceTopicId): string {
  const chapter = getGovernanceChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function governanceTopicPath(topicId: string): string {
  if (!isGovernanceTopicId(topicId)) {
    return `${GOVERNANCE_BASE}/${topicId}`;
  }
  return `${GOVERNANCE_BASE}/${getGovernanceTopicSlug(topicId)}`;
}

export function isGovernanceTopicSlug(slug: string): boolean {
  return getGovernanceChapters().some(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
}

export function getGovernanceTopicIdBySlug(
  slug: string,
): GovernanceTopicId | null {
  const chapter = getGovernanceChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isGovernanceTopicId(chapter.id) ? chapter.id : null;
}

export function getGovernanceChapters(): Chapter[] {
  return SYLLABUS_DATA.governance.chapters.filter((ch) =>
    isGovernanceTopicId(ch.id),
  );
}

export function getGovernanceChapter(topicId: string): Chapter | undefined {
  return getGovernanceChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentGovernanceTopics(topicId: GovernanceTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getGovernanceChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
