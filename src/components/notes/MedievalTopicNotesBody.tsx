import type { MedievalTopicId } from "@/lib/medieval-notes";
import { loadMedievalTopicHtml } from "@/lib/medieval-notes-load";

type MedievalTopicNotesBodyProps = {
  topicId: MedievalTopicId;
};

export function MedievalTopicNotesBody({ topicId }: MedievalTopicNotesBodyProps) {
  const html = loadMedievalTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}

