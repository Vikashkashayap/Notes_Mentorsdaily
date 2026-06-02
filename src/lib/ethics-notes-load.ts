import fs from "fs";
import path from "path";
import type { EthicsTopicId } from "@/lib/ethics-notes";

export function loadEthicsTopicHtml(topicId: EthicsTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "ethics",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
