import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";
import { getChapterHref, topicPath } from "./routes";

export type RelatedTopic = {
  id: string;
  title: string;
  sub: string;
  href: string;
};

/** Topic-cluster internal links: same subject, priority + tag overlap. */
export function getRelatedTopics(
  subjectKey: SubjectKey,
  chapter: Chapter,
  limit = 6,
): RelatedTopic[] {
  const subject = SYLLABUS_DATA[subjectKey];
  const tags = new Set((chapter.tags ?? []).map((t) => t.toLowerCase()));

  const scored = subject.chapters
    .filter((ch) => ch.id !== chapter.id)
    .map((ch) => {
      let score = 0;
      if (ch.priority === chapter.priority) score += 2;
      if (ch.status === "live") score += 3;
      for (const t of ch.tags ?? []) {
        if (tags.has(t.toLowerCase())) score += 4;
      }
      if (Math.abs(ch.prelims - chapter.prelims) <= 2) score += 1;
      return { ch, score };
    })
    .sort((a, b) => b.score - a.score);

  const results: RelatedTopic[] = [];
  for (const { ch } of scored) {
    const href = getChapterHref(ch, subjectKey);
    if (!href && ch.status !== "live") continue;
    results.push({
      id: ch.id,
      title: ch.title,
      sub: ch.sub,
      href: href ?? topicPath(subjectKey, ch.id),
    });
    if (results.length >= limit) break;
  }

  return results;
}
