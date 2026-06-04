import type { PolityTopicId } from "@/lib/polity-notes";
import { loadPolityTopicHtml } from "@/lib/polity-notes-load";

type PolityTopicNotesBodyProps = {
  topicId: PolityTopicId;
};

export function PolityTopicNotesBody({ topicId }: PolityTopicNotesBodyProps) {
  const html = loadPolityTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
