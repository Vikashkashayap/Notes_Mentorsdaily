import fs from "fs";
import path from "path";
import type { AncientTopicId } from "@/lib/ancient-notes";

export function loadAncientTopicHtml(topicId: AncientTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "ancient",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
