import Link from "next/link";
import {
  economyTopicPath,
  getAdjacentEconomyTopics,
  type EconomyTopicId,
} from "@/lib/economy-notes";

type EconomyTopicFooterNavProps = {
  topicId: EconomyTopicId;
};

export function EconomyTopicFooterNav({ topicId }: EconomyTopicFooterNavProps) {
  const { prev, next } = getAdjacentEconomyTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={economyTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={economyTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
