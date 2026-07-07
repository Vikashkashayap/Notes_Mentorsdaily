import type { SubjectKey } from "@/lib/upsc-syllabus/types";

/** SEO-friendly URL slugs for each subject (notes.mentorsdaily.com structure). */
export const SUBJECT_SLUG: Record<SubjectKey, string> = {
  polity: "indian-polity",
  ancient: "ancient-history",
  medieval: "medieval-history",
  history: "modern-history",
  worldhistory: "world-history",
  culture: "art-culture",
  geo: "geography",
  worldgeo: "world-geography",
  society: "society",
  economy: "economy",
  environment: "environment",
  science: "science-technology",
  ir: "international-relations",
  governance: "governance",
  security: "internal-security",
  disaster: "disaster-management",
  ethics: "ethics",
  current: "current-affairs",
};

const slugToSubject = new Map<string, SubjectKey>(
  (Object.entries(SUBJECT_SLUG) as [SubjectKey, string][]).map(([k, v]) => [
    v,
    k,
  ]),
);

export function subjectKeyFromSlug(slug: string): SubjectKey | null {
  return slugToSubject.get(slug) ?? null;
}

export function subjectSlug(subjectKey: SubjectKey): string {
  return SUBJECT_SLUG[subjectKey];
}

/** Topic slug: chapter id is already lowercase kebab-case. */
export function topicSlugFromChapterId(chapterId: string): string {
  return chapterId.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
}

export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
