/**
 * Imports UPSC Art & Culture topic HTML files into `src/content/culture/`.
 *
 * Run:
 *   node scripts/import-culture-notes.mjs
 *
 * Optional env:
 *   CULTURE_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.CULTURE_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "culture");

const CHAPTER_TITLES = {
  "culture-topic01a": "Architecture — Ancient & Classical",
  "culture-topic01b": "Architecture — Indo-Islamic, Colonial & Modern",
  "culture-topic02": "Indian Sculpture",
  "culture-topic03": "Artifacts & Excavation",
  "culture-topic04a": "Paintings — Prehistoric to Medieval",
  "culture-topic04b": "Paintings — Modern, Folk & Tribal",
  "culture-topic05": "UNESCO Heritage, ICH & GI Tags",
  "culture-topic06": "Indian Handicrafts & Art Forms",
  "culture-topic07": "Indian Music",
  "culture-topic08": "Indian Dance",
  "culture-topic09": "Indian Theatre",
  "culture-topic10": "Indian Puppetry",
  "culture-topic11": "Indian Martial Arts",
  "culture-topic12": "Indian Languages",
  "culture-topic13": "Indian Literature",
  "culture-topic14": "Religions of India",
  "culture-topic15": "Indian Philosophy",
  "culture-topic16": "The Bhakti Movement",
  "culture-topic17": "Sufism in India",
  "culture-topic18": "Ancient & Medieval Science & Technology",
  "culture-topic19": "Indian Fairs & Festivals",
  "culture-topic20": "Indian Cinema",
  "culture-topic21": "Indian Calendars & Eras",
  "culture-topic22": "Cultural Institutions",
  "culture-topic23": "Cultural Laws & Policies",
  "culture-topic24": "Awards & Recognition",
  "culture-topic25": "Important Cultural Personalities",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cultureTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/art-culture/${titleToSlug(title)}` : "/art-culture";
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
    .replace(/href="\/upsc-notes\/culture[^"]*"/g, 'href="/art-culture"')
    .replace(/href="\/upsc-notes\/art-culture[^"]*"/g, 'href="/art-culture"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/"')
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/art-culture"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/art-culture"')
    .replace(/href="notes-hub\/index\.html"/g, 'href="/art-culture"');

  out = out.replace(
    /href="(culture-topic\d{2}[a-z]?)[^"]*\.html"/g,
    (_, topicId) => `href="${cultureTopicHref(topicId)}"`,
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
  { id: "culture-topic01a", file: "culture-topic01a-architecture-ancient-classical-upsc-notes.html" },
  { id: "culture-topic01b", file: "culture-topic01b-architecture-indo-islamic-colonial-modern-upsc-notes.html" },
  { id: "culture-topic02", file: "culture-topic02-sculpture-upsc-notes.html" },
  { id: "culture-topic03", file: "culture-topic03-artifacts-excavation-upsc-notes.html" },
  { id: "culture-topic04a", file: "culture-topic04a-paintings-prehistoric-medieval-upsc-notes.html" },
  { id: "culture-topic04b", file: "culture-topic04b-paintings-modern-folk-tribal-upsc-notes.html" },
  { id: "culture-topic05", file: "culture-topic05-unesco-heritage-gi-tags-upsc-notes.html" },
  { id: "culture-topic06", file: "culture-topic06-handicrafts-artforms-upsc-notes.html" },
  { id: "culture-topic07", file: "culture-topic07-indian-music-upsc-notes.html" },
  { id: "culture-topic08", file: "culture-topic08-indian-dance-upsc-notes.html" },
  { id: "culture-topic09", file: "culture-topic09-indian-theatre-upsc-notes.html" },
  { id: "culture-topic10", file: "culture-topic10-puppetry-upsc-notes.html" },
  { id: "culture-topic11", file: "culture-topic11-martial-arts-upsc-notes.html" },
  { id: "culture-topic12", file: "culture-topic12-indian-languages-upsc-notes.html" },
  { id: "culture-topic13", file: "culture-topic13-indian-literature-upsc-notes.html" },
  { id: "culture-topic14", file: "culture-topic14-religion-upsc-notes.html" },
  { id: "culture-topic15", file: "culture-topic15-indian-philosophy-upsc-notes.html" },
  { id: "culture-topic16", file: "culture-topic16-bhakti-movement-upsc-notes.html" },
  { id: "culture-topic17", file: "culture-topic17-sufism-upsc-notes.html" },
  { id: "culture-topic18", file: "culture-topic18-science-technology-ancient-upsc-notes.html" },
  { id: "culture-topic19", file: "culture-topic19-fairs-festivals-upsc-notes.html" },
  { id: "culture-topic20", file: "culture-topic20-indian-cinema-upsc-notes.html" },
  { id: "culture-topic21", file: "culture-topic21-calendars-upsc-notes.html" },
  { id: "culture-topic22", file: "culture-topic22-institutions-upsc-notes.html" },
  { id: "culture-topic23", file: "culture-topic23-laws-policies-upsc-notes.html" },
  { id: "culture-topic24", file: "culture-topic24-awards-recognition-upsc-notes.html" },
  { id: "culture-topic25", file: "culture-topic25-important-personalities-upsc-notes.html" },
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
