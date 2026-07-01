/**
 * Imports UPSC World History topic HTML files into `src/content/world/`.
 *
 * Run:
 *   node scripts/import-world-notes.mjs
 *
 * Optional env:
 *   WORLD_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.WORLD_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "world");

const CHAPTER_TITLES = {
  "world-topic01": "Industrial Revolution (1760–1914)",
  "world-topic02": "American Revolution (1763–1789)",
  "world-topic03": "French Revolution (1789–1799)",
  "world-topic04": "Napoleon & Congress of Vienna (1799–1815)",
  "world-topic05": "Unification of Italy & Germany (1815–1871)",
  "world-topic06": "Imperialism & the Scramble for Africa (1870–1914)",
  "world-topic07": "World War I (1914–1918)",
  "world-topic08": "The Russian Revolution (1905–1924)",
  "world-topic09": "Inter-War Years & the Great Depression (1919–1939)",
  "world-topic10": "World War II (1939–1945)",
  "world-topic11": "The Cold War (1945–1991)",
  "world-topic12": "Disintegration of USSR (1985–1991)",
  "world-topic13": "Post-Cold War World (1991–2026)",
  "world-topic14": "Decolonisation, NAM & Apartheid (1945–1994)",
  "world-topic15": "Modern China (1911–2026)",
  "world-topic16": "The Modern Middle East (1918–2026)",
  "world-topic17": "Socialism, Communism & Capitalism (1776–2026)",
  "world-topic18": "World History 1750–1991 — Complete Overview",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function worldTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title
    ? `/world-history/${titleToSlug(title)}`
    : "/world-history";
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
    .replace(/href="medieval[^"]*\.html"/g, 'href="/medieval-history"')
    .replace(/href="modern[^"]*\.html"/g, 'href="/modern-history"');

  out = out.replace(/href="\/world-history\/world-topic\d{2}"/g, (match) => {
    const id = match.match(/world-topic\d{2}/)?.[0];
    return id ? `href="${worldTopicHref(id)}"` : match;
  });

  out = out.replace(
    /href="(world-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${worldTopicHref(topicId)}"`,
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
  { id: "world-topic01", file: "world-topic01-industrial-revolution-upsc-notes.html" },
  { id: "world-topic02", file: "world-topic02-american-revolution-upsc-notes.html" },
  { id: "world-topic03", file: "world-topic03-french-revolution-upsc-notes.html" },
  { id: "world-topic04", file: "world-topic04-napoleon-vienna-upsc-notes.html" },
  { id: "world-topic05", file: "world-topic05-unification-italy-germany-upsc-notes.html" },
  { id: "world-topic06", file: "world-topic06-imperialism-scramble-africa-upsc-notes.html" },
  { id: "world-topic07", file: "world-topic07-world-war-one-upsc-notes.html" },
  { id: "world-topic08", file: "world-topic08-russian-revolution-upsc-notes.html" },
  { id: "world-topic09", file: "world-topic09-interwar-great-depression-upsc-notes.html" },
  { id: "world-topic10", file: "world-topic10-world-war-two-upsc-notes.html" },
  { id: "world-topic11", file: "world-topic11-cold-war-upsc-notes.html" },
  { id: "world-topic12", file: "world-topic12-ussr-disintegration-upsc-notes.html" },
  { id: "world-topic13", file: "world-topic02-post-cold-war-world-upsc-notes.html" },
  { id: "world-topic14", file: "world-topic14-decolonisation-nam-apartheid-upsc-notes.html" },
  { id: "world-topic15", file: "world-topic13-modern-china-upsc-notes.html" },
  { id: "world-topic16", file: "world-topic15-middle-east-upsc-notes.html" },
  { id: "world-topic17", file: "world-topic16-socialism-communism-capitalism-upsc-notes.html" },
  { id: "world-topic18", file: "world-topic01-world-history-upsc-notes.html" },
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
