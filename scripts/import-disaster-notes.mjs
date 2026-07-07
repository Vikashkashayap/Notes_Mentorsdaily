/**
 * Imports UPSC Disaster Management topic HTML files into `src/content/disaster/`.
 *
 * Run:
 *   node scripts/import-disaster-notes.mjs
 *
 * Optional env:
 *   DISASTER_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.DISASTER_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "disaster");

const CHAPTER_TITLES = {
  "disaster-topic01": "Basics, Concepts & DM Cycle",
  "disaster-topic02": "Geological Disasters",
  "disaster-topic03": "Hydro-Meteorological Disasters – I",
  "disaster-topic04": "Hydro-Meteorological Disasters – II",
  "disaster-topic05": "Man-Made Disasters",
  "disaster-topic06": "India's DM Framework: Law & Institutions",
  "disaster-topic07": "DRR Approaches & Special Concerns",
  "disaster-topic08": "International Frameworks & Cooperation",
  "disaster-topic09": "Major Disasters — Case Studies",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function disasterTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/disaster-management/${titleToSlug(title)}` : "/disaster-management";
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

function extractTopicBody(raw) {
  const layoutIdx = raw.indexOf('<div class="layout">');
  if (layoutIdx === -1) return null;
  const footerIdx = raw.indexOf("<footer", layoutIdx);
  const endIdx = footerIdx !== -1 ? footerIdx : raw.indexOf("<script", layoutIdx);
  if (endIdx === -1) return null;
  const layoutBlock = raw.slice(layoutIdx, endIdx).trim();

  const headerIdx = raw.lastIndexOf("<header>", layoutIdx);
  if (headerIdx !== -1) {
    return `${raw.slice(headerIdx, layoutIdx).trim()}\n${layoutBlock}`;
  }

  const heroIdx = raw.lastIndexOf('<div class="hero">', layoutIdx);
  if (heroIdx === -1) return layoutBlock;
  return `${raw.slice(heroIdx, layoutIdx).trim()}\n${layoutBlock}`;
}

function stripEmbeddedChrome(html) {
  return html
    .replace(/<nav class="navbar">[\s\S]*?<\/nav>/gi, "")
    .replace(/<nav class="topnav">[\s\S]*?<\/nav>/gi, "")
    .replace(/<div class="breadcrumbs">[\s\S]*?<\/div>/gi, "")
    .replace(/<footer>[\s\S]*?<\/footer>/gi, "");
}

function rewriteLinks(html) {
  let out = html
    .replace(/href="\/upsc-notes\/disaster[^"]*"/g, 'href="/disaster-management"')
    .replace(/href="\/upsc-notes\/disaster-management[^"]*"/g, 'href="/disaster-management"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/"')
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/disaster-management"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/disaster-management"')
    .replace(/href="notes-hub\/index\.html"/g, 'href="/disaster-management"');

  out = out.replace(
    /href="(disaster-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${disasterTopicHref(topicId)}"`,
  );

  return out;
}

const LAYOUT_CSS = `
/* Next.js: shared app navbar; hide embedded chrome */
.notes-topic-embedded nav.topnav,
.notes-topic-embedded nav.navbar,
.notes-topic-embedded .breadcrumbs,
.notes-topic-embedded footer { display: none !important; }

.notes-topic-embedded header {
  max-width: 1280px;
  margin: 0 auto 24px;
  border-radius: 14px;
}

.notes-topic-embedded .layout {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 320px !important;
  gap: 28px !important;
  align-items: start !important;
  max-width: 1280px !important;
  margin: 0 auto !important;
  padding: 0 0 28px !important;
}

.notes-topic-embedded .layout > main { min-width: 0; }

.notes-topic-embedded .layout > aside,
.notes-topic-embedded .aside-sticky {
  position: sticky !important;
  top: 88px !important;
  min-width: 0;
}

@media (max-width: 960px) {
  .notes-topic-embedded .layout {
    grid-template-columns: 1fr !important;
    padding: 0 0 18px !important;
  }
  .notes-topic-embedded .layout > aside,
  .notes-topic-embedded .aside-sticky {
    position: static !important;
  }
}
`;

const TOPICS = [
  { id: "disaster-topic01", file: "disaster-topic01-basics-concepts-dm-cycle-upsc-notes.html" },
  { id: "disaster-topic02", file: "disaster-topic02-geological-disasters-upsc-notes.html" },
  { id: "disaster-topic03", file: "disaster-topic03-hydro-meteorological-disasters-1-upsc-notes.html" },
  { id: "disaster-topic04", file: "disaster-topic04-hydro-meteorological-disasters-2-upsc-notes.html" },
  { id: "disaster-topic05", file: "disaster-topic05-man-made-disasters-upsc-notes.html" },
  { id: "disaster-topic06", file: "disaster-topic06-india-dm-framework-law-institutions-upsc-notes.html" },
  { id: "disaster-topic07", file: "disaster-topic07-drr-approaches-special-concerns-upsc-notes.html" },
  { id: "disaster-topic08", file: "disaster-topic08-international-frameworks-cooperation-upsc-notes.html" },
  { id: "disaster-topic09", file: "disaster-topic09-major-disasters-case-studies-upsc-notes.html" },
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
