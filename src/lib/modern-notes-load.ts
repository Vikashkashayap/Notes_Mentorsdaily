import fs from "fs";
import path from "path";
import type { ModernTopicId } from "@/lib/modern-notes";

export function loadModernTopicHtml(topicId: ModernTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "modern",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
