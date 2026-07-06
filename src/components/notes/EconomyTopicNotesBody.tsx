import type { EconomyTopicId } from "@/lib/economy-notes";
import { loadEconomyTopicHtml } from "@/lib/economy-notes-load";

type EconomyTopicNotesBodyProps = {
  topicId: EconomyTopicId;
};

export function EconomyTopicNotesBody({ topicId }: EconomyTopicNotesBodyProps) {
  const html = loadEconomyTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
