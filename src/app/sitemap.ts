import type { MetadataRoute } from "next";
import { getChapterByTopicSlug } from "@/lib/seo/routes";
import { SITE_URL, SEARCH_PATH } from "@/lib/seo/constants";
import {
  getAllTopicPaths,
  subjectHubPath,
  topicPath,
} from "@/lib/seo/routes";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const subjectUrls = (Object.keys(SYLLABUS_DATA) as SubjectKey[]).map(
    (key) => ({
      url: `${SITE_URL}${subjectHubPath(key)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }),
  );

  const topicUrls = getAllTopicPaths()
    .map(({ subjectKey, slug }) => {
      const chapter = getChapterByTopicSlug(subjectKey, slug);
      if (!chapter) return null;
      return {
        url: `${SITE_URL}${topicPath(subjectKey, chapter.id)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${SEARCH_PATH}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...subjectUrls,
    ...topicUrls,
  ];
}
