import type { ScienceTopicId } from "@/lib/science-notes";
import { loadScienceTopicHtml } from "@/lib/science-notes-load";

type ScienceTopicNotesBodyProps = {
  topicId: ScienceTopicId;
};

export function ScienceTopicNotesBody({ topicId }: ScienceTopicNotesBodyProps) {
  const html = loadScienceTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
