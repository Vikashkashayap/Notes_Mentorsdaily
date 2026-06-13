import Link from "next/link";
import {
  getAdjacentSecurityTopics,
  securityTopicPath,
  type SecurityTopicId,
} from "@/lib/security-notes";

type SecurityTopicFooterNavProps = {
  topicId: SecurityTopicId;
};

export function SecurityTopicFooterNav({ topicId }: SecurityTopicFooterNavProps) {
  const { prev, next } = getAdjacentSecurityTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={securityTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={securityTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
