import type { AncientTopicId } from "@/lib/ancient-notes";
import { loadAncientTopicHtml } from "@/lib/ancient-notes-load";

type TopicNotesBodyProps = {
  topicId: AncientTopicId;
};

export function TopicNotesBody({ topicId }: TopicNotesBodyProps) {
  const html = loadAncientTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
