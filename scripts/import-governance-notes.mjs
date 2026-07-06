/**
 * Imports UPSC Governance topic HTML files into `src/content/governance/`.
 *
 * Run:
 *   node scripts/import-governance-notes.mjs
 *
 * Optional env:
 *   GOVERNANCE_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads =
  process.env.GOVERNANCE_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "governance");

const CHAPTER_TITLES = {
  "governance-topic01": "Governance Concepts & Good Governance",
  "governance-topic02": "E-Governance & Digital India",
  "governance-topic03": "Citizen's Charter, RTI & Social Audit",
  "governance-topic04": "Civil Services: Structure & Reforms",
  "governance-topic05": "Development Issues: Rural & Urban",
  "governance-topic06": "Poverty & Hunger",
  "governance-topic07": "Labour & Employment",
  "governance-topic08": "Population, Demography & Census",
  "governance-topic09": "Health Policy & Governance",
  "governance-topic10": "Education Policy",
  "governance-topic11": "Women & Gender",
  "governance-topic12": "Children, Youth, Elderly, Disabled & Transgender",
  "governance-topic13": "SC, ST, Tribals & Minorities",
  "governance-topic14": "Consumer Protection",
  "governance-topic15": "Social Issues: Displacement & Domestic Workers",
  "governance-topic16": "Global Governance",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function governanceTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/governance/${titleToSlug(title)}` : "/governance";
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
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/governance"')
    .replace(/href="\/upsc-notes\/governance[^"]*"/g, 'href="/governance"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/upsc-notes"');

  out = out.replace(/href="\/governance\/governance-topic\d{2}"/g, (match) => {
    const id = match.match(/governance-topic\d{2}/)?.[0];
    return id ? `href="${governanceTopicHref(id)}"` : match;
  });

  out = out.replace(
    /href="(governance-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${governanceTopicHref(topicId)}"`,
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
  {
    id: "governance-topic01",
    file: "governance-topic01-governance-concepts-good-governance-upsc-notes.html",
  },
  {
    id: "governance-topic02",
    file: "governance-topic02-e-governance-digital-india-upsc-notes.html",
  },
  {
    id: "governance-topic03",
    file: "governance-topic03-citizens-charter-rti-social-audit-upsc-notes.html",
  },
  {
    id: "governance-topic04",
    file: "governance-topic04-civil-services-structure-reforms-upsc-notes.html",
  },
  {
    id: "governance-topic05",
    file: "governance-topic05-development-rural-urban-upsc-notes.html",
  },
  {
    id: "governance-topic06",
    file: "governance-topic06-poverty-hunger-upsc-notes.html",
  },
  {
    id: "governance-topic07",
    file: "governance-topic07-labour-employment-upsc-notes.html",
  },
  {
    id: "governance-topic08",
    file: "governance-topic08-population-demography-census-upsc-notes.html",
  },
  {
    id: "governance-topic09",
    file: "governance-topic09-health-policy-governance-upsc-notes.html",
  },
  {
    id: "governance-topic10",
    file: "governance-topic10-education-policy-upsc-notes.html",
  },
  {
    id: "governance-topic11",
    file: "governance-topic11-women-gender-upsc-notes.html",
  },
  {
    id: "governance-topic12",
    file: "governance-topic12-children-youth-elderly-disabled-transgender-upsc-notes.html",
  },
  {
    id: "governance-topic13",
    file: "governance-topic13-sc-st-tribals-minorities-upsc-notes.html",
  },
  {
    id: "governance-topic14",
    file: "governance-topic14-consumer-protection-upsc-notes.html",
  },
  {
    id: "governance-topic15",
    file: "governance-topic15-social-issues-displacement-domestic-workers-upsc-notes.html",
  },
  {
    id: "governance-topic16",
    file: "governance-topic16-global-governance-upsc-notes.html",
  },
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
