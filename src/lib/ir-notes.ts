import { SUBJECT_SLUG, titleToSlug } from "@/lib/seo/slugs";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";

export const IR_SUBJECT_KEY = "ir" as const;

export const IR_TOPIC_IDS = [
  "ir-topic01",
  "ir-topic02",
  "ir-topic03",
  "ir-topic04",
  "ir-topic05",
  "ir-topic06",
  "ir-topic07",
  "ir-topic08",
  "ir-topic09",
  "ir-topic10",
  "ir-topic11",
  "ir-topic12",
  "ir-topic13",
  "ir-topic14",
  "ir-topic15",
  "ir-topic16",
  "ir-topic17",
  "ir-topic18",
  "ir-topic19",
  "ir-topic20",
  "ir-topic21",
  "ir-topic22",
  "ir-topic23",
  "ir-topic24",
  "ir-topic25",
  "ir-topic26",
  "ir-topic27",
  "ir-topic28",
  "ir-topic29",
  "ir-topic30",
  "ir-topic31",
  "ir-topic32",
  "ir-topic33",
  "ir-topic34",
  "ir-topic35",
  "ir-topic36",
] as const;

export type IrTopicId = (typeof IR_TOPIC_IDS)[number];

const topicIdSet = new Set<string>(IR_TOPIC_IDS);

export function isIrTopicId(value: string): value is IrTopicId {
  return topicIdSet.has(value);
}

export const IR_BASE = `/${SUBJECT_SLUG.ir}`;

export function chapterTitleToSlug(title: string): string {
  return titleToSlug(title);
}

export function getIrTopicSlug(topicId: IrTopicId): string {
  const chapter = getIrChapter(topicId);
  return chapter ? chapterTitleToSlug(chapter.title) : topicId;
}

export function irTopicPath(topicId: string): string {
  if (!isIrTopicId(topicId)) {
    return `${IR_BASE}/${topicId}`;
  }
  return `${IR_BASE}/${getIrTopicSlug(topicId)}`;
}

export function isIrTopicSlug(slug: string): boolean {
  return getIrChapters().some((ch) => chapterTitleToSlug(ch.title) === slug);
}

export function getIrTopicIdBySlug(slug: string): IrTopicId | null {
  const chapter = getIrChapters().find(
    (ch) => chapterTitleToSlug(ch.title) === slug,
  );
  return chapter && isIrTopicId(chapter.id) ? chapter.id : null;
}

export function getIrChapters(): Chapter[] {
  return SYLLABUS_DATA.ir.chapters.filter((ch) => isIrTopicId(ch.id));
}

export function getIrChapter(topicId: string): Chapter | undefined {
  return getIrChapters().find((ch) => ch.id === topicId);
}

export function getAdjacentIrTopics(topicId: IrTopicId): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getIrChapters();
  const idx = chapters.findIndex((c) => c.id === topicId);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]! : null,
  };
}
