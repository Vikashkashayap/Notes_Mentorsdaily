import fs from "fs";
import path from "path";
import type { SocietyTopicId } from "@/lib/society-notes";

export function loadSocietyTopicHtml(topicId: SocietyTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "society",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
