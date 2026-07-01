import Link from "next/link";
import {
  getAdjacentWorldGeoTopics,
  worldGeoTopicPath,
  type WorldGeoTopicId,
} from "@/lib/worldgeo-notes";

type WorldGeoTopicFooterNavProps = {
  topicId: WorldGeoTopicId;
};

export function WorldGeoTopicFooterNav({ topicId }: WorldGeoTopicFooterNavProps) {
  const { prev, next } = getAdjacentWorldGeoTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={worldGeoTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={worldGeoTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
