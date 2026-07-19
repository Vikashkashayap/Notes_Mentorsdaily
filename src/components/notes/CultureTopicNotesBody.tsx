import type { CultureTopicId } from "@/lib/culture-notes";
import { loadCultureTopicHtml } from "@/lib/culture-notes-load";

type CultureTopicNotesBodyProps = {
  topicId: CultureTopicId;
};

export function CultureTopicNotesBody({ topicId }: CultureTopicNotesBodyProps) {
  const html = loadCultureTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
