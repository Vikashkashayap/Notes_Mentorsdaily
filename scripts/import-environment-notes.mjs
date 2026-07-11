/**
 * Imports UPSC Environment & Ecology topic HTML files into `src/content/environment/`.
 *
 * Run:
 *   node scripts/import-environment-notes.mjs
 *
 * Optional env:
 *   ENVIRONMENT_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.ENVIRONMENT_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "environment");

const CHAPTER_TITLES = {
  "environment-topic01": "Ecology Fundamentals",
  "environment-topic02": "Species Interactions & Functional Classes",
  "environment-topic03": "Carrying Capacity & Population Growth",
  "environment-topic04": "Ecosystem Structure & Function",
  "environment-topic05": "Terrestrial Ecosystems & Biomes",
  "environment-topic06": "Aquatic & Wetland Ecosystems",
  "environment-topic07": "Biosphere & Biosphere Reserves",
  "environment-topic08": "Ecological Succession & Homeostasis",
  "environment-topic09": "Organism-Environment Interactions",
  "environment-topic10": "Biogeochemical Cycles",
  "environment-topic11": "Biodiversity Basics & Measurement",
  "environment-topic12": "Biodiversity Loss & Threats",
  "environment-topic13": "In-Situ Conservation",
  "environment-topic14": "Ex-Situ Conservation & Forest Governance",
  "environment-topic15": "Important Species Lists",
  "environment-topic16": "Biodiversity of India",
  "environment-topic17": "Global Warming & Ozone Depletion",
  "environment-topic18": "Climate Change Effects — Land & Soil",
  "environment-topic19": "Climate Change Effects — Water & Ocean",
  "environment-topic20": "Climate Mitigation & India's Response",
  "environment-topic21": "Water Pollution",
  "environment-topic22": "Air Pollution",
  "environment-topic23": "Soil, Noise, Thermal & Radioactive Pollution",
  "environment-topic24": "Waste Management",
  "environment-topic25": "Environmental Toxicology & Pollution Diseases",
  "environment-topic26": "Renewable Energy",
  "environment-topic27": "Environmental Exploitative Practices & Issues",
  "environment-topic28": "EIA & Coal/Thermal Power Impacts",
  "environment-topic29": "Indian Environmental Acts & Rules",
  "environment-topic30": "Indian Environmental Schemes & Missions",
  "environment-topic31": "Environmental Treaties & Conventions — I",
  "environment-topic32": "Environmental Treaties & Conventions — II",
  "environment-topic33": "Conference of Parties (COP)",
  "environment-topic34": "International Environmental Organizations & Funds",
  "environment-topic35": "Indian Environmental Institutional & Ministerial Bodies",
  "environment-topic36": "Environmental Funds & Indian NGOs",
  "environment-topic37": "Environmental Movements & Campaigns",
  "environment-topic38": "Important Static Lists & Terminology",
  "environment-topic39": "Miscellaneous & Emerging Environmental Concepts",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function environmentTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/environment/${titleToSlug(title)}` : "/environment";
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
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/environment"')
    .replace(/href="\/upsc-notes\/environment[^"]*"/g, 'href="/environment"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/upsc-notes"');

  out = out.replace(/href="\/environment\/environment-topic\d{2}"/g, (match) => {
    const id = match.match(/environment-topic\d{2}/)?.[0];
    return id ? `href="${environmentTopicHref(id)}"` : match;
  });

  out = out.replace(
    /href="(environment-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${environmentTopicHref(topicId)}"`,
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
  { id: "environment-topic01", file: "environment-topic01-ecology-fundamentals-upsc-notes.html" },
  { id: "environment-topic02", file: "environment-topic02-species-interactions-functional-classes-upsc-notes.html" },
  { id: "environment-topic03", file: "environment-topic03-carrying-capacity-population-growth-upsc-notes.html" },
  { id: "environment-topic04", file: "environment-topic04-ecosystem-structure-function-upsc-notes.html" },
  { id: "environment-topic05", file: "environment-topic05-terrestrial-ecosystems-biomes-upsc-notes.html" },
  { id: "environment-topic06", file: "environment-topic06-aquatic-wetland-ecosystems-upsc-notes.html" },
  { id: "environment-topic07", file: "environment-topic07-biosphere-biosphere-reserves-upsc-notes.html" },
  { id: "environment-topic08", file: "environment-topic08-ecological-succession-homeostasis-upsc-notes.html" },
  { id: "environment-topic09", file: "environment-topic09-organism-environment-interactions-upsc-notes.html" },
  { id: "environment-topic10", file: "environment-topic10-biogeochemical-cycles-upsc-notes.html" },
  { id: "environment-topic11", file: "environment-topic11-biodiversity-basics-measurement-upsc-notes.html" },
  { id: "environment-topic12", file: "environment-topic12-biodiversity-loss-threats-upsc-notes.html" },
  { id: "environment-topic13", file: "environment-topic13-in-situ-conservation-upsc-notes.html" },
  { id: "environment-topic14", file: "environment-topic14-ex-situ-conservation-forest-governance-upsc-notes.html" },
  { id: "environment-topic15", file: "environment-topic15-important-species-lists-upsc-notes.html" },
  { id: "environment-topic16", file: "environment-topic16-biodiversity-of-india-upsc-notes.html" },
  { id: "environment-topic17", file: "environment-topic17-global-warming-ozone-depletion-upsc-notes.html" },
  { id: "environment-topic18", file: "environment-topic18-climate-change-effects-land-soil-upsc-notes.html" },
  { id: "environment-topic19", file: "environment-topic19-climate-change-effects-water-ocean-upsc-notes.html" },
  { id: "environment-topic20", file: "environment-topic20-climate-mitigation-indias-response-upsc-notes.html" },
  { id: "environment-topic21", file: "environment-topic21-water-pollution-upsc-notes.html" },
  { id: "environment-topic22", file: "environment-topic22-air-pollution-upsc-notes.html" },
  { id: "environment-topic23", file: "environment-topic23-soil-noise-thermal-radioactive-pollution-upsc-notes.html" },
  { id: "environment-topic24", file: "environment-topic24-waste-management-upsc-notes.html" },
  { id: "environment-topic25", file: "environment-topic25-environmental-toxicology-pollution-diseases-upsc-notes.html" },
  { id: "environment-topic26", file: "environment-topic26-renewable-energy-upsc-notes.html" },
  { id: "environment-topic27", file: "environment-topic27-environment-exploitative-practices-issues-upsc-notes.html" },
  { id: "environment-topic28", file: "environment-topic28-eia-coal-power-impacts-upsc-notes.html" },
  { id: "environment-topic29", file: "environment-topic29-indian-environmental-acts-rules-upsc-notes.html" },
  { id: "environment-topic30", file: "environment-topic30-indian-environmental-schemes-missions-upsc-notes.html" },
  { id: "environment-topic31", file: "environment-topic31-treaties-conventions-i-upsc-notes.html" },
  { id: "environment-topic32", file: "environment-topic32-treaties-conventions-ii-upsc-notes.html" },
  { id: "environment-topic33", file: "environment-topic33-conference-of-parties-cop-upsc-notes.html" },
  { id: "environment-topic34", file: "environment-topic34-international-environmental-organizations-funds-upsc-notes.html" },
  { id: "environment-topic35", file: "environment-topic35-indian-institutional-ministerial-bodies-upsc-notes.html" },
  { id: "environment-topic36", file: "environment-topic36-environmental-funds-indian-ngos-upsc-notes.html" },
  { id: "environment-topic37", file: "environment-topic37-environmental-movements-campaigns-upsc-notes.html" },
  { id: "environment-topic38", file: "environment-topic38-static-lists-terminology-upsc-notes.html" },
  { id: "environment-topic39", file: "environment-topic39-miscellaneous-emerging-concepts-upsc-notes.html" },
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
