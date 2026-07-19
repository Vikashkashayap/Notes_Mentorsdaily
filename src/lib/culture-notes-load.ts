import fs from "fs";
import path from "path";
import type { CultureTopicId } from "@/lib/culture-notes";

export function loadCultureTopicHtml(topicId: CultureTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "culture",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
