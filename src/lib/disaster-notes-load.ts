import fs from "fs";
import path from "path";
import type { DisasterTopicId } from "@/lib/disaster-notes";

export function loadDisasterTopicHtml(topicId: DisasterTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "disaster",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
