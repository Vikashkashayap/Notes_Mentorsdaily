import type { Chapter } from "@/lib/upsc-syllabus/types";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import { UPSC_EXAM_YEAR } from "@/lib/seo/constants";

type TopicPageSectionsProps = {
  subjectKey: SubjectKey;
  chapter: Chapter;
};

export function TopicPageSections({
  subjectKey,
  chapter,
}: TopicPageSectionsProps) {
  const subject = SYLLABUS_DATA[subjectKey];
  const tags = chapter.tags ?? [];

  return (
    <article className="topic-sections">
      <header>
        <h1>{chapter.title}</h1>
        <p className="topic-sections__sub">{chapter.sub}</p>
      </header>

      <section id="overview" aria-labelledby="overview-heading">
        <h2 id="overview-heading">Overview</h2>
        <p>
          {chapter.title} is a core topic under {subject.name} ({subject.paper}
          ) for UPSC CSE {UPSC_EXAM_YEAR}. This note covers {chapter.sub} with
          exam-oriented structure for quick revision.
        </p>
      </section>

      <section id="upsc-importance" aria-labelledby="importance-heading">
        <h2 id="importance-heading">UPSC Importance</h2>
        <p>
          Priority: <strong>{chapter.priority}</strong>. Prelims relevance:{" "}
          {chapter.prelims}/15 · Mains relevance: {chapter.mains}/10 · Estimated
          read time: {chapter.readTime} minutes.
        </p>
      </section>

      <section id="prelims" aria-labelledby="prelims-heading">
        <h2 id="prelims-heading">Prelims Perspective</h2>
        <p>
          Expect factual MCQs on definitions, dates, institutions, and
          conceptual distinctions. Revise {tags.slice(0, 5).join(", ") ||
            "key terms"} with previous year Prelims questions.
        </p>
      </section>

      <section id="mains" aria-labelledby="mains-heading">
        <h2 id="mains-heading">Mains Perspective</h2>
        <p>
          Mains may test analytical linkages — constitutional provisions, policy
          implications, and contemporary examples. Structure answers with
          introduction, core content, and a balanced conclusion.
        </p>
      </section>

      {tags.length > 0 && (
        <section id="key-concepts" aria-labelledby="concepts-heading">
          <h2 id="concepts-heading">Important Concepts</h2>
          <ul>
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      <section id="pyqs" aria-labelledby="pyqs-heading">
        <h2 id="pyqs-heading">Previous Year Questions</h2>
        <p>
          Solve PYQs tagged to {chapter.title} from the last 10 years. Map each
          question to Prelims vs Mains and note recurring themes for UPSC{" "}
          {UPSC_EXAM_YEAR}.
        </p>
      </section>

      <section id="exam-tips" aria-labelledby="tips-heading">
        <h2 id="tips-heading">Exam Tips</h2>
        <ul>
          <li>Make a one-page revision sheet after the first read.</li>
          <li>Link static syllabus with 12–18 months of current affairs.</li>
          <li>Practice 20–30 MCQs after completing this topic.</li>
        </ul>
      </section>
    </article>
  );
}
