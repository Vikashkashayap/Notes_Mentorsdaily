import { SYLLABUS_DATA } from "./data";
import type {
  Chapter,
  ChapterWithMeta,
  FilterKey,
  SubjectKey,
} from "./types";

export { SYLLABUS_DATA } from "./data";
export { SIDEBAR_SECTIONS } from "./sidebar";
export type * from "./types";

export {
  UPSC_HUB_PATH,
  subjectHubPath,
  topicPath,
  getChapterHref,
} from "@/lib/seo/routes";

export function isValidSubjectKey(
  value: string,
): value is SubjectKey | "all" {
  return value === "all" || value in SYLLABUS_DATA;
}

export function getAllChapters(): ChapterWithMeta[] {
  const all: ChapterWithMeta[] = [];
  for (const key of Object.keys(SYLLABUS_DATA) as SubjectKey[]) {
    const subject = SYLLABUS_DATA[key];
    for (const ch of subject.chapters) {
      all.push({
        ...ch,
        _subjectKey: key,
        _subjectName: subject.name,
        _subjectIcon: subject.icon,
        _subjectPaper: subject.paper,
      });
    }
  }
  return all;
}

export function getChaptersForSubject(
  subjectKey: SubjectKey | "all",
): ChapterWithMeta[] {
  if (subjectKey === "all") return getAllChapters();
  const s = SYLLABUS_DATA[subjectKey];
  return s.chapters.map((ch) => ({
    ...ch,
    _subjectKey: subjectKey,
    _subjectName: s.name,
    _subjectIcon: s.icon,
    _subjectPaper: s.paper,
  }));
}

export function filterChapters(
  chapters: ChapterWithMeta[],
  filter: FilterKey,
  doneSet: Set<string>,
): ChapterWithMeta[] {
  switch (filter) {
    case "high":
      return chapters.filter((c) => c.priority === "high");
    case "prelims":
      return chapters.filter((c) => c.prelims > 6);
    case "mains":
      return chapters.filter((c) => c.mains > 5);
    case "live":
      return chapters.filter((c) => c.status === "live");
    case "notdone":
      return chapters.filter((c) => !doneSet.has(c.id));
    default:
      return chapters;
  }
}

export function searchChapters(
  chapters: ChapterWithMeta[],
  query: string,
): ChapterWithMeta[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return chapters;
  return chapters.filter(
    (ch) =>
      ch.title.toLowerCase().includes(q) ||
      ch.sub.toLowerCase().includes(q) ||
      ch._subjectName.toLowerCase().includes(q) ||
      (ch.tags && ch.tags.some((t) => t.toLowerCase().includes(q))),
  );
}

export function getHubStats(doneSet: Set<string>) {
  const all = getAllChapters();
  const live = all.filter((c) => c.status === "live").length;
  const completed = all.filter((c) => doneSet.has(c.id)).length;
  const total = all.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { live, total, completed, pct };
}

export function getSubjectStats(subjectKey: SubjectKey, doneSet: Set<string>) {
  const s = SYLLABUS_DATA[subjectKey];
  const live = s.chapters.filter((c) => c.status === "live").length;
  const high = s.chapters.filter((c) => c.priority === "high").length;
  const done = s.chapters.filter((c) => doneSet.has(c.id)).length;
  return {
    topics: s.chapters.length,
    live,
    high,
    done,
  };
}

export const PROGRESS_STORAGE_KEY = "md_upsc_progress";
