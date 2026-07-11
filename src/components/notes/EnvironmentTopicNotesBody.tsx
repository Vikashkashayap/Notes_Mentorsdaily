import type { EnvironmentTopicId } from "@/lib/environment-notes";
import { loadEnvironmentTopicHtml } from "@/lib/environment-notes-load";

type EnvironmentTopicNotesBodyProps = {
  topicId: EnvironmentTopicId;
};

export function EnvironmentTopicNotesBody({
  topicId,
}: EnvironmentTopicNotesBodyProps) {
  const html = loadEnvironmentTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
