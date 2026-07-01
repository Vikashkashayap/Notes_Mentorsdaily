import Link from "next/link";
import {
  getAdjacentModernTopics,
  modernTopicPath,
  type ModernTopicId,
} from "@/lib/modern-notes";

type ModernTopicFooterNavProps = {
  topicId: ModernTopicId;
};

export function ModernTopicFooterNav({ topicId }: ModernTopicFooterNavProps) {
  const { prev, next } = getAdjacentModernTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={modernTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={modernTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
