/**
 * Imports UPSC Medieval topic HTML files into `src/content/medieval/`.
 *
 * Run:
 *   node scripts/import-medieval-notes.mjs
 *
 * Optional env:
 *   MEDIEVAL_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.MEDIEVAL_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "medieval");

const CHAPTER_TITLES = {
  "medieval-topic01": "Early Medieval India (c. 750–1200 AD)",
  "medieval-topic02": "The Chola Empire (c. 850–1200 AD)",
  "medieval-topic03": "The Age of Conflict & Turkish Invasions (c. 1000–1200 AD)",
  "medieval-topic04": "The Delhi Sultanate (1206–1526 AD)",
  "medieval-topic05": "Vijayanagar & Bahmani Kingdoms (1336–1646 AD)",
  "medieval-topic06": "The Mughal Empire (1526–1707 AD)",
  "medieval-topic07": "Marathas & Regional States (1707–1818 AD)",
  "medieval-topic08": "Bhakti & Sufi Religious Movements",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function medievalTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title
    ? `/medieval-history/${titleToSlug(title)}`
    : "/medieval-history";
}

function resolveSourcePath(dir, file) {
  const base = path.join(dir, file);
  const copy = path.join(dir, file.replace(/\.html$/i, " (1).html"));
  if (fs.existsSync(copy) && fs.existsSync(base)) {
    const copyMtime = fs.statSync(copy).mtimeMs;
    const baseMtime = fs.statSync(base).mtimeMs;
    return copyMtime >= baseMtime ? copy : base;
  }
  if (fs.existsSync(copy)) return copy;
  return base;
}

function extractHeroAndLayout(raw) {
  const layoutIdx = raw.indexOf('<div class="layout">');
  if (layoutIdx === -1) return null;
  const footerIdx = raw.indexOf("<footer", layoutIdx);
  if (footerIdx === -1) return null;
  const layoutBlock = raw.slice(layoutIdx, footerIdx).trim();

  const heroIdx = raw.lastIndexOf('<div class="hero">', layoutIdx);
  if (heroIdx === -1) return layoutBlock;
  return `${raw.slice(heroIdx, layoutIdx).trim()}\n${layoutBlock}`;
}

function extractMainOnly(raw) {
  const mainContent = raw.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainContent) return mainContent[0].trim();
  return null;
}

function extractTopicBody(raw) {
  const compact = extractHeroAndLayout(raw);
  if (compact) return compact;
  return extractMainOnly(raw);
}

function stripEmbeddedChrome(html) {
  return html
    .replace(/<nav class="navbar">[\s\S]*?<\/nav>/gi, "")
    .replace(/<nav class="topnav">[\s\S]*?<\/nav>/gi, "")
    .replace(/<div class="breadcrumbs">[\s\S]*?<\/div>/gi, "")
    .replace(/<footer>[\s\S]*?<\/footer>/gi, "");
}

function rewriteLinks(html) {
  // Keep in-page anchors; rewrite known topic links into app routes.
  let out = html
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/upsc-notes"')
    .replace(/href="ancient[^"]*\.html"/g, 'href="/ancient-history"');

  out = out.replace(/href="\/medieval-history\/medieval-topic\d{2}"/g, (match) => {
    const id = match.match(/medieval-topic\d{2}/)?.[0];
    return id ? `href="${medievalTopicHref(id)}"` : match;
  });

  out = out.replace(
    /href="(medieval-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${medievalTopicHref(topicId)}"`,
  );

  return out;
}

const LAYOUT_CSS = `
/* Next.js: shared app navbar; hide embedded chrome */
.notes-topic-embedded nav.topnav,
.notes-topic-embedded nav.navbar,
.notes-topic-embedded .breadcrumbs,
.notes-topic-embedded footer { display: none !important; }

.notes-topic-embedded .layout {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 320px !important;
  gap: 28px !important;
  align-items: start !important;
  max-width: 1280px !important;
  margin: 0 auto !important;
  padding: 0 0 28px !important;
}

.notes-topic-embedded .hero {
  max-width: 1280px;
  margin: 0 auto;
}

.notes-topic-embedded .layout > main { min-width: 0; }

.notes-topic-embedded .layout > aside {
  position: sticky !important;
  top: 88px !important;
  min-width: 0;
}

@media (max-width: 960px) {
  .notes-topic-embedded .layout {
    grid-template-columns: 1fr !important;
    padding: 0 0 18px !important;
  }
  .notes-topic-embedded .layout > aside {
    position: static !important;
  }
}
`;

const TOPICS = [
  { id: "medieval-topic01", file: "medieval-topic01-early-medieval-india-upsc-notes.html" },
  { id: "medieval-topic02", file: "medieval-topic02-chola-empire-upsc-notes.html" },
  { id: "medieval-topic03", file: "medieval-topic03-age-of-conflict-arab-turkish-invasions-upsc-notes.html" },
  { id: "medieval-topic04", file: "medieval-topic04-delhi-sultanate-upsc-notes.html" },
  { id: "medieval-topic05", file: "medieval-topic05-vijayanagar-bahmani-upsc-notes.html" },
  { id: "medieval-topic06", file: "medieval-topic06-mughal-empire-upsc-notes.html" },
  { id: "medieval-topic07", file: "medieval-topic07-marathas-regional-states-upsc-notes.html" },
  { id: "medieval-topic08", file: "medieval-topic08-bhakti-sufi-religious-movements-upsc-notes.html" },
];

fs.mkdirSync(outDir, { recursive: true });

for (const { id, file } of TOPICS) {
  const srcPath = resolveSourcePath(downloads, file);
  if (!fs.existsSync(srcPath)) {
    console.error(`Missing: ${srcPath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(srcPath, "utf8");
  const styleMatch = raw.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyRaw = extractTopicBody(raw);
  if (!styleMatch || !bodyRaw) {
    console.error(`Parse failed for ${path.basename(srcPath)}`);
    process.exit(1);
  }

  const styles = styleMatch[1] + LAYOUT_CSS;
  const body = stripEmbeddedChrome(rewriteLinks(bodyRaw));
  const sourceName = path.basename(srcPath);

  const out = `<!-- ${id} — auto-imported from ${sourceName} -->
<style data-topic-notes>${styles}</style>
<div class="notes-topic-embedded">
${body}
</div>
`;

  fs.writeFileSync(path.join(outDir, `${id}.html`), out, "utf8");
  console.log(`Wrote ${id}.html ← ${sourceName}`);
}

console.log("Done.");

