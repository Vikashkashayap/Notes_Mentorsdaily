import Link from "next/link";
import {
  ancientTopicPath,
  getAdjacentTopics,
  type AncientTopicId,
} from "@/lib/ancient-notes";

type TopicNotesFooterNavProps = {
  topicId: AncientTopicId;
};

export function TopicNotesFooterNav({ topicId }: TopicNotesFooterNavProps) {
  const { prev, next } = getAdjacentTopics(topicId);

  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={ancientTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={ancientTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
