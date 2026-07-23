import fs from "fs";
import path from "path";
import type { ScienceTopicId } from "@/lib/science-notes";

export function loadScienceTopicHtml(topicId: ScienceTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "science",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
