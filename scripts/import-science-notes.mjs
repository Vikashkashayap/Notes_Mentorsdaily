/**
 * Imports UPSC Science & Technology topic HTML files into `src/content/science/`.
 *
 * Run:
 *   node scripts/import-science-notes.mjs
 *
 * Optional env:
 *   SCIENCE_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.SCIENCE_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "science");

const CHAPTER_TITLES = {
  "science-topic01": "Biology — Life, Processes & Classification",
  "science-topic02": "The Cell & Tissues",
  "science-topic03": "Human Physiology",
  "science-topic04": "Reproduction & Genetics",
  "science-topic05": "Immunity, Diseases & Health",
  "science-topic06": "Chemistry",
  "science-topic07": "Physics",
  "science-topic08": "Space Technology I — ISRO & Launch Vehicles",
  "science-topic09": "Space Technology II — Missions & Space Economy",
  "science-topic10": "Biotechnology",
  "science-topic11": "Nanotechnology",
  "science-topic12": "Computer & IT",
  "science-topic13": "Artificial Intelligence & Robotics",
  "science-topic14": "Advanced Computing — Supercomputers & Quantum",
  "science-topic15": "Nuclear Technology",
  "science-topic16": "Defence Technology",
  "science-topic17": "India's Science & Technology Ecosystem",
  "science-topic18": "Emerging & Frontier Technologies",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function scienceTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/science-technology/${titleToSlug(title)}` : "/science-technology";
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
    .replace(/href="\/upsc-notes\/science[^"]*"/g, 'href="/science-technology"')
    .replace(/href="\/upsc-notes\/science-technology[^"]*"/g, 'href="/science-technology"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/"')
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/science-technology"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/science-technology"')
    .replace(/href="notes-hub\/index\.html"/g, 'href="/science-technology"');

  // Source files use scitech-topicNN; map to science-topicNN routes
  out = out.replace(
    /href="(?:scitech|science)-topic(\d{2})[^"]*\.html"/g,
    (_, num) => `href="${scienceTopicHref(`science-topic${num}`)}"`,
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
  { id: "science-topic01", file: "scitech-topic01-biology-life-classification-upsc-notes.html" },
  { id: "science-topic02", file: "scitech-topic02-cell-tissues-upsc-notes.html" },
  { id: "science-topic03", file: "scitech-topic03-human-physiology-upsc-notes.html" },
  { id: "science-topic04", file: "scitech-topic04-reproduction-genetics-upsc-notes.html" },
  { id: "science-topic05", file: "scitech-topic05-immunity-diseases-health-upsc-notes.html" },
  { id: "science-topic06", file: "scitech-topic06-chemistry-upsc-notes.html" },
  { id: "science-topic07", file: "scitech-topic07-physics-upsc-notes.html" },
  { id: "science-topic08", file: "scitech-topic08-space-technology-1-upsc-notes.html" },
  { id: "science-topic09", file: "scitech-topic09-space-technology-2-upsc-notes.html" },
  { id: "science-topic10", file: "scitech-topic10-biotechnology-upsc-notes.html" },
  { id: "science-topic11", file: "scitech-topic11-nanotechnology-upsc-notes.html" },
  { id: "science-topic12", file: "scitech-topic12-computer-it-upsc-notes.html" },
  { id: "science-topic13", file: "scitech-topic13-ai-robotics-upsc-notes.html" },
  { id: "science-topic14", file: "scitech-topic14-computing-supercomputers-3dprinting-upsc-notes.html" },
  { id: "science-topic15", file: "scitech-topic15-nuclear-technology-upsc-notes.html" },
  { id: "science-topic16", file: "scitech-topic16-defence-technology-upsc-notes.html" },
  { id: "science-topic17", file: "scitech-topic17-research-schemes-stip-upsc-notes.html" },
  { id: "science-topic18", file: "scitech-topic18-emerging-frontiers-upsc-notes.html" },
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
