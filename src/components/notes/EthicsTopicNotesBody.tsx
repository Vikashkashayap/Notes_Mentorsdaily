import type { EthicsTopicId } from "@/lib/ethics-notes";
import { loadEthicsTopicHtml } from "@/lib/ethics-notes-load";

type EthicsTopicNotesBodyProps = {
  topicId: EthicsTopicId;
};

export function EthicsTopicNotesBody({ topicId }: EthicsTopicNotesBodyProps) {
  const html = loadEthicsTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
