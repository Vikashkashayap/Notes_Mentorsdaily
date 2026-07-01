import fs from "fs";
import path from "path";
import type { WorldTopicId } from "@/lib/world-notes";

export function loadWorldTopicHtml(topicId: WorldTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "world",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
