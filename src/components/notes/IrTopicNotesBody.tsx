import type { IrTopicId } from "@/lib/ir-notes";
import { loadIrTopicHtml } from "@/lib/ir-notes-load";

type IrTopicNotesBodyProps = {
  topicId: IrTopicId;
};

export function IrTopicNotesBody({ topicId }: IrTopicNotesBodyProps) {
  const html = loadIrTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
