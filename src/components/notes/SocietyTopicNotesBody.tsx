import type { SocietyTopicId } from "@/lib/society-notes";
import { loadSocietyTopicHtml } from "@/lib/society-notes-load";

type SocietyTopicNotesBodyProps = {
  topicId: SocietyTopicId;
};

export function SocietyTopicNotesBody({ topicId }: SocietyTopicNotesBodyProps) {
  const html = loadSocietyTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
