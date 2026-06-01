"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { HubHeader } from "./HubHeader";
import { HubSidebar } from "./HubSidebar";
import { TopicCard } from "./TopicCard";
import { useProgress } from "./useProgress";
import {
  SYLLABUS_DATA,
  filterChapters,
  getChaptersForSubject,
  getHubStats,
  getSubjectStats,
  searchChapters,
} from "@/lib/upsc-syllabus";
import type { FilterKey, SubjectKey } from "@/lib/upsc-syllabus/types";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Topics" },
  { key: "high", label: "🔴 High Priority" },
  { key: "prelims", label: "📋 Prelims Heavy" },
  { key: "mains", label: "✍️ Mains Heavy" },
  { key: "live", label: "✅ Live Only" },
  { key: "notdone", label: "📌 Not Done Yet" },
];

type UpscHubTopicsProps = {
  subjectKey: SubjectKey | "all";
};

export function UpscHubTopics({ subjectKey }: UpscHubTopicsProps) {
  const { doneSet, toggleDone } = useProgress();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 280);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    setFilter("all");
    setSearchQuery("");
    setDebouncedSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [subjectKey]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeSidebar]);

  useEffect(() => {
    const onScroll = () => {
      const btn = document.getElementById("hub-scroll-top");
      if (btn) {
        btn.classList.toggle("visible", window.scrollY > 320);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stats = getHubStats(doneSet);
  const subject =
    subjectKey !== "all" ? SYLLABUS_DATA[subjectKey] : null;
  const subjectStats =
    subjectKey !== "all" ? getSubjectStats(subjectKey, doneSet) : null;

  const chapters = useMemo(() => {
    let list = getChaptersForSubject(subjectKey);
    list = searchChapters(list, debouncedSearch);
    list = filterChapters(list, filter, doneSet);
    return list;
  }, [subjectKey, debouncedSearch, filter, doneSet]);

  const showSubjectOnCard = subjectKey === "all";

  return (
    <div className="upsc-hub">
      <HubHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuToggle={() => setSidebarOpen((o) => !o)}
      />

      <div
        className={`hub-overlay${sidebarOpen ? " visible" : ""}`}
        onClick={closeSidebar}
        aria-hidden={!sidebarOpen}
      />

      <HubSidebar
        activeSubject={subjectKey}
        className={sidebarOpen ? "open" : ""}
      />

      <main className="hub-main">
        <section className="hub-progress-banner" aria-label="Study progress">
          <div className="hub-progress-top">
            <div>
              <div className="hub-progress-title">
                📚 UPSC CSE 2027/28 — Complete Study Hub
              </div>
              <div className="hub-progress-sub">
                Track your preparation across all GS Papers and Current Affairs
              </div>
            </div>
            <div className="hub-progress-stats">
              <div className="hub-stat-pill">
                <strong>{stats.live}</strong> Live Notes
              </div>
              <div className="hub-stat-pill">
                <strong>{stats.total}</strong> Total Topics
              </div>
              <div className="hub-stat-pill">
                <strong>{stats.completed}</strong> Completed
              </div>
            </div>
          </div>
          <div className="hub-progress-bar-wrap">
            <div className="hub-progress-bar-label">
              <span>Your Progress</span>
              <span>{stats.pct}%</span>
            </div>
            <div className="hub-progress-track">
              <div
                className="hub-progress-fill"
                style={{ width: `${stats.pct}%` }}
              />
            </div>
          </div>
        </section>

        {subject && subjectStats && (
          <section className="hub-subject-hero" aria-label="Subject information">
            <div className="hub-subject-hero-icon" aria-hidden>
              {subject.icon}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="hub-subject-hero-paper">{subject.paper}</div>
              <h1 className="hub-subject-hero-name">{subject.name}</h1>
              <p className="hub-subject-hero-desc">{subject.description}</p>
              <div className="hub-subject-hero-stats">
                <div>
                  <div className="hub-subject-stat-val">{subjectStats.topics}</div>
                  <div className="hub-subject-stat-label">Topics</div>
                </div>
                <div>
                  <div className="hub-subject-stat-val">{subjectStats.live}</div>
                  <div className="hub-subject-stat-label">Live</div>
                </div>
                <div>
                  <div className="hub-subject-stat-val">{subjectStats.high}</div>
                  <div className="hub-subject-stat-label">High Priority</div>
                </div>
                <div>
                  <div className="hub-subject-stat-val">{subjectStats.done}</div>
                  <div className="hub-subject-stat-label">Done</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {debouncedSearch.length > 1 && (
          <div className="hub-search-info" role="status">
            🔍 Found {chapters.length} topic
            {chapters.length !== 1 ? "s" : ""} matching &ldquo;{debouncedSearch}
            &rdquo;
          </div>
        )}

        <div className="hub-filter-bar" role="group" aria-label="Filter topics">
          <span className="hub-filter-label">Filter:</span>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`hub-filter-btn${filter === f.key ? " active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {chapters.length === 0 ? (
          <div className="hub-empty" role="status">
            <div style={{ fontSize: 52 }} aria-hidden>
              🔍
            </div>
            <h3>No topics found</h3>
            <p>Try adjusting your search or filter, or browse all subjects.</p>
          </div>
        ) : (
          <div className="hub-cards-grid" aria-label="Topic cards">
            {chapters.map((ch) => (
              <TopicCard
                key={`${ch._subjectKey}-${ch.id}`}
                chapter={ch}
                showSubject={showSubjectOnCard}
                isDone={doneSet.has(ch.id)}
                onToggleDone={toggleDone}
              />
            ))}
          </div>
        )}
      </main>

      <button
        type="button"
        id="hub-scroll-top"
        className="hub-scroll-top"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
