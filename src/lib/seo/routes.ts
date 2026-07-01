import { isAncientTopicId } from "@/lib/ancient-notes";
import { getAncientChapter, getAncientTopicSlug } from "@/lib/ancient-notes";
import {
  getEthicsTopicSlug,
  isEthicsTopicId,
} from "@/lib/ethics-notes";
import {
  getPolityTopicSlug,
  isPolityTopicId,
} from "@/lib/polity-notes";
import {
  getSocietyTopicSlug,
  isSocietyTopicId,
} from "@/lib/society-notes";
import {
  getSecurityTopicSlug,
  isSecurityTopicId,
} from "@/lib/security-notes";
import {
  getMedievalTopicSlug,
  isMedievalTopicId,
} from "@/lib/medieval-notes";
import {
  getModernTopicSlug,
  isModernTopicId,
} from "@/lib/modern-notes";
import {
  getWorldTopicSlug,
  isWorldTopicId,
} from "@/lib/world-notes";
import {
  getWorldGeoTopicSlug,
  isWorldGeoTopicId,
} from "@/lib/worldgeo-notes";
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
  if (subjectKey === "medieval" && isMedievalTopicId(chapterId)) {
    return `${subjectHubPath("medieval")}/${getMedievalTopicSlug(chapterId)}`;
  }
  if (subjectKey === "history" && isModernTopicId(chapterId)) {
    return `${subjectHubPath("history")}/${getModernTopicSlug(chapterId)}`;
  }
  if (subjectKey === "worldhistory" && isWorldTopicId(chapterId)) {
    return `${subjectHubPath("worldhistory")}/${getWorldTopicSlug(chapterId)}`;
  }
  if (subjectKey === "worldgeo" && isWorldGeoTopicId(chapterId)) {
    return `${subjectHubPath("worldgeo")}/${getWorldGeoTopicSlug(chapterId)}`;
  }
  if (subjectKey === "ethics" && isEthicsTopicId(chapterId)) {
    return `${subjectHubPath("ethics")}/${getEthicsTopicSlug(chapterId)}`;
  }
  if (subjectKey === "polity" && isPolityTopicId(chapterId)) {
    return `${subjectHubPath("polity")}/${getPolityTopicSlug(chapterId)}`;
  }
  if (subjectKey === "society" && isSocietyTopicId(chapterId)) {
    return `${subjectHubPath("society")}/${getSocietyTopicSlug(chapterId)}`;
  }
  if (subjectKey === "security" && isSecurityTopicId(chapterId)) {
    return `${subjectHubPath("security")}/${getSecurityTopicSlug(chapterId)}`;
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
  if (subjectKey === "medieval") {
    return subject.chapters.find(
      (ch) =>
        isMedievalTopicId(ch.id) && getMedievalTopicSlug(ch.id) === slug,
    );
  }
  if (subjectKey === "history") {
    return subject.chapters.find(
      (ch) =>
        isModernTopicId(ch.id) && getModernTopicSlug(ch.id) === slug,
    );
  }
  if (subjectKey === "worldhistory") {
    return subject.chapters.find(
      (ch) =>
        isWorldTopicId(ch.id) && getWorldTopicSlug(ch.id) === slug,
    );
  }
  if (subjectKey === "worldgeo") {
    return subject.chapters.find(
      (ch) =>
        isWorldGeoTopicId(ch.id) && getWorldGeoTopicSlug(ch.id) === slug,
    );
  }
  if (subjectKey === "ethics") {
    return subject.chapters.find(
      (ch) => isEthicsTopicId(ch.id) && getEthicsTopicSlug(ch.id) === slug,
    );
  }
  if (subjectKey === "polity") {
    return subject.chapters.find(
      (ch) => isPolityTopicId(ch.id) && getPolityTopicSlug(ch.id) === slug,
    );
  }
  if (subjectKey === "society") {
    return subject.chapters.find(
      (ch) => isSocietyTopicId(ch.id) && getSocietyTopicSlug(ch.id) === slug,
    );
  }
  if (subjectKey === "security") {
    return subject.chapters.find(
      (ch) => isSecurityTopicId(ch.id) && getSecurityTopicSlug(ch.id) === slug,
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
  if (subjectKey === "medieval" || isMedievalTopicId(chapter.id)) {
    if (!isMedievalTopicId(chapter.id)) return null;
    return topicPath("medieval", chapter.id);
  }
  if (subjectKey === "history" || isModernTopicId(chapter.id)) {
    if (!isModernTopicId(chapter.id)) return null;
    return topicPath("history", chapter.id);
  }
  if (subjectKey === "worldhistory" || isWorldTopicId(chapter.id)) {
    if (!isWorldTopicId(chapter.id)) return null;
    return topicPath("worldhistory", chapter.id);
  }
  if (subjectKey === "worldgeo" || isWorldGeoTopicId(chapter.id)) {
    if (!isWorldGeoTopicId(chapter.id)) return null;
    return topicPath("worldgeo", chapter.id);
  }
  if (subjectKey === "ethics" || isEthicsTopicId(chapter.id)) {
    if (!isEthicsTopicId(chapter.id)) return null;
    return topicPath("ethics", chapter.id);
  }
  if (subjectKey === "polity" || isPolityTopicId(chapter.id)) {
    if (!isPolityTopicId(chapter.id)) return null;
    return topicPath("polity", chapter.id);
  }
  if (subjectKey === "society" || isSocietyTopicId(chapter.id)) {
    if (!isSocietyTopicId(chapter.id)) return null;
    return topicPath("society", chapter.id);
  }
  if (subjectKey === "security" || isSecurityTopicId(chapter.id)) {
    if (!isSecurityTopicId(chapter.id)) return null;
    return topicPath("security", chapter.id);
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
      } else if (key === "medieval" && isMedievalTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getMedievalTopicSlug(ch.id) });
      } else if (key === "history" && isModernTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getModernTopicSlug(ch.id) });
      } else if (key === "worldhistory" && isWorldTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getWorldTopicSlug(ch.id) });
      } else if (key === "worldgeo" && isWorldGeoTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getWorldGeoTopicSlug(ch.id) });
      } else if (key === "ethics" && isEthicsTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getEthicsTopicSlug(ch.id) });
      } else if (key === "polity" && isPolityTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getPolityTopicSlug(ch.id) });
      } else if (key === "society" && isSocietyTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getSocietyTopicSlug(ch.id) });
      } else if (key === "security" && isSecurityTopicId(ch.id)) {
        paths.push({ subjectKey: key, slug: getSecurityTopicSlug(ch.id) });
      } else if (
        key !== "ancient" &&
        key !== "medieval" &&
        key !== "history" &&
        key !== "worldhistory" &&
        key !== "worldgeo" &&
        key !== "ethics" &&
        key !== "polity" &&
        key !== "society" &&
        key !== "security"
      ) {
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
