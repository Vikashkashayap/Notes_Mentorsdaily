/**
 * Imports UPSC Post-Independence topic HTML files into `src/content/postindependence/`.
 *
 * Run:
 *   node scripts/import-postindependence-notes.mjs
 *
 * Optional env:
 *   POSTINDEPENDENCE_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads =
  process.env.POSTINDEPENDENCE_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "postindependence");

const CHAPTER_TITLES = {
  "postindependence-topic01": "Legacy of Colonial Rule & Partition of India",
  "postindependence-topic02": "Integration of the Princely States",
  "postindependence-topic03": "Integration of Tribals in Independent India",
  "postindependence-topic04":
    "Linguistic Reorganisation of States & Regionalism",
  "postindependence-topic05":
    "Nehruvian Era — Achievements, Foreign Policy & Wars",
  "postindependence-topic06":
    "From Shastri to Indira — Transition Years (1964–1969)",
  "postindependence-topic07":
    "End of One-Party Dominance & Multi-Party Politics",
  "postindependence-topic08":
    "Indira Gandhi's Emergence & Liberation of Bangladesh",
  "postindependence-topic09": "The JP Movement & the Emergency (1975–77)",
  "postindependence-topic10":
    "Congress Revival & the Punjab Crisis (1977–84)",
  "postindependence-topic11":
    "The Rajiv Gandhi Years & the Assam Crisis (1984–89)",
  "postindependence-topic12": "Politics after Rajiv Gandhi (1989–99)",
  "postindependence-topic13": "Land Reforms & Cooperatives in India",
  "postindependence-topic14": "The Green Revolution in India",
  "postindependence-topic15": "The Indian Economy since Independence",
  "postindependence-topic16": "Social Movements in Independent India",
  "postindependence-topic17": "India, 2000–2014",
  "postindependence-topic18": "The Present Era — India since 2014",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function postindependenceTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title
    ? `/post-independence/${titleToSlug(title)}`
    : "/post-independence";
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
  const endIdx =
    footerIdx !== -1 ? footerIdx : raw.indexOf("<script", layoutIdx);
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
    .replace(/href="\/upsc-notes\/post1947[^"]*"/g, 'href="/post-independence"')
    .replace(
      /href="\/upsc-notes\/post-independence[^"]*"/g,
      'href="/post-independence"',
    )
    .replace(/href="\/upsc-notes\/"/g, 'href="/"')
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/post-independence"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/post-independence"')
    .replace(/href="notes-hub\/index\.html"/g, 'href="/post-independence"');

  out = out.replace(
    /href="(post1947-topic\d{2})[^"]*\.html"/g,
    (_, srcId) => {
      const num = srcId.replace("post1947-topic", "");
      const topicId = `postindependence-topic${num}`;
      return `href="${postindependenceTopicHref(topicId)}"`;
    },
  );

  out = out.replace(
    /href="(postindependence-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${postindependenceTopicHref(topicId)}"`,
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
  {
    id: "postindependence-topic01",
    file: "post1947-topic01-colonial-legacy-partition-upsc-notes.html",
  },
  {
    id: "postindependence-topic02",
    file: "post1947-topic02-integration-princely-states-upsc-notes.html",
  },
  {
    id: "postindependence-topic03",
    file: "post1947-topic03-integration-of-tribals-upsc-notes.html",
  },
  {
    id: "postindependence-topic04",
    file: "post1947-topic04-linguistic-reorganisation-states-regionalism-upsc-notes.html",
  },
  {
    id: "postindependence-topic05",
    file: "post1947-topic05-achievements-foreign-policy-era-of-war-upsc-notes.html",
  },
  {
    id: "postindependence-topic06",
    file: "post1947-topic06-shastri-to-indira-upsc-notes.html",
  },
  {
    id: "postindependence-topic07",
    file: "post1947-topic07-end-one-party-dominance-multiparty-upsc-notes.html",
  },
  {
    id: "postindependence-topic08",
    file: "post1947-topic08-indira-emergence-bangladesh-upsc-notes.html",
  },
  {
    id: "postindependence-topic09",
    file: "post1947-topic09-jp-movement-emergency-upsc-notes.html",
  },
  {
    id: "postindependence-topic10",
    file: "post1947-topic10-congress-revival-punjab-crisis-upsc-notes.html",
  },
  {
    id: "postindependence-topic11",
    file: "post1947-topic11-rajiv-gandhi-assam-crisis-upsc-notes.html",
  },
  {
    id: "postindependence-topic12",
    file: "post1947-topic12-politics-after-rajiv-gandhi-upsc-notes.html",
  },
  {
    id: "postindependence-topic13",
    file: "post1947-topic13-land-reforms-cooperatives-upsc-notes.html",
  },
  {
    id: "postindependence-topic14",
    file: "post1947-topic14-green-revolution-upsc-notes.html",
  },
  {
    id: "postindependence-topic15",
    file: "post1947-topic15-indian-economy-since-independence-upsc-notes.html",
  },
  {
    id: "postindependence-topic16",
    file: "post1947-topic16-social-movements-independent-india-upsc-notes.html",
  },
  {
    id: "postindependence-topic17",
    file: "post1947-topic17-india-2000-to-2014-upsc-notes.html",
  },
  {
    id: "postindependence-topic18",
    file: "post1947-topic18-present-era-upsc-notes.html",
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
