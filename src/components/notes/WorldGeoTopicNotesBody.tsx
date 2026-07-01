import type { WorldGeoTopicId } from "@/lib/worldgeo-notes";
import { loadWorldGeoTopicHtml } from "@/lib/worldgeo-notes-load";

type WorldGeoTopicNotesBodyProps = {
  topicId: WorldGeoTopicId;
};

export function WorldGeoTopicNotesBody({ topicId }: WorldGeoTopicNotesBodyProps) {
  const html = loadWorldGeoTopicHtml(topicId);

  return (
    <div
      className="notes-topic-body"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
