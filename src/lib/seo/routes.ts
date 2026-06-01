import { isAncientTopicId } from "@/lib/ancient-notes";
import { getAncientChapter, getAncientTopicSlug } from "@/lib/ancient-notes";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { Chapter } from "@/lib/upsc-syllabus/types";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";
import { SEARCH_PATH, SITE_URL, UPSC_HUB_PATH } from "./constants";
import {
  subjectKeyFromSlug,
  subjectSlug as getSubjectSlug,
  topicSlugFromChapterId,
} from "./slugs";

export { SEARCH_PATH, UPSC_HUB_PATH };

export function absoluteUrl(path: string): string {
  const base = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${base}`;
}

export function subjectHubPath(subjectKey: SubjectKey | "all"): string {
  if (subjectKey === "all") return UPSC_HUB_PATH;
  return `/${getSubjectSlug(subjectKey)}`;
}

export function topicPath(subjectKey: SubjectKey, chapterId: string): string {
  if (subjectKey === "ancient" && isAncientTopicId(chapterId)) {
    return `${subjectHubPath("ancient")}/${getAncientTopicSlug(chapterId)}`;
  }
  return `${subjectHubPath(subjectKey)}/${topicSlugFromChapterId(chapterId)}`;
}

export function getChapterByTopicSlug(
  subjectKey: SubjectKey,
  slug: string,
): Chapter | undefined {
  const subject = SYLLABUS_DATA[subjectKey];
  if (subjectKey === "ancient") {
    return subject.chapters.find(
      (ch) =>
        isAncientTopicId(ch.id) && getAncientTopicSlug(ch.id) === slug,
    );
  }
  return subject.chapters.find(
    (ch) => topicSlugFromChapterId(ch.id) === slug,
  );
}

export function getChapterHref(
  chapter: Chapter,
  subjectKey?: SubjectKey,
): string | null {
  if (chapter.status !== "live" || !subjectKey) return null;
  if (subjectKey === "ancient" || isAncientTopicId(chapter.id)) {
    if (!isAncientTopicId(chapter.id)) return null;
    return topicPath("ancient", chapter.id);
  }
  return topicPath(subjectKey, chapter.id);
}

export function resolveSubjectFromParam(param: string): SubjectKey | null {
  return subjectKeyFromSlug(param);
}

export function getAllTopicPaths(): { subjectKey: SubjectKey; slug: string }[] {
  const paths: { subjectKey: SubjectKey; slug: string }[] = [];
  for (const key of Object.keys(SYLLABUS_DATA) as SubjectKey[]) {
    for (const ch of SYLLABUS_DATA[key].chapters) {
      if (ch.status !== "live") continue;
      if (key === "ancient" && isAncientTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getAncientTopicSlug(ch.id) });
      } else if (key !== "ancient") {
        paths.push({
          subjectKey: key,
          slug: topicSlugFromChapterId(ch.id),
        });
      }
    }
  }
  return paths;
}

export function searchUrl(query: string): string {
  const q = query.trim();
  if (!q) return SEARCH_PATH;
  return `${SEARCH_PATH}?q=${encodeURIComponent(q)}`;
}
