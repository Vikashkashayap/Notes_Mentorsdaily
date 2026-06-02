/**
 * Imports UPSC Ethics GS4 topic HTML files into `src/content/ethics/`.
 *
 * Run:
 *   node scripts/import-ethics-notes.mjs
 *
 * Optional env:
 *   ETHICS_HTML_DIR="C:\Users\vikas\Downloads"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloads = process.env.ETHICS_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";
const outDir = path.join(root, "src", "content", "ethics");

const CHAPTER_TITLES = {
  "ethics-topic01": "Ethics & Human Interface",
  "ethics-topic02": "Attitude & Social Influence",
  "ethics-topic03": "Aptitude & Foundational Values for Civil Services",
  "ethics-topic04": "Emotional Intelligence",
  "ethics-topic05": "Indian Moral Thinkers & Philosophers",
  "ethics-topic06": "Western Moral Philosophers",
  "ethics-topic07": "Public Administration Ethics & Corporate Governance",
  "ethics-topic08": "Probity in Governance",
  "ethics-topic09": "Case Study Frameworks & Answer Writing",
};

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ethicsTopicHref(topicId) {
  const title = CHAPTER_TITLES[topicId];
  return title ? `/ethics/${titleToSlug(title)}` : "/ethics";
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

function extractHeroAndLayout(raw) {
  const layoutIdx = raw.indexOf('<div class="layout">');
  if (layoutIdx === -1) return null;
  const footerIdx = raw.indexOf("<footer", layoutIdx);
  if (footerIdx === -1) return null;
  const layoutBlock = raw.slice(layoutIdx, footerIdx).trim();

  const heroIdx = raw.lastIndexOf('<div class="hero">', layoutIdx);
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
    .replace(/<nav class="navbar">[\s\S]*?<\/nav>/gi, "")
    .replace(/<nav class="topnav">[\s\S]*?<\/nav>/gi, "")
    .replace(/<div class="breadcrumbs">[\s\S]*?<\/div>/gi, "")
    .replace(/<footer>[\s\S]*?<\/footer>/gi, "");
}

function rewriteLinks(html) {
  let out = html
    .replace(/href="\/upsc-notes\/ethics[^"]*"/g, 'href="/ethics"')
    .replace(/href="\/upsc-notes\/"/g, 'href="/"')
    .replace(/href="index\.html(?:#[^"]*)?"/g, 'href="/ethics"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/ethics"');

  out = out.replace(
    /href="(ethics-topic\d{2})[^"]*\.html"/g,
    (_, topicId) => `href="${ethicsTopicHref(topicId)}"`,
  );

  return out;
}

const LAYOUT_CSS = `
/* Next.js: shared app navbar; hide embedded chrome */
.notes-topic-embedded nav.topnav,
.notes-topic-embedded nav.navbar,
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

.notes-topic-embedded .hero {
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
    id: "ethics-topic01",
    file: "ethics-topic01-ethics-human-interface-upsc-notes.html",
  },
  {
    id: "ethics-topic02",
    file: "ethics-topic02-attitude-social-influence-upsc-notes.html",
  },
  {
    id: "ethics-topic03",
    file: "ethics-topic03-aptitude-civil-service-values-upsc-notes.html",
  },
  {
    id: "ethics-topic04",
    file: "ethics-topic04-emotional-intelligence-upsc-notes.html",
  },
  {
    id: "ethics-topic05",
    file: "ethics-topic05-indian-moral-thinkers-upsc-notes.html",
  },
  {
    id: "ethics-topic06",
    file: "ethics-topic06-western-moral-philosophers-upsc-notes.html",
  },
  {
    id: "ethics-topic07",
    file: "ethics-topic07-public-administration-corporate-governance-upsc-notes.html",
  },
  {
    id: "ethics-topic08",
    file: "ethics-topic08-probity-governance-upsc-notes.html",
  },
  {
    id: "ethics-topic09",
    file: "ethics-topic09-case-study-frameworks-upsc-notes.html",
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
