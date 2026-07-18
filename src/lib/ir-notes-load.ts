import fs from "fs";
import path from "path";
import type { IrTopicId } from "@/lib/ir-notes";

export function loadIrTopicHtml(topicId: IrTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "ir",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
