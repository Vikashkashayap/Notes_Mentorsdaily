import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/SiteNavbar";
import { PageSEO } from "@/components/seo/SEO";
import { buildSearchMetadata, publisherMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { getChapterHref, searchUrl, UPSC_HUB_PATH } from "@/lib/seo";
import { getAllChapters, searchChapters } from "@/lib/upsc-syllabus";
import "@/styles/seo.css";
import "@/styles/site-navbar.css";

export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q = "" } = await searchParams;
  return { ...buildSearchMetadata(q), ...publisherMetadata };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const all = getAllChapters();
  const results =
    query.length >= 2 ? searchChapters(all, query) : all.filter((c) => c.status === "live").slice(0, 24);

  const breadcrumbs = [
    { label: "Home", href: UPSC_HUB_PATH },
    { label: query ? `Search: ${query}` : "Search" },
  ];

  return (
    <div>
      <PageSEO schemas={breadcrumbSchema(breadcrumbs)} />
      <SiteNavbar
        variant="hub"
        showSearch={false}
      />
      <main className="search-page">
        <h1>Search UPSC Notes</h1>
        <form className="search-form" action={searchUrl("")} method="get">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search topics, subjects, tags…"
            aria-label="Search query"
            minLength={2}
          />
          <button type="submit">Search</button>
        </form>

        {query.length > 0 && query.length < 2 && (
          <p>Enter at least 2 characters to search.</p>
        )}

        <section aria-label="Search results">
          <p>
            {query
              ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
              : "Popular live topics"}
          </p>
          <ul className="search-results">
            {results.map((ch) => {
              const href = getChapterHref(ch, ch._subjectKey);
              return (
                <li key={ch.id} className="search-results__item">
                  {href ? (
                    <Link href={href}>
                      {ch.title}
                      <span> — {ch._subjectName}</span>
                    </Link>
                  ) : (
                    <span>
                      {ch.title} — {ch._subjectName} (coming soon)
                    </span>
                  )}
                  <p>{ch.sub}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
