import type { SecurityTopicId } from "@/lib/security-notes";
import { loadSecurityTopicHtml } from "@/lib/security-notes-load";

type SecurityTopicNotesBodyProps = {
  topicId: SecurityTopicId;
};

export function SecurityTopicNotesBody({ topicId }: SecurityTopicNotesBodyProps) {
  const html = loadSecurityTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
