export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://notes.mentorsdaily.com";

export const SITE_NAME = "Mentors Daily";
export const SITE_BRAND = "MentorsDaily";
export const ORG_NAME = "MentorsDaily — Sempiternity Technologies";

export const UPSC_EXAM_YEAR = "2027";
/** Served by `app/opengraph-image.tsx` (1200×630). */
export const DEFAULT_OG_IMAGE = "/opengraph-image";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const UPSC_HUB_PATH = "/";
export const SEARCH_PATH = "/search";

export const PRIMARY_KEYWORDS = [
  "UPSC Notes",
  "IAS Notes",
  "UPSC Study Material",
  "UPSC Preparation",
  "UPSC Prelims Notes",
  "UPSC Mains Notes",
  "Indian Polity Notes",
  "History Notes",
  "Geography Notes",
  "Economy Notes",
  "Environment Notes",
  "Current Affairs Notes",
] as const;
