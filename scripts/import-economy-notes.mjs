/**
 * Imports UPSC Indian Economy topic HTML files into `src/content/economy/`.
 *
 * Run:
 *   node scripts/import-economy-notes.mjs
 *
 * Optional env:
 *   ECONOMY_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.ECONOMY_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "economy");

const CHAPTER_TITLES = {
  "economy-topic01": "Fundamentals of Economy",
  "economy-topic02": "National Income Accounting",
  "economy-topic03": "Growth, Development & Happiness",
  "economy-topic04": "Economic Planning in India",
  "economy-topic05": "Money & Money Supply",
  "economy-topic06": "Banking System in India",
  "economy-topic07": "Inflation",
  "economy-topic08": "Fiscal Policy & the Union Budget",
  "economy-topic09": "External Sector & Balance of Payments",
  "economy-topic10": "International Financial Institutions",
  "economy-topic11": "Industrial Sector & Manufacturing",
  "economy-topic12": "Agriculture & Allied Sectors",
  "economy-topic13": "Poverty, Employment & Human Development",
  "economy-topic14": "Infrastructure & Investment Models",
  "economy-topic15": "Sustainable Development & Environment Economics",
  "economy-topic16": "Banking, Financial Sector & Capital Markets",
  "economy-topic17": "Foreign Trade Policy & WTO",
  "economy-topic18": "Services Sector",
  "economy-topic19": "Digital Public Infrastructure (DPI)",
  "economy-topic20": "Crypto, CBDC & Virtual Digital Assets",
  "economy-topic21": "GIFT City & IFSC",
  "economy-topic22": "Economic Reforms Since 1991",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function economyTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/economy/${titleToSlug(title)}` : "/economy";
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
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/economy"')
    .replace(/href="\/upsc-notes\/economy[^"]*"/g, 'href="/economy"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/upsc-notes"');

  out = out.replace(/href="\/economy\/economy-topic\d{2}"/g, (match) => {
    const id = match.match(/economy-topic\d{2}/)?.[0];
    return id ? `href="${economyTopicHref(id)}"` : match;
  });

  out = out.replace(
    /href="(economy-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${economyTopicHref(topicId)}"`,
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
  { id: "economy-topic01", file: "economy-topic01-fundamentals-of-economy-upsc-notes.html" },
  { id: "economy-topic02", file: "economy-topic02-national-income-accounting-upsc-notes.html" },
  { id: "economy-topic03", file: "economy-topic03-growth-development-happiness-upsc-notes.html" },
  { id: "economy-topic04", file: "economy-topic04-economic-planning-india-upsc-notes.html" },
  { id: "economy-topic05", file: "economy-topic05-money-and-money-supply-upsc-notes.html" },
  { id: "economy-topic06", file: "economy-topic06-banking-system-india-upsc-notes.html" },
  { id: "economy-topic07", file: "economy-topic07-inflation-upsc-notes.html" },
  { id: "economy-topic08", file: "economy-topic08-fiscal-policy-budget-upsc-notes.html" },
  { id: "economy-topic09", file: "economy-topic09-external-sector-bop-upsc-notes.html" },
  { id: "economy-topic10", file: "economy-topic10-international-financial-institutions-upsc-notes.html" },
  { id: "economy-topic11", file: "economy-topic11-industrial-sector-manufacturing-upsc-notes.html" },
  { id: "economy-topic12", file: "economy-topic12-agriculture-allied-sectors-upsc-notes.html" },
  { id: "economy-topic13", file: "economy-topic13-poverty-employment-human-development-upsc-notes.html" },
  { id: "economy-topic14", file: "economy-topic14-infrastructure-investment-models-upsc-notes.html" },
  { id: "economy-topic15", file: "economy-topic15-sustainable-development-environment-economics-upsc-notes.html" },
  { id: "economy-topic16", file: "economy-topic16-banking-financial-sector-capital-markets-upsc-notes.html" },
  { id: "economy-topic17", file: "economy-topic17-foreign-trade-policy-wto-upsc-notes.html" },
  { id: "economy-topic18", file: "economy-topic18-services-sector-upsc-notes.html" },
  { id: "economy-topic19", file: "economy-topic19-digital-public-infrastructure-dpi-upsc-notes.html" },
  { id: "economy-topic20", file: "economy-topic20-crypto-cbdc-vda-upsc-notes.html" },
  { id: "economy-topic21", file: "economy-topic21-gift-city-ifsc-upsc-notes.html" },
  { id: "economy-topic22", file: "economy-topic22-economic-reforms-since-1991-upsc-notes.html" },
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
