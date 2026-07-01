/**
 * Imports UPSC World Geography (Physical Geography) topic HTML files into `src/content/worldgeo/`.
 *
 * Run:
 *   node scripts/import-worldgeo-notes.mjs
 *
 * Optional env:
 *   WORLDGEO_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.WORLDGEO_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "worldgeo");

const CHAPTER_TITLES = {
  "worldgeo-topic01": "The Universe & the Solar System",
  "worldgeo-topic02": "The Earth — Shape, Motions, Geological Time, Moon & Magnetic Field",
  "worldgeo-topic03": "Geomorphology — Earth's System",
  "worldgeo-topic04": "Geomorphological Theories — Continental Drift, Sea-Floor Spreading & Plate Tectonics",
  "worldgeo-topic05": "Geomorphic Processes — Endogenic & Exogenic Forces",
  "worldgeo-topic06": "Major Landforms — Fluvial · Glacial · Aeolian · Marine · Karst",
  "worldgeo-topic07": "Atmosphere — Composition, Structure, Insolation & Heat Budget",
  "worldgeo-topic08": "Atmospheric Pressure & Wind Systems",
  "worldgeo-topic09": "Air Masses, Fronts & Cyclones",
  "worldgeo-topic10": "Water in the Atmosphere · Humidity · Clouds · Precipitation",
  "worldgeo-topic11": "World Climate Classification — Köppen · Trewartha · Thornthwaite",
  "worldgeo-topic12": "Oceanography — Relief, Temperature, Salinity, Waves, Tides & Currents",
  "worldgeo-topic13": "Marine Resources & the Ocean Economy",
  "worldgeo-topic14": "Biogeography & Ecosystems",
};

/** Source filenames (and aliases) → topic id for link rewriting */
const FILE_TO_TOPIC = {
  "geo-physical-topic01-universe-solar-system-upsc-notes.html": "worldgeo-topic01",
  "geo-physical-topic02-the-earth-upsc-notes.html": "worldgeo-topic02",
  "geo-physical-topic03-geomorphology-earth-system-upsc-notes.html": "worldgeo-topic03",
  "geo-physical-topic04-geomorphological-theories-upsc-notes.html": "worldgeo-topic04",
  "geo-physical-topic05-geomorphic-processes-upsc-notes.html": "worldgeo-topic05",
  "geo-physical-topic06-major-landforms-upsc-notes.html": "worldgeo-topic06",
  "geo-physical-topic07-atmosphere-insolation-upsc-notes.html": "worldgeo-topic07",
  "geo-physical-topic07-atmosphere-composition-structure-upsc-notes.html": "worldgeo-topic07",
  "geo-physical-topic08-pressure-winds-upsc-notes.html": "worldgeo-topic08",
  "geo-physical-topic09-air-masses-cyclones-upsc-notes.html": "worldgeo-topic09",
  "geo-physical-topic10-water-precipitation-upsc-notes.html": "worldgeo-topic10",
  "geo-physical-topic11-world-climate-classification-upsc-notes.html": "worldgeo-topic11",
  "geo-physical-topic12-oceanography-upsc-notes.html": "worldgeo-topic12",
  "geo-physical-topic13-marine-resources-upsc-notes.html": "worldgeo-topic13",
  "geo-physical-topic14-biogeography-upsc-notes.html": "worldgeo-topic14",
  "geo-physical-topic05-climatology-atmosphere-upsc-notes.html": "worldgeo-topic07",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function worldGeoTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title
    ? `/world-geography/${titleToSlug(title)}`
    : "/world-geography";
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
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/"')
    .replace(/href="geo[^"]*\.html"/g, 'href="/world-geography"');

  out = out.replace(/href="\/world-geography\/worldgeo-topic\d{2}"/g, (match) => {
    const id = match.match(/worldgeo-topic\d{2}/)?.[0];
    return id ? `href="${worldGeoTopicHref(id)}"` : match;
  });

  out = out.replace(
    /href="(geo-physical-topic[^"]+\.html)"/g,
    (_, file) => {
      const topicId = FILE_TO_TOPIC[file];
      return topicId ? `href="${worldGeoTopicHref(topicId)}"` : 'href="/world-geography"';
    },
  );

  out = out.replace(
    /href="(worldgeo-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${worldGeoTopicHref(topicId)}"`,
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
  { id: "worldgeo-topic01", file: "geo-physical-topic01-universe-solar-system-upsc-notes.html" },
  { id: "worldgeo-topic02", file: "geo-physical-topic02-the-earth-upsc-notes.html" },
  { id: "worldgeo-topic03", file: "geo-physical-topic03-geomorphology-earth-system-upsc-notes.html" },
  { id: "worldgeo-topic04", file: "geo-physical-topic04-geomorphological-theories-upsc-notes.html" },
  { id: "worldgeo-topic05", file: "geo-physical-topic05-geomorphic-processes-upsc-notes.html" },
  { id: "worldgeo-topic06", file: "geo-physical-topic06-major-landforms-upsc-notes.html" },
  { id: "worldgeo-topic07", file: "geo-physical-topic07-atmosphere-insolation-upsc-notes.html" },
  { id: "worldgeo-topic08", file: "geo-physical-topic08-pressure-winds-upsc-notes.html" },
  { id: "worldgeo-topic09", file: "geo-physical-topic09-air-masses-cyclones-upsc-notes.html" },
  { id: "worldgeo-topic10", file: "geo-physical-topic10-water-precipitation-upsc-notes.html" },
  { id: "worldgeo-topic11", file: "geo-physical-topic11-world-climate-classification-upsc-notes.html" },
  { id: "worldgeo-topic12", file: "geo-physical-topic12-oceanography-upsc-notes.html" },
  { id: "worldgeo-topic13", file: "geo-physical-topic13-marine-resources-upsc-notes.html" },
  { id: "worldgeo-topic14", file: "geo-physical-topic14-biogeography-upsc-notes.html" },
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
