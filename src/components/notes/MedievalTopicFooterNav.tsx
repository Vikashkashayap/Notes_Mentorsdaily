import Link from "next/link";
import {
  getAdjacentMedievalTopics,
  medievalTopicPath,
  type MedievalTopicId,
} from "@/lib/medieval-notes";

type MedievalTopicFooterNavProps = {
  topicId: MedievalTopicId;
};

export function MedievalTopicFooterNav({ topicId }: MedievalTopicFooterNavProps) {
  const { prev, next } = getAdjacentMedievalTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={medievalTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={medievalTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
