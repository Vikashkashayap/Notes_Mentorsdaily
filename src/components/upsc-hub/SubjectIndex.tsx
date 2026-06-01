import Link from "next/link";
import { HubHeaderStatic } from "./HubHeaderStatic";
import {
  SYLLABUS_DATA,
  getHubStats,
  subjectHubPath,
} from "@/lib/upsc-syllabus";
import { SIDEBAR_SECTIONS } from "@/lib/upsc-syllabus/sidebar";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";

export function SubjectIndex() {
  const stats = getHubStats(new Set());

  const sections = SIDEBAR_SECTIONS.filter((s) => s.label !== "All");

  return (
    <div className="upsc-hub">
      <HubHeaderStatic />

      <main className="hub-main hub-main--index">
        <section className="hub-progress-banner" aria-label="Study progress">
          <div className="hub-progress-top">
            <div>
              <div className="hub-progress-title">
                📚 UPSC CSE 2027/28 — Complete Study Hub
              </div>
              <div className="hub-progress-sub">
                Choose a subject below to browse topics and read notes
              </div>
            </div>
            <div className="hub-progress-stats">
              <div className="hub-stat-pill">
                <strong>{stats.live}</strong> Live Notes
              </div>
              <div className="hub-stat-pill">
                <strong>{stats.total}</strong> Total Topics
              </div>
            </div>
          </div>
        </section>

        <p style={{ marginBottom: 24, color: "var(--hub-text-mid)", fontSize: 15 }}>
          Select a subject to view all chapters and open notes.
        </p>

        {sections.map((section) => (
          <section key={section.label} className="hub-index-section">
            <h2 className="hub-index-section-title">{section.label}</h2>
            <div className="hub-subject-grid">
              {section.items.map((item) => {
                const key = item.key as SubjectKey;
                const subject = SYLLABUS_DATA[key];
                const live = subject.chapters.filter(
                  (c) => c.status === "live",
                ).length;

                return (
                  <Link
                    key={key}
                    href={subjectHubPath(key)}
                    className="hub-subject-card"
                  >
                    <div className="hub-subject-card-top">
                      <span className="hub-subject-card-icon" aria-hidden>
                        {item.icon}
                      </span>
                      <div>
                        <div className="hub-subject-card-name">{subject.name}</div>
                        <div className="hub-subject-card-paper">{subject.paper}</div>
                      </div>
                    </div>
                    <p className="hub-subject-card-desc">{subject.description}</p>
                    <div className="hub-subject-card-meta">
                      <span>{subject.chapters.length} topics</span>
                      <span>{live} live</span>
                    </div>
                    <span className="hub-subject-card-cta">View topics →</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="hub-index-section" style={{ marginTop: 8 }}>
          <h2 className="hub-index-section-title">Browse everything</h2>
          <Link href={subjectHubPath("all")} className="hub-subject-card">
            <div className="hub-subject-card-top">
              <span className="hub-subject-card-icon" aria-hidden>
                📚
              </span>
              <div>
                <div className="hub-subject-card-name">All Subjects</div>
                <div className="hub-subject-card-paper">Full syllabus index</div>
              </div>
            </div>
            <p className="hub-subject-card-desc">
              See every topic across GS Papers 1–4 and Current Affairs in one
              place.
            </p>
            <span className="hub-subject-card-cta">View all topics →</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
