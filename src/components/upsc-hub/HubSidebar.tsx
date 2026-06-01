import Link from "next/link";
import {
  SIDEBAR_SECTIONS,
  SYLLABUS_DATA,
  subjectHubPath,
} from "@/lib/upsc-syllabus";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";

type HubSidebarProps = {
  activeSubject: SubjectKey | "all";
  className?: string;
};

export function HubSidebar({ activeSubject, className = "" }: HubSidebarProps) {
  return (
    <nav className={`hub-sidebar ${className}`.trim()} aria-label="Subject navigation">
      {SIDEBAR_SECTIONS.map((section, si) => (
        <div key={section.label}>
          {si > 0 && <div className="hub-sidebar-divider" />}
          <div className="hub-sidebar-label">{section.label}</div>
          {section.items.map((item) => {
            const count =
              item.key === "all"
                ? Object.values(SYLLABUS_DATA).reduce(
                    (n, s) => n + s.chapters.length,
                    0,
                  )
                : SYLLABUS_DATA[item.key].chapters.length;
            const href = subjectHubPath(item.key);
            const isActive = activeSubject === item.key;

            return (
              <Link
                key={item.key}
                href={href}
                className={`hub-sidebar-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="hub-sidebar-link-left">
                  <span aria-hidden>{item.icon}</span>
                  {item.name}
                </span>
                <span className="hub-sidebar-count">{count}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
