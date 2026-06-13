import fs from "fs";
import path from "path";
import type { SecurityTopicId } from "@/lib/security-notes";

export function loadSecurityTopicHtml(topicId: SecurityTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "security",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
