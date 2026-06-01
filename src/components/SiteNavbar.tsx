import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";
import { TopicNotesPrintButton } from "@/components/notes/TopicNotesPrintButton";
import { SEARCH_PATH, UPSC_HUB_PATH } from "@/lib/seo";
import "@/styles/site-navbar.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type SiteNavbarHubProps = {
  variant: "hub";
  onMenuToggle?: () => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
};

type SiteNavbarNotesProps = {
  variant: "notes";
  breadcrumbs: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
};

export type SiteNavbarProps = SiteNavbarHubProps | SiteNavbarNotesProps;

export function SiteNavbar(props: SiteNavbarProps) {
  if (props.variant === "hub") {
    const {
      onMenuToggle,
      searchQuery = "",
      onSearchChange,
      showSearch = true,
    } = props;

    return (
      <header className="site-navbar site-navbar--hub hub-header">
        {onMenuToggle && (
          <button
            type="button"
            className="site-navbar__menu"
            aria-label="Toggle sidebar"
            onClick={onMenuToggle}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        <SiteLogo variant="full" className="site-navbar__logo" />

        <div className="site-navbar__hub-title">
          {/* 📚 <span>UPSC Notes Hub</span> */}
        </div>

        {showSearch && onSearchChange && (
          <form
            className="site-navbar__search"
            action={SEARCH_PATH}
            method="get"
            role="search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              name="q"
              placeholder="Search topics, subjects…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search UPSC topics"
              minLength={2}
            />
          </form>
        )}

        <Link
          href="https://mentorsdaily.com/mentorship-courses"
          className="site-navbar__cta"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" aria-hidden>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>Mentorship Courses</span>
        </Link>
      </header>
    );
  }

  const {
    breadcrumbs,
    backHref = "/ancient-history",
    backLabel = "← All Notes",
  } = props;

  return (
    <header className="site-navbar site-navbar--notes">
      <SiteLogo variant="full" className="site-navbar__logo" />

      <nav className="site-navbar__breadcrumbs" aria-label="Breadcrumb">
        {breadcrumbs.map((item, i) => (
          <span key={`${item.label}-${i}`} className="site-navbar__crumb">
            {i > 0 && <span className="site-navbar__sep" aria-hidden>›</span>}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span className="site-navbar__current">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="site-navbar__actions">
        <Link href={backHref} className="site-navbar__btn site-navbar__btn--outline">
          {backLabel}
        </Link>
        {/* <TopicNotesPrintButton className="site-navbar__btn site-navbar__btn--primary">
          Save PDF
        </TopicNotesPrintButton> */}
      </div>
    </header>
  );
}

export function notesHubBreadcrumbs(
  subjectName: string,
  subjectHref: string,
  topicTitle: string,
): BreadcrumbItem[] {
  return [
    { label: "Home", href: UPSC_HUB_PATH },
    { label: subjectName, href: subjectHref },
    { label: topicTitle },
  ];
}
