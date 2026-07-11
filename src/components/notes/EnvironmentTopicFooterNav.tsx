import Link from "next/link";
import {
  environmentTopicPath,
  getAdjacentEnvironmentTopics,
  type EnvironmentTopicId,
} from "@/lib/environment-notes";

type EnvironmentTopicFooterNavProps = {
  topicId: EnvironmentTopicId;
};

export function EnvironmentTopicFooterNav({
  topicId,
}: EnvironmentTopicFooterNavProps) {
  const { prev, next } = getAdjacentEnvironmentTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={environmentTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={environmentTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
