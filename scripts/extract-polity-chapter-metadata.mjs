/**
 * Extract Polity chapter metadata from the downloaded HTML pages.
 *
 * Reads from:
 *   - ${POLITY_HTML_DIR} (defaults to C:\Users\vikas\Downloads)
 *
 * Output:
 *   Prints a JSON array of chapter objects compatible with `SYLLABUS_DATA.polity.chapters`.
 *
 * Run:
 *   node scripts/extract-polity-chapter-metadata.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const downloads = process.env.POLITY_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";

const topicIds = Array.from({ length: 38 - 23 + 1 }, (_, i) => i + 23).map(
  (n) => `polity-topic${String(n).padStart(2, "0")}`,
);

function unescapeHtml(s) {
  if (!s) return "";
  return s
    .replaceAll("&amp;", "&")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&mdash;", "—")
    .replaceAll("&ndash;", "–")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&rsaquo;", "›")
    .replaceAll("&rsaquo;", "›");
}

function extractBetween(raw, regex) {
  const m = raw.match(regex);
  return m ? m[1] : null;
}

function extractTitle(raw) {
  const h1 = extractBetween(raw, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return h1 ? unescapeHtml(h1).replace(/\s+/g, " ").trim() : null;
}

function extractBreadcrumbStrong(raw) {
  // Example:
  // <div class="breadcrumbs">... <strong>Topic 38: Articles, Amendments &amp; Constitutional Reference</strong></div>
  const m = raw.match(
    /<strong>\s*Topic\s*(\d+)\s*:\s*([\s\S]*?)<\/strong>/i,
  );
  if (!m) return null;
  const topicNo = m[1];
  const body = m[2];
  return `Topic ${topicNo}: ${unescapeHtml(body)
    .replace(/\s+/g, " ")
    .trim()}`;
}

function extractReadTime(raw) {
  const readTime = extractBetween(raw, /~\s*(\d+)\s*min read/i);
  return readTime ? Number(readTime) : null;
}

function extractTags(raw) {
  const tags = [];
  const re = /<span class="tag[^"]*">\s*([^<]+?)\s*<\/span>/gi;
  let m;
  while ((m = re.exec(raw))) {
    const tag = unescapeHtml(m[1]).replace(/\s+/g, " ").trim();
    if (tag) tags.push(tag);
  }
  // De-dupe while keeping order.
  const seen = new Set();
  return tags.filter((t) => (seen.has(t.toLowerCase()) ? false : (seen.add(t.toLowerCase()), true))).slice(
    0,
    8,
  );
}

function guessPrelimsMains(raw) {
  const hasPrelims = /UPSC\s*Prelims/i.test(raw);
  const hasMains = /Mains/i.test(raw);
  return {
    prelims: hasPrelims ? 8 : 0,
    mains: hasMains ? 6 : 0,
  };
}

function fileNameForTopicId(topicId) {
  // File names follow the ones you listed in the chat.
  const suffixToFile = {
    "polity-topic23": "polity-topic23-upsc-state-psc-upsc-notes.html",
    "polity-topic24": "polity-topic24-election-commission-upsc-notes.html",
    "polity-topic25": "polity-topic25-finance-commission-upsc-notes.html",
    "polity-topic26": "polity-topic26-national-commissions-upsc-notes.html",
    "polity-topic27": "polity-topic27-cag-attorney-general-upsc-notes.html",
    "polity-topic28": "polity-topic28-gst-niti-aayog-planning-upsc-notes.html",
    "polity-topic29": "polity-topic29-nhrc-cvc-cic-upsc-notes.html",
    "polity-topic30": "polity-topic30-lokpal-cbi-nia-upsc-notes.html",
    "polity-topic31": "polity-topic31-ncw-ncm-ncdrc-upsc-notes.html",
    "polity-topic32": "polity-topic32-regulatory-bodies-upsc-notes.html",
    "polity-topic33": "polity-topic33-official-language-upsc-notes.html",
    "polity-topic34": "polity-topic34-services-tribunals-upsc-notes.html",
    "polity-topic35": "polity-topic35-reservations-elections-upsc-notes.html",
    "polity-topic36": "polity-topic36-anti-defection-elections-parties-upsc-notes.html",
    "polity-topic37": "polity-topic37-landmark-judgements-upsc-notes.html",
    "polity-topic38": "polity-topic38-reference-articles-amendments-upsc-notes.html",
  };
  return suffixToFile[topicId];
}

const out = [];
for (const topicId of topicIds) {
  const file = fileNameForTopicId(topicId);
  const srcPath = path.join(downloads, file);
  if (!fs.existsSync(srcPath)) {
    console.error(`Missing file: ${srcPath}`);
    process.exitCode = 1;
    continue;
  }
  const raw = fs.readFileSync(srcPath, "utf8");

  const title = extractTitle(raw);
  const sub = extractBreadcrumbStrong(raw);
  const readTime = extractReadTime(raw);
  const tags = extractTags(raw);
  const { prelims, mains } = guessPrelimsMains(raw);

  if (!title || !sub) {
    console.error(
      `Could not extract essentials for ${topicId} (title=${!!title}, sub=${!!sub}, readTime=${!!readTime})`,
    );
    process.exitCode = 1;
    continue;
  }

  out.push({
    id: topicId,
    title,
    sub,
    priority: "high",
    prelims,
    mains,
    status: "live",
    readTime: readTime ?? 22,
    tags,
  });
}

process.stdout.write(JSON.stringify(out, null, 2));

