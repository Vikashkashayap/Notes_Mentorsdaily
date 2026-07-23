import fs from "fs";
import path from "path";
import type { PostindependenceTopicId } from "@/lib/postindependence-notes";

export function loadPostindependenceTopicHtml(
  topicId: PostindependenceTopicId,
): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "postindependence",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
