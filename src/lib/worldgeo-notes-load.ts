import fs from "fs";
import path from "path";
import type { WorldGeoTopicId } from "@/lib/worldgeo-notes";

export function loadWorldGeoTopicHtml(topicId: WorldGeoTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "worldgeo",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
