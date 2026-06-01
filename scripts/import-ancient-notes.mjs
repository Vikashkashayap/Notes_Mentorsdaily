/**
 * Extracts main + right sidebar + styles from downloaded topic HTML files.
 * Run: node scripts/import-ancient-notes.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.ANCIENT_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "ancient");

function extractPageWrapperContent(raw) {
  const open = '<div class="page-wrapper">';
  const start = raw.indexOf(open);
  if (start === -1) return null;
  const afterOpen = start + open.length;

  const endMarkers = [
    "</div><!-- end .page-wrapper -->",
    "</div><!-- end page-wrapper -->",
  ];
  for (const marker of endMarkers) {
    const end = raw.indexOf(marker, afterOpen);
    if (end !== -1) return raw.slice(afterOpen, end).trim();
  }

  const scriptIdx = raw.indexOf("<script", afterOpen);
  const footerIdx = raw.indexOf("<footer", afterOpen);
  const endIdx =
    scriptIdx !== -1 && (footerIdx === -1 || scriptIdx < footerIdx)
      ? scriptIdx
      : footerIdx;
  if (endIdx === -1) return null;
  let chunk = raw.slice(afterOpen, endIdx).trimEnd();
  if (chunk.endsWith("</div>")) {
    chunk = chunk.slice(0, chunk.lastIndexOf("</div>")).trimEnd();
  }
  return chunk;
}

function extractMainOnly(raw) {
  const mainCol = raw.match(/<main class="main-col">([\s\S]*?)<\/main>/i);
  if (mainCol) return mainCol[1].trim();

  const mainContent = raw.match(
    /<main class="main-content">([\s\S]*?)<\/main>/i,
  );
  if (mainContent) return mainContent[1].trim();

  const pw = extractPageWrapperContent(raw);
  if (pw) return pw;

  const open = '<div class="main-content">';
  const start = raw.indexOf(open);
  if (start === -1) return null;
  const afterOpen = start + open.length;
  const scriptIdx = raw.indexOf("<script", afterOpen);
  const end =
    scriptIdx !== -1 ? scriptIdx : raw.indexOf("</body>", afterOpen);
  if (end === -1) return null;
  let chunk = raw.slice(afterOpen, end).trimEnd();
  const lastClose = chunk.lastIndexOf("</div>");
  if (lastClose !== -1) chunk = chunk.slice(0, lastClose).trimEnd();
  return chunk;
}

function extractTopicBody(raw) {
  const pw = extractPageWrapperContent(raw);
  if (pw) return pw;
  return extractMainOnly(raw);
}

function wrapPageWrapper(body) {
  const trimmed = body.trim();
  if (/^<div\s+class="page-wrapper"/i.test(trimmed)) {
    return body;
  }
  // Leading HTML comments then <main> (topic 06–08 layout)
  if (/^(\s*<!--[\s\S]*?-->\s*)*<main[\s>]/i.test(trimmed)) {
    return `<div class="page-wrapper">\n${body}\n</div>`;
  }
  if (/^<main[\s>]/i.test(trimmed)) {
    return `<div class="page-wrapper">\n${body}\n</div>`;
  }
  return `<div class="page-wrapper"><main class="main-content">${body}</main></div>`;
}

function stripEmbeddedChrome(html) {
  return html
    .replace(/<nav class="navbar">[\s\S]*?<\/nav>/gi, "")
    .replace(/<div class="breadcrumbs">[\s\S]*?<\/div>/gi, "")
    .replace(/<footer>[\s\S]*?<\/footer>/gi, "")
    .replace(/<button class="menu-btn"[^>]*>[\s\S]*?<\/button>/gi, "")
    .replace(/<button class="hamburger"[^>]*>[\s\S]*?<\/button>/gi, "");
}

function rewriteLinks(html) {
  return html
    .replace(/href="notes-hub\/index\.html"/g, 'href="/upsc-notes"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/upsc-notes"')
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/upsc-notes"')
    .replace(/href="\/upsc-notes\/index\.html[^"]*"/g, 'href="/upsc-notes"')
    .replace(
      /href="(ancient-topic\d{2})[^"]*\.html"/g,
      'href="/upsc-notes/ancient/$1"',
    )
    .replace(
      /href="(ancient-mod\d)[^"]*\.html"/g,
      'href="/upsc-notes/ancient"',
    );
}

const TOPICS = [
  { id: "ancient-topic01", file: "ancient-topic01-sources-upsc-notes.html" },
  { id: "ancient-topic02", file: "ancient-topic02-stone-age-upsc-notes.html" },
  { id: "ancient-topic03", file: "ancient-topic03-chalcolithic-age-upsc-notes.html" },
  { id: "ancient-topic04", file: "ancient-topic04-ivc-upsc-notes.html" },
  { id: "ancient-topic05", file: "ancient-topic05-vedic-age-upsc-notes.html" },
  { id: "ancient-topic06", file: "ancient-topic06-buddhism-jainism-upsc-notes.html" },
  { id: "ancient-topic07", file: "ancient-topic07-mahajanapadas-upsc-notes.html" },
  { id: "ancient-topic08", file: "ancient-topic08-foreign-invasions-upsc-notes.html" },
  { id: "ancient-topic09", file: "ancient-topic09-mauryan-empire-upsc-notes.html" },
  { id: "ancient-topic10", file: "ancient-topic10-post-mauryan-age-upsc-notes.html" },
  { id: "ancient-topic11", file: "ancient-topic11-gupta-era-upsc-notes.html" },
  { id: "ancient-topic12", file: "ancient-topic12-post-gupta-age-upsc-notes.html" },
];

const LAYOUT_CSS = `
/* Next.js: shared app navbar; restore two-column layout */
.notes-topic-embedded .navbar,
.notes-topic-embedded nav.navbar,
.notes-topic-embedded .breadcrumbs,
.notes-topic-embedded .hamburger,
.notes-topic-embedded .menu-btn,
.notes-topic-embedded footer { display: none !important; }

