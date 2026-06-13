/**
 * Imports UPSC Internal Security topic HTML files into `src/content/security/`.
 *
 * Run:
 *   node scripts/import-security-notes.mjs
 *
 * Optional env:
 *   SECURITY_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.SECURITY_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "security");

const CHAPTER_TITLES = {
  "security-topic01": "External Factors in Internal Security",
  "security-topic02": "Border Management in India",
  "security-topic03": "Coastal & Maritime Security in India",
  "security-topic04": "Terrorism & Terror Financing",
  "security-topic05": "Left-Wing Extremism (Naxalism)",
  "security-topic06": "Insurgency in North East India",
  "security-topic07": "Insurgency in Jammu & Kashmir",
  "security-topic08": "Radicalism, Communalism & Other Threats",
  "security-topic09": "Cyber Security",
  "security-topic10": "Media & Social Networking in Internal Security",
  "security-topic11": "Money Laundering & Organised Crime",
  "security-topic12": "Security Forces, Agencies & National Security Architecture",
  "security-topic13": "Police Reforms in India",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function securityTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/internal-security/${titleToSlug(title)}` : "/internal-security";
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
    .replace(/href="\/upsc-notes\/security[^"]*"/g, 'href="/internal-security"')
    .replace(/href="\/upsc-notes\/internal-security[^"]*"/g, 'href="/internal-security"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/"')
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/internal-security"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/internal-security"')
    .replace(/href="notes-hub\/index\.html"/g, 'href="/internal-security"');

  out = out.replace(
    /href="(security-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${securityTopicHref(topicId)}"`,
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
  { id: "security-topic01", file: "security-topic01-external-factors-internal-security-upsc-notes.html" },
  { id: "security-topic02", file: "security-topic02-border-management-india-upsc-notes.html" },
  { id: "security-topic03", file: "security-topic03-coastal-maritime-security-upsc-notes.html" },
  { id: "security-topic04", file: "security-topic04-terrorism-terror-financing-upsc-notes.html" },
  { id: "security-topic05", file: "security-topic05-left-wing-extremism-naxalism-upsc-notes.html" },
  { id: "security-topic06", file: "security-topic06-insurgency-north-east-upsc-notes.html" },
  { id: "security-topic07", file: "security-topic07-insurgency-jammu-kashmir-upsc-notes.html" },
  { id: "security-topic08", file: "security-topic08-radicalism-communalism-threats-upsc-notes.html" },
  { id: "security-topic09", file: "security-topic09-cyber-security-upsc-notes.html" },
  { id: "security-topic10", file: "security-topic10-media-social-networking-security-upsc-notes.html" },
  { id: "security-topic11", file: "security-topic11-money-laundering-organised-crime-upsc-notes.html" },
  { id: "security-topic12", file: "security-topic12-security-forces-agencies-architecture-upsc-notes.html" },
  { id: "security-topic13", file: "security-topic13-police-reforms-upsc-notes.html" },
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
