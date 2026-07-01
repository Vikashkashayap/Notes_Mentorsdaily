import type { WorldTopicId } from "@/lib/world-notes";
import { loadWorldTopicHtml } from "@/lib/world-notes-load";

type WorldTopicNotesBodyProps = {
  topicId: WorldTopicId;
};

export function WorldTopicNotesBody({ topicId }: WorldTopicNotesBodyProps) {
  const html = loadWorldTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
