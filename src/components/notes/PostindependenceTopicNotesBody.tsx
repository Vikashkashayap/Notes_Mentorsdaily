import type { PostindependenceTopicId } from "@/lib/postindependence-notes";
import { loadPostindependenceTopicHtml } from "@/lib/postindependence-notes-load";

type PostindependenceTopicNotesBodyProps = {
  topicId: PostindependenceTopicId;
};

export function PostindependenceTopicNotesBody({
  topicId,
}: PostindependenceTopicNotesBodyProps) {
  const html = loadPostindependenceTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