.notes-topic-embedded .page-wrapper {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 280px !important;
  gap: 28px !important;
  align-items: start !important;
  max-width: 1280px !important;
  margin: 0 auto !important;
  padding: 0 !important;
  margin-top: 0 !important;
}

.notes-topic-embedded .main-content,
.notes-topic-embedded main.main-content,
.notes-topic-embedded main {
  margin-left: 0 !important;
  min-width: 0;
}

.notes-topic-embedded aside,
.notes-topic-embedded .right-sidebar,
.notes-topic-embedded aside.sidebar {
  position: sticky !important;
  top: 88px !important;
  min-width: 0;
}

@media (max-width: 960px) {
  .notes-topic-embedded .page-wrapper {
    grid-template-columns: 1fr !important;
  }
  .notes-topic-embedded aside,
  .notes-topic-embedded .right-sidebar,
  .notes-topic-embedded aside.sidebar {
    position: static !important;
  }
}
`;

fs.mkdirSync(outDir, { recursive: true });

for (const { id, file } of TOPICS) {
  const srcPath = path.join(downloads, file);
  if (!fs.existsSync(srcPath)) {
    console.error(`Missing: ${srcPath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(srcPath, "utf8");
  const styleMatch = raw.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyRaw = extractTopicBody(raw);
  if (!styleMatch || !bodyRaw) {
    console.error(`Parse failed for ${file}`);
    process.exit(1);
  }

  let styles = styleMatch[1] + LAYOUT_CSS;
  let body = stripEmbeddedChrome(rewriteLinks(bodyRaw));
  body = body.replace(
    /<a href="#">Ancient History<\/a>/g,
    '<a href="/upsc-notes/ancient">Ancient History</a>',
  );

  const inner = wrapPageWrapper(body);

  const out = `<!-- ${id} — auto-imported from ${file} -->
<style data-topic-notes>${styles}</style>
<div class="notes-topic-embedded">
${inner}
</div>
`;

  fs.writeFileSync(path.join(outDir, `${id}.html`), out, "utf8");
  console.log(`Wrote ${id}.html`);
}

console.log("Done.");
