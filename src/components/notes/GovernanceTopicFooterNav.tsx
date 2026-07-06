import Link from "next/link";
import {
  getAdjacentGovernanceTopics,
  governanceTopicPath,
  type GovernanceTopicId,
} from "@/lib/governance-notes";

type GovernanceTopicFooterNavProps = {
  topicId: GovernanceTopicId;
};

export function GovernanceTopicFooterNav({
  topicId,
}: GovernanceTopicFooterNavProps) {
  const { prev, next } = getAdjacentGovernanceTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={governanceTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={governanceTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
