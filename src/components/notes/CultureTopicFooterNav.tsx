import Link from "next/link";
import {
  getAdjacentCultureTopics,
  cultureTopicPath,
  type CultureTopicId,
} from "@/lib/culture-notes";

type CultureTopicFooterNavProps = {
  topicId: CultureTopicId;
};

export function CultureTopicFooterNav({ topicId }: CultureTopicFooterNavProps) {
  const { prev, next } = getAdjacentCultureTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={cultureTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={cultureTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
