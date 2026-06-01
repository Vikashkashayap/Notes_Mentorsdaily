import Link from "next/link";
import { getChapterHref } from "@/lib/upsc-syllabus";
import type { ChapterWithMeta } from "@/lib/upsc-syllabus/types";

type TopicCardProps = {
  chapter: ChapterWithMeta;
  showSubject: boolean;
  isDone: boolean;
  onToggleDone: (id: string) => void;
};

export function TopicCard({
  chapter: ch,
  showSubject,
  isDone,
  onToggleDone,
}: TopicCardProps) {
  const isLive = ch.status === "live";
  const href = getChapterHref(ch, ch._subjectKey);
  const stripeClass =
    ch.priority === "high"
      ? "hub-card-stripe--high"
      : ch.priority === "medium"
        ? "hub-card-stripe--medium"
        : "hub-card-stripe--low";

  const prioLabel =
    ch.priority === "high"
      ? "🔴 High"
      : ch.priority === "medium"
        ? "🟠 Medium"
        : "Low";

  return (
    <article className="hub-topic-card">
      <div className={`hub-card-stripe ${stripeClass}`} />
      <div className="hub-card-body">
        <div className="hub-card-top">
          <div>
            <div className="hub-card-title">{ch.title}</div>
            <div className="hub-card-sub">{ch.sub}</div>
          </div>
          <span
            className={`hub-status-badge ${isLive ? "hub-status-live" : "hub-status-soon"}`}
          >
            {isLive ? "✅ Live" : "Coming Soon"}
          </span>
        </div>

        {showSubject && (
          <div>
            <span className="hub-subject-chip">
              {ch._subjectIcon} {ch._subjectName}
            </span>
          </div>
        )}

        <div className="hub-card-meta">
          {ch.prelims > 0 && <span>{ch.prelims} Prelims Qs</span>}
          {ch.mains > 0 && <span>{ch.mains} Mains Qs</span>}
          <span>{ch.readTime} min read</span>
          <span>{prioLabel}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {(ch.tags ?? []).slice(0, 4).map((t) => (
            <span key={t} className="hub-tag-chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="hub-card-footer">
        {isLive && href ? (
          <Link href={href} className="hub-read-btn hub-read-btn--active">
            Read Notes →
          </Link>
        ) : (
          <span className="hub-read-btn hub-read-btn--disabled">
            Coming Soon
          </span>
        )}
        <button
          type="button"
          className={`hub-done-btn${isDone ? " done" : ""}`}
          onClick={() => onToggleDone(ch.id)}
          title={isDone ? "Mark as not done" : "Mark as done"}
          aria-label={isDone ? "Mark as not done" : "Mark as done"}
        >
          {isDone ? "✓" : "○"}
        </button>
      </div>
    </article>
  );
}
