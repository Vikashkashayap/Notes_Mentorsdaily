import type { ModernTopicId } from "@/lib/modern-notes";
import { loadModernTopicHtml } from "@/lib/modern-notes-load";

type ModernTopicNotesBodyProps = {
  topicId: ModernTopicId;
};

export function ModernTopicNotesBody({ topicId }: ModernTopicNotesBodyProps) {
  const html = loadModernTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
