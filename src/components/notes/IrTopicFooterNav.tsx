import Link from "next/link";
import {
  getAdjacentIrTopics,
  irTopicPath,
  type IrTopicId,
} from "@/lib/ir-notes";

type IrTopicFooterNavProps = {
  topicId: IrTopicId;
};

export function IrTopicFooterNav({ topicId }: IrTopicFooterNavProps) {
  const { prev, next } = getAdjacentIrTopics(topicId);
  if (!prev && !next) return null;

  return (
    <nav className="notes-topic-footer-nav" aria-label="Topic navigation">
      {prev ? (
        <Link href={irTopicPath(prev.id)}>← {prev.title}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={irTopicPath(next.id)}>{next.title} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
