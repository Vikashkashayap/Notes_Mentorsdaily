import { getAllChapters } from "@/lib/upsc-syllabus";
import { getChapterHref } from "@/lib/seo/routes";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import { absoluteUrl } from "@/lib/seo/routes";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const live = getAllChapters()
    .filter((ch) => ch.status === "live")
    .slice(0, 50);

  const items = live
    .map((ch) => {
      const href = getChapterHref(ch, ch._subjectKey);
      if (!href) return "";
      const link = absoluteUrl(href);
      return `
    <item>
      <title>${escapeXml(ch.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(ch.sub)}</description>
      <category>${escapeXml(ch._subjectName)}</category>
      <pubDate>${new Date("2026-06-01").toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Latest UPSC Notes</title>
    <link>${SITE_URL}</link>
    <description>Latest UPSC notes for Prelims and Mains — Indian Polity, History, Geography, Economy, Environment &amp; Current Affairs.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
