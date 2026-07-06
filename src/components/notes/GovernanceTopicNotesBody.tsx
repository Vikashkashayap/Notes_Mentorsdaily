import type { GovernanceTopicId } from "@/lib/governance-notes";
import { loadGovernanceTopicHtml } from "@/lib/governance-notes-load";

type GovernanceTopicNotesBodyProps = {
  topicId: GovernanceTopicId;
};

export function GovernanceTopicNotesBody({
  topicId,
}: GovernanceTopicNotesBodyProps) {
  const html = loadGovernanceTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
