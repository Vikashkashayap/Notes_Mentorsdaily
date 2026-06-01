import Link from "next/link";
import { getRelatedTopics } from "@/lib/seo/related";
import type { Chapter } from "@/lib/upsc-syllabus/types";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";

type RelatedTopicsProps = {
  subjectKey: SubjectKey;
  chapter: Chapter;
};

export function RelatedTopics({ subjectKey, chapter }: RelatedTopicsProps) {
  const related = getRelatedTopics(subjectKey, chapter);

  if (related.length === 0) return null;

  return (
    <aside className="related-topics" aria-labelledby="related-heading">
      <h2 id="related-heading">Related Notes</h2>
      <div className="related-topics__grid">
        {related.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="related-topics__card"
          >
            <strong>{item.title}</strong>
            <span>{item.sub}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
