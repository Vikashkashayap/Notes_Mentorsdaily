import type { DisasterTopicId } from "@/lib/disaster-notes";
import { loadDisasterTopicHtml } from "@/lib/disaster-notes-load";

type DisasterTopicNotesBodyProps = {
  topicId: DisasterTopicId;
};

export function DisasterTopicNotesBody({ topicId }: DisasterTopicNotesBodyProps) {
  const html = loadDisasterTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
