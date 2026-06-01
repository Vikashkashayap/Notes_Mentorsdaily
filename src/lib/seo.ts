export {
  SITE_URL,
  UPSC_HUB_PATH,
  SEARCH_PATH,
  SITE_NAME,
  SITE_BRAND,
} from "@/lib/seo/constants";

export {
  subjectHubPath,
  topicPath,
  absoluteUrl,
  getChapterHref,
  getChapterByTopicSlug,
  getAllTopicPaths,
  searchUrl,
} from "@/lib/seo/routes";

import { subjectHubPath } from "@/lib/seo/routes";

export const ANCIENT_HISTORY_PATH = subjectHubPath("ancient");
