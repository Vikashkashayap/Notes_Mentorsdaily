/**
 * Imports UPSC Polity topic HTML files into `src/content/polity/`.
 *
 * Run:
 *   node scripts/import-polity-notes.mjs
 *
 * Optional env:
 *   POLITY_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.POLITY_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "polity");

const CHAPTER_TITLES = {
  "polity-topic01": "Constitutional Framework",
  "polity-topic02": "Salient Features & Sources of the Constitution",
  "polity-topic03": "Parts & Schedules of the Constitution",
  "polity-topic04": "Preamble of the Constitution",
  "polity-topic05": "Union and its Territory",
  "polity-topic06": "Citizenship",
  "polity-topic07": "Fundamental Rights",
  "polity-topic08": "Directive Principles & Fundamental Duties",
  "polity-topic09": "Amendment & Basic Structure Doctrine",
  "polity-topic10": "Parliament",
  "polity-topic11": "President & Vice President",
  "polity-topic12": "Prime Minister, Cabinet & CoM",
  "polity-topic13": "Parliamentary & Federal System",
  "polity-topic14": "Centre-State Relations",
  "polity-topic15": "Emergency Provisions",
  "polity-topic16": "Governor, CM & State CoM",
  "polity-topic17": "State Legislature",
  "polity-topic18": "UTs, Scheduled & Tribal Areas",
  "polity-topic19": "Panchayati Raj & Municipalities",
  "polity-topic20": "Supreme Court",
  "polity-topic21": "High Courts & Subordinate Courts",
  "polity-topic22": "Judicial Review, Activism & PIL",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function polityTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/indian-polity/${titleToSlug(title)}` : "/indian-polity";
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
  const endIdx = footerIdx !== -1 ? footerIdx : raw.indexOf("<script", layoutIdx);
  if (endIdx === -1) return null;
  const layoutBlock = raw.slice(layoutIdx, endIdx).trim();

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
  let out = html
    .replace(/href="\/upsc-notes\/polity[^"]*"/g, 'href="/indian-polity"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/"')
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/indian-polity"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/indian-polity"')
    .replace(/href="notes-hub\/index\.html"/g, 'href="/indian-polity"');

  out = out.replace(
    /href="(polity-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${polityTopicHref(topicId)}"`,
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
  { id: "polity-topic01", file: "polity-topic01-constitutional-framework-upsc-notes.html" },
  { id: "polity-topic02", file: "polity-topic02-salient-features-sources-upsc-notes.html" },
  { id: "polity-topic03", file: "polity-topic03-parts-schedules-upsc-notes.html" },
  { id: "polity-topic04", file: "polity-topic04-preamble-upsc-notes.html" },
  { id: "polity-topic05", file: "polity-topic05-union-territory-upsc-notes.html" },
  { id: "polity-topic06", file: "polity-topic06-citizenship-upsc-notes.html" },
  { id: "polity-topic07", file: "polity-topic07-fundamental-rights-upsc-notes.html" },
  { id: "polity-topic08", file: "polity-topic08-dpsp-fundamental-duties-upsc-notes.html" },
  { id: "polity-topic09", file: "polity-topic09-amendment-basic-structure-upsc-notes.html" },
  { id: "polity-topic10", file: "polity-topic10-parliament-upsc-notes.html" },
  { id: "polity-topic11", file: "polity-topic11-president-vice-president-upsc-notes.html" },
  { id: "polity-topic12", file: "polity-topic12-pm-cabinet-upsc-notes.html" },
  { id: "polity-topic13", file: "polity-topic13-parliamentary-federal-upsc-notes.html" },
  { id: "polity-topic14", file: "polity-topic14-centre-state-relations-upsc-notes.html" },
  { id: "polity-topic15", file: "polity-topic15-emergency-upsc-notes.html" },
  { id: "polity-topic16", file: "polity-topic16-governor-cm-state-com-upsc-notes.html" },
  { id: "polity-topic17", file: "polity-topic17-state-legislature-upsc-notes.html" },
  { id: "polity-topic18", file: "polity-topic18-uts-scheduled-tribal-areas-upsc-notes.html" },
  { id: "polity-topic19", file: "polity-topic19-panchayati-raj-municipalities-upsc-notes.html" },
  { id: "polity-topic20", file: "polity-topic20-supreme-court-upsc-notes.html" },
  { id: "polity-topic21", file: "polity-topic21-high-courts-subordinate-courts-upsc-notes.html" },
  { id: "polity-topic22", file: "polity-topic22-judicial-review-activism-pil-upsc-notes.html" },
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
