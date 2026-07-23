import Link from "next/link";
import {
  getAdjacentPostindependenceTopics,
  postindependenceTopicPath,
  type PostindependenceTopicId,
} from "@/lib/postindependence-notes";

type PostindependenceTopicFooterNavProps = {
  topicId: PostindependenceTopicId;
};

export function PostindependenceTopicFooterNav({
  topicId,
}: PostindependenceTopicFooterNavProps) {
  const { prev, next } = getAdjacentPostindependenceTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={postindependenceTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={postindependenceTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
