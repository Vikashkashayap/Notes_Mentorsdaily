import Link from "next/link";
import {
  getAdjacentSocietyTopics,
  societyTopicPath,
  type SocietyTopicId,
} from "@/lib/society-notes";

type SocietyTopicFooterNavProps = {
  topicId: SocietyTopicId;
};

export function SocietyTopicFooterNav({ topicId }: SocietyTopicFooterNavProps) {
  const { prev, next } = getAdjacentSocietyTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={societyTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={societyTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
