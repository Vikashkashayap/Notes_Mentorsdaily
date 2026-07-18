/**
 * Imports UPSC International Relations topic HTML files into `src/content/ir/`.
 *
 * Run:
 *   node scripts/import-ir-notes.mjs
 *
 * Optional env:
 *   IR_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.IR_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "ir");

const CHAPTER_TITLES = {
  "ir-topic01": "India's Foreign Policy — Evolution",
  "ir-topic02": "Determinants & Institutions of India's Foreign Policy",
  "ir-topic03": "Core Principles & Doctrines of India's Foreign Policy",
  "ir-topic04": "India–Pakistan Relations",
  "ir-topic05": "India–China Relations",
  "ir-topic06": "IR Theory & Core Concepts",
  "ir-topic07": "Phases of India's Foreign Policy",
  "ir-topic08": "Neighbourhood First — The Framework",
  "ir-topic09": "India–Nepal Relations",
  "ir-topic10": "India–Bhutan Relations",
  "ir-topic11": "India–Bangladesh Relations",
  "ir-topic12": "India–Sri Lanka Relations",
  "ir-topic13": "India–Maldives Relations",
  "ir-topic14": "India–Myanmar Relations",
  "ir-topic15": "India–Afghanistan Relations",
  "ir-topic16": "India–Africa Relations",
  "ir-topic17": "India–Central Asia Relations",
  "ir-topic18": "India–Southeast Asia Relations & the Act East Policy",
  "ir-topic19": "India–East Asia Relations: Japan & South Korea",
  "ir-topic20": "India & the Pacific — Australia, NZ, Fiji & Indo-Pacific",
  "ir-topic21": "India & the Gulf: West Asia I",
  "ir-topic22": "India & West Asia II: Iran, Israel, Turkey & Egypt",
  "ir-topic23": "India & Latin America and the Caribbean (LAC)",
  "ir-topic24": "India–USA Relations",
  "ir-topic25": "India–Russia Relations",
  "ir-topic26": "India–Canada Relations",
  "ir-topic27": "India–EU Relations",
  "ir-topic28": "India & Europe's Major Powers — UK, Germany & France",
  "ir-topic29": "The Indian Diaspora",
  "ir-topic30": "India & the United Nations",
  "ir-topic31": "India & the Bretton Woods Institutions",
  "ir-topic32": "India & Global Groupings I — G7, G20, G77 & Commonwealth",
  "ir-topic33": "India & Global Groupings II — Quad, BRICS, SCO & Export Controls",
  "ir-topic34": "India & SAARC, BIMSTEC, IORA & BBIN",
  "ir-topic35": "Global Flashpoints & the Changing Trade Order",
  "ir-topic36": "The Changing Sphere of Diplomacy",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function irTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title
    ? `/international-relations/${titleToSlug(title)}`
    : "/international-relations";
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
  const endIdx =
    footerIdx !== -1 ? footerIdx : raw.indexOf("<script", layoutIdx);
  if (endIdx === -1) return null;
  const layoutBlock = raw.slice(layoutIdx, endIdx).trim();

  const headerIdx = raw.lastIndexOf("<header>", layoutIdx);
  if (headerIdx !== -1) {
    return `${raw.slice(headerIdx, layoutIdx).trim()}\n${layoutBlock}`;
  }

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
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/international-relations"')
    .replace(
      /href="\/upsc-notes\/ir[^"]*"/g,
      'href="/international-relations"',
    )
    .replace(
      /href="\/upsc-notes\/international-relations[^"]*"/g,
      'href="/international-relations"',
    )
    .replace(/href="\/upsc-notes\/"/g, 'href="/upsc-notes"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/international-relations"')
    .replace(
      /href="notes-hub\/index\.html"/g,
      'href="/international-relations"',
    );

  out = out.replace(/href="\/international-relations\/ir-topic\d{2}"/g, (match) => {
    const id = match.match(/ir-topic\d{2}/)?.[0];
    return id ? `href="${irTopicHref(id)}"` : match;
  });

  out = out.replace(
    /href="(ir-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${irTopicHref(topicId)}"`,
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

.notes-topic-embedded .hero,
.notes-topic-embedded section.hero {
  max-width: 1280px;
  margin: 0 auto;
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
  {
    id: "ir-topic01",
    file: "ir-topic01-indias-foreign-policy-evolution-upsc-notes.html",
  },
  {
    id: "ir-topic02",
    file: "ir-topic02-determinants-institutions-indian-foreign-policy-upsc-notes.html",
  },
  {
    id: "ir-topic03",
    file: "ir-topic03-principles-doctrines-indian-foreign-policy-upsc-notes.html",
  },
  {
    id: "ir-topic04",
    file: "ir-topic04-india-pakistan-relations-upsc-notes.html",
  },
  {
    id: "ir-topic05",
    file: "ir-topic05-india-china-relations-upsc-notes.html",
  },
  {
    id: "ir-topic06",
    file: "ir-topic06-ir-theory-core-concepts-upsc-notes.html",
  },
  {
    id: "ir-topic07",
    file: "ir-topic07-phases-indian-foreign-policy-upsc-notes.html",
  },
  {
    id: "ir-topic08",
    file: "ir-topic08-neighbourhood-first-framework-upsc-notes.html",
  },
  {
    id: "ir-topic09",
    file: "ir-topic09-india-nepal-relations-upsc-notes.html",
  },
  {
    id: "ir-topic10",
    file: "ir-topic10-india-bhutan-relations-upsc-notes.html",
  },
  {
    id: "ir-topic11",
    file: "ir-topic11-india-bangladesh-relations-upsc-notes.html",
  },
  {
    id: "ir-topic12",
    file: "ir-topic12-india-sri-lanka-relations-upsc-notes.html",
  },
  {
    id: "ir-topic13",
    file: "ir-topic13-india-maldives-relations-upsc-notes.html",
  },
  {
    id: "ir-topic14",
    file: "ir-topic14-india-myanmar-relations-upsc-notes.html",
  },
  {
    id: "ir-topic15",
    file: "ir-topic15-india-afghanistan-relations-upsc-notes.html",
  },
  {
    id: "ir-topic16",
    file: "ir-topic16-india-africa-relations-upsc-notes.html",
  },
  {
    id: "ir-topic17",
    file: "ir-topic17-india-central-asia-relations-upsc-notes.html",
  },
  {
    id: "ir-topic18",
    file: "ir-topic18-india-southeast-asia-act-east-upsc-notes.html",
  },
  {
    id: "ir-topic19",
    file: "ir-topic19-india-east-asia-japan-south-korea-upsc-notes.html",
  },
  {
    id: "ir-topic20",
    file: "ir-topic20-india-pacific-indo-pacific-upsc-notes.html",
  },
  {
    id: "ir-topic21",
    file: "ir-topic21-india-gulf-west-asia-relations-upsc-notes.html",
  },
  {
    id: "ir-topic22",
    file: "ir-topic22-india-west-asia-iran-israel-turkey-egypt-upsc-notes.html",
  },
  {
    id: "ir-topic23",
    file: "ir-topic23-india-latin-america-caribbean-upsc-notes.html",
  },
  {
    id: "ir-topic24",
    file: "ir-topic24-india-usa-relations-upsc-notes.html",
  },
  {
    id: "ir-topic25",
    file: "ir-topic25-india-russia-relations-upsc-notes.html",
  },
  {
    id: "ir-topic26",
    file: "ir-topic26-india-canada-relations-upsc-notes.html",
  },
  {
    id: "ir-topic27",
    file: "ir-topic27-india-eu-relations-upsc-notes.html",
  },
  {
    id: "ir-topic28",
    file: "ir-topic28-india-uk-germany-france-europe-upsc-notes.html",
  },
  {
    id: "ir-topic29",
    file: "ir-topic29-india-diaspora-upsc-notes.html",
  },
  {
    id: "ir-topic30",
    file: "ir-topic30-india-united-nations-un-reform-upsc-notes.html",
  },
  {
    id: "ir-topic31",
    file: "ir-topic31-india-bretton-woods-imf-world-bank-upsc-notes.html",
  },
  {
    id: "ir-topic32",
    file: "ir-topic32-india-global-groupings-g20-g77-upsc-notes.html",
  },
  {
    id: "ir-topic33",
    file: "ir-topic33-india-quad-brics-sco-minilaterals-upsc-notes.html",
  },
  {
    id: "ir-topic34",
    file: "ir-topic34-india-saarc-bimstec-iora-upsc-notes.html",
  },
  {
    id: "ir-topic35",
    file: "ir-topic35-global-flashpoints-trade-order-upsc-notes.html",
  },
  {
    id: "ir-topic36",
    file: "ir-topic36-india-changing-sphere-of-diplomacy-upsc-notes.html",
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
