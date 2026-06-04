import fs from "fs";
import path from "path";
import type { PolityTopicId } from "@/lib/polity-notes";

export function loadPolityTopicHtml(topicId: PolityTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "polity",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
