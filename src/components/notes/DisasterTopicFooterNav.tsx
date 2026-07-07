import Link from "next/link";
import {
  getAdjacentDisasterTopics,
  disasterTopicPath,
  type DisasterTopicId,
} from "@/lib/disaster-notes";

type DisasterTopicFooterNavProps = {
  topicId: DisasterTopicId;
};

export function DisasterTopicFooterNav({ topicId }: DisasterTopicFooterNavProps) {
  const { prev, next } = getAdjacentDisasterTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={disasterTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={disasterTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
