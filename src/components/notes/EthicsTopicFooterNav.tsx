import Link from "next/link";
import {
  ethicsTopicPath,
  getAdjacentEthicsTopics,
  type EthicsTopicId,
} from "@/lib/ethics-notes";

type EthicsTopicFooterNavProps = {
  topicId: EthicsTopicId;
};

export function EthicsTopicFooterNav({ topicId }: EthicsTopicFooterNavProps) {
  const { prev, next } = getAdjacentEthicsTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={ethicsTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={ethicsTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
