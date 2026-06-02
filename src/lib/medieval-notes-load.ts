import fs from "fs";
import path from "path";
import type { MedievalTopicId } from "@/lib/medieval-notes";

export function loadMedievalTopicHtml(topicId: MedievalTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "medieval",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}

