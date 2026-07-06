import fs from "fs";
import path from "path";
import type { EconomyTopicId } from "@/lib/economy-notes";

export function loadEconomyTopicHtml(topicId: EconomyTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "economy",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
