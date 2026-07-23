import Link from "next/link";
import {
  getAdjacentScienceTopics,
  scienceTopicPath,
  type ScienceTopicId,
} from "@/lib/science-notes";

type ScienceTopicFooterNavProps = {
  topicId: ScienceTopicId;
};

export function ScienceTopicFooterNav({ topicId }: ScienceTopicFooterNavProps) {
  const { prev, next } = getAdjacentScienceTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={scienceTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={scienceTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
