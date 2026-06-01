import type { SYLLABUS_DATA, SubjectKey } from "./data";

export type { SubjectKey };

export type Chapter = (typeof SYLLABUS_DATA)[SubjectKey]["chapters"][number] & {
  file?: string;
  featured?: boolean;
};

export type Subject = (typeof SYLLABUS_DATA)[SubjectKey];

export type ChapterWithMeta = Chapter & {
  _subjectKey: SubjectKey;
  _subjectName: string;
  _subjectIcon: string;
  _subjectPaper: string;
};

export type FilterKey =
  | "all"
  | "high"
  | "prelims"
  | "mains"
  | "live"
  | "notdone";

export type SidebarItem = {
  key: SubjectKey | "all";
  icon: string;
  name: string;
};

export type SidebarSection = {
  label: string;
  items: SidebarItem[];
};
