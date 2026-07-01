import Link from "next/link";
import {
  getAdjacentWorldTopics,
  worldTopicPath,
  type WorldTopicId,
} from "@/lib/world-notes";

type WorldTopicFooterNavProps = {
  topicId: WorldTopicId;
};

export function WorldTopicFooterNav({ topicId }: WorldTopicFooterNavProps) {
  const { prev, next } = getAdjacentWorldTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={worldTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={worldTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
