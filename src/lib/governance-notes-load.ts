import fs from "fs";
import path from "path";
import type { GovernanceTopicId } from "@/lib/governance-notes";

export function loadGovernanceTopicHtml(topicId: GovernanceTopicId): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "governance",
    `${topicId}.html`,
  );
  return fs.readFileSync(filePath, "utf8");
}
