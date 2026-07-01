/**
 * Imports UPSC Modern History topic HTML files into `src/content/modern/`.
 *
 * Run:
 *   node scripts/import-modern-notes.mjs
 *
 * Optional env:
 *   MODERN_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.MODERN_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "modern");

const CHAPTER_TITLES = {
  "modern-topic01": "Arrival of European Companies in India",
  "modern-topic02": "Decline of the Mughal Empire",
  "modern-topic03": "Emergence of New States in the 18th Century",
  "modern-topic04": "Consolidation & Expansion of British Power in India",
  "modern-topic05": "British Administrative Organization in India Till 1857",
  "modern-topic06": "Revolt of 1857",
  "modern-topic07": "Administrative Changes in British India after 1858",
  "modern-topic08": "Religious & Social Reform Movements in 19th Century India",
  "modern-topic09": "Indian Economy Under British Rule",
  "modern-topic10": "Education and the Press under British Rule",
  "modern-topic11": "People's Resistance Against British Before 1857",
  "modern-topic12": "Indian National Congress & the Moderate Phase 1885–1905",
  "modern-topic13": "Rise of Indian Nationalism & Early INC (1858–1905)",
  "modern-topic14": "Extremist Phase & Swadeshi Movement 1905–1917",
  "modern-topic15": "Gandhian Era — Freedom Struggle 1915–1939",
  "modern-topic16": "Struggle for Swaraj 1925–1939",
  "modern-topic17": "Towards Independence — Quit India to Partition 1939–1947",
  "modern-topic18": "India on Eve of Independence (1939–1947): WWII to Partition",
  "modern-topic19": "Governor-Generals & Viceroys of India (1773–1950)",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function modernTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title
    ? `/modern-history/${titleToSlug(title)}`
    : "/modern-history";
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

function findHeroStart(raw, layoutIdx) {
  const divHero = raw.lastIndexOf('<div class="hero">', layoutIdx);
  const sectionHero = raw.lastIndexOf('<section class="hero">', layoutIdx);
  return Math.max(divHero, sectionHero);
}

function extractHeroAndLayout(raw) {
  const layoutIdx = raw.indexOf('<div class="layout">');
  if (layoutIdx === -1) return null;
  const footerIdx = raw.indexOf("<footer", layoutIdx);
  const endIdx = footerIdx !== -1 ? footerIdx : raw.indexOf("<script", layoutIdx);
  if (endIdx === -1) return null;
  const layoutBlock = raw.slice(layoutIdx, endIdx).trim();

  const heroIdx = findHeroStart(raw, layoutIdx);
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
    .replace(/<header class="topnav">[\s\S]*?<\/header>/gi, "")
    .replace(/<nav class="navbar">[\s\S]*?<\/nav>/gi, "")
    .replace(/<nav class="topnav">[\s\S]*?<\/nav>/gi, "")
    .replace(/<nav class="breadcrumb">[\s\S]*?<\/nav>/gi, "")
    .replace(/<div class="breadcrumbs">[\s\S]*?<\/div>/gi, "")
    .replace(/<footer>[\s\S]*?<\/footer>/gi, "");
}

function rewriteLinks(html) {
  let out = html
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/upsc-notes"')
    .replace(/href="ancient[^"]*\.html"/g, 'href="/ancient-history"')
    .replace(/href="medieval[^"]*\.html"/g, 'href="/medieval-history"');

  out = out.replace(/href="\/modern-history\/modern-topic\d{2}"/g, (match) => {
    const id = match.match(/modern-topic\d{2}/)?.[0];
    return id ? `href="${modernTopicHref(id)}"` : match;
  });

  out = out.replace(
    /href="(modern-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${modernTopicHref(topicId)}"`,
  );

  return out;
}

const LAYOUT_CSS = `
/* Next.js: shared app navbar; hide embedded chrome */
.notes-topic-embedded header.topnav,
.notes-topic-embedded nav.topnav,
.notes-topic-embedded nav.navbar,
.notes-topic-embedded nav.breadcrumb,
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

.notes-topic-embedded .hero,
.notes-topic-embedded section.hero {
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
  { id: "modern-topic01", file: "modern-topic01-european-companies-upsc-notes.html" },
  { id: "modern-topic02", file: "modern-topic02-mughal-decline-upsc-notes.html" },
  { id: "modern-topic03", file: "modern-topic03-new-states-18th-century-upsc-notes.html" },
  { id: "modern-topic04", file: "modern-topic04-british-expansion-upsc-notes.html" },
  { id: "modern-topic05", file: "modern-topic05-british-admin-till-1857-upsc-notes.html" },
  { id: "modern-topic06", file: "modern-topic06-revolt-1857-upsc-notes.html" },
  { id: "modern-topic07", file: "modern-topic07-admin-changes-after-1858-upsc-notes.html" },
  { id: "modern-topic08", file: "modern-topic08-religious-social-reform-upsc-notes.html" },
  { id: "modern-topic09", file: "modern-topic09-indian-economy-under-british-upsc-notes.html" },
  { id: "modern-topic10", file: "modern-topic10-education-press-upsc-notes.html" },
  { id: "modern-topic11", file: "modern-topic11-popular-movements-british-upsc-notes.html" },
  { id: "modern-topic12", file: "modern-topic12-indian-national-congress-upsc-notes.html" },
  { id: "modern-topic13", file: "modern-topic13-moderate-phase-nationalism-upsc-notes.html" },
  { id: "modern-topic14", file: "modern-topic14-extremist-phase-upsc-notes.html" },
  { id: "modern-topic15", file: "modern-topic15-gandhian-era-upsc-notes.html" },
  { id: "modern-topic16", file: "modern-topic16-struggle-for-swaraj-upsc-notes.html" },
  { id: "modern-topic17", file: "modern-topic17-towards-independence-upsc-notes.html" },
  { id: "modern-topic18", file: "modern-topic18-india-eve-of-independence-upsc-notes.html" },
  { id: "modern-topic19", file: "modern-topic19-governor-generals-viceroys-upsc-notes.html" },
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
