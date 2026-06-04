import Link from "next/link";
import {
  getAdjacentPolityTopics,
  polityTopicPath,
  type PolityTopicId,
} from "@/lib/polity-notes";

type PolityTopicFooterNavProps = {
  topicId: PolityTopicId;
};

export function PolityTopicFooterNav({ topicId }: PolityTopicFooterNavProps) {
  const { prev, next } = getAdjacentPolityTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={polityTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={polityTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
