import fs from "fs";
import path from "path";
import type { EnvironmentTopicId } from "@/lib/environment-notes";

export function loadEnvironmentTopicHtml(topicId: EnvironmentTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "environment",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
