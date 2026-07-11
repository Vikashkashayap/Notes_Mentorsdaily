/**
 * Extract Environment chapter metadata from downloaded HTML pages.
 *
 * Run:
 *   node scripts/extract-environment-chapter-metadata.mjs
 */
import fs from "fs";
import path from "path";

const downloads = process.env.ENVIRONMENT_HTML_DIR ?? "C:\\Users\\vikas\\Downloads";

const FILES = [
  ["environment-topic01", "environment-topic01-ecology-fundamentals-upsc-notes.html"],
  ["environment-topic02", "environment-topic02-species-interactions-functional-classes-upsc-notes.html"],
  ["environment-topic03", "environment-topic03-carrying-capacity-population-growth-upsc-notes.html"],
  ["environment-topic04", "environment-topic04-ecosystem-structure-function-upsc-notes.html"],
  ["environment-topic05", "environment-topic05-terrestrial-ecosystems-biomes-upsc-notes.html"],
  ["environment-topic06", "environment-topic06-aquatic-wetland-ecosystems-upsc-notes.html"],
  ["environment-topic07", "environment-topic07-biosphere-biosphere-reserves-upsc-notes.html"],
  ["environment-topic08", "environment-topic08-ecological-succession-homeostasis-upsc-notes.html"],
  ["environment-topic09", "environment-topic09-organism-environment-interactions-upsc-notes.html"],
  ["environment-topic10", "environment-topic10-biogeochemical-cycles-upsc-notes.html"],
  ["environment-topic11", "environment-topic11-biodiversity-basics-measurement-upsc-notes.html"],
  ["environment-topic12", "environment-topic12-biodiversity-loss-threats-upsc-notes.html"],
  ["environment-topic13", "environment-topic13-in-situ-conservation-upsc-notes.html"],
  ["environment-topic14", "environment-topic14-ex-situ-conservation-forest-governance-upsc-notes.html"],
  ["environment-topic15", "environment-topic15-important-species-lists-upsc-notes.html"],
  ["environment-topic16", "environment-topic16-biodiversity-of-india-upsc-notes.html"],
  ["environment-topic17", "environment-topic17-global-warming-ozone-depletion-upsc-notes.html"],
  ["environment-topic18", "environment-topic18-climate-change-effects-land-soil-upsc-notes.html"],
  ["environment-topic19", "environment-topic19-climate-change-effects-water-ocean-upsc-notes.html"],
  ["environment-topic20", "environment-topic20-climate-mitigation-indias-response-upsc-notes.html"],
  ["environment-topic21", "environment-topic21-water-pollution-upsc-notes.html"],
  ["environment-topic22", "environment-topic22-air-pollution-upsc-notes.html"],
  ["environment-topic23", "environment-topic23-soil-noise-thermal-radioactive-pollution-upsc-notes.html"],
  ["environment-topic24", "environment-topic24-waste-management-upsc-notes.html"],
  ["environment-topic25", "environment-topic25-environmental-toxicology-pollution-diseases-upsc-notes.html"],
  ["environment-topic26", "environment-topic26-renewable-energy-upsc-notes.html"],
  ["environment-topic27", "environment-topic27-environment-exploitative-practices-issues-upsc-notes.html"],
  ["environment-topic28", "environment-topic28-eia-coal-power-impacts-upsc-notes.html"],
  ["environment-topic29", "environment-topic29-indian-environmental-acts-rules-upsc-notes.html"],
  ["environment-topic30", "environment-topic30-indian-environmental-schemes-missions-upsc-notes.html"],
  ["environment-topic31", "environment-topic31-treaties-conventions-i-upsc-notes.html"],
  ["environment-topic32", "environment-topic32-treaties-conventions-ii-upsc-notes.html"],
  ["environment-topic33", "environment-topic33-conference-of-parties-cop-upsc-notes.html"],
  ["environment-topic34", "environment-topic34-international-environmental-organizations-funds-upsc-notes.html"],
  ["environment-topic35", "environment-topic35-indian-institutional-ministerial-bodies-upsc-notes.html"],
  ["environment-topic36", "environment-topic36-environmental-funds-indian-ngos-upsc-notes.html"],
  ["environment-topic37", "environment-topic37-environmental-movements-campaigns-upsc-notes.html"],
  ["environment-topic38", "environment-topic38-static-lists-terminology-upsc-notes.html"],
  ["environment-topic39", "environment-topic39-miscellaneous-emerging-concepts-upsc-notes.html"],
];

function unescapeHtml(s) {
  if (!s) return "";
  return s
    .replaceAll("&amp;", "&")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&mdash;", "—")
    .replaceAll("&ndash;", "–")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function clean(s) {
  return unescapeHtml(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function extractTitle(raw) {
  const h1 = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return h1 ? clean(h1[1]) : null;
}

function extractSub(raw, topicNo, title) {
  const breadcrumb = raw.match(
    /<strong>\s*Topic\s*(\d+)\s*:\s*([\s\S]*?)<\/strong>/i,
  );
  if (breadcrumb) {
    return `Topic ${breadcrumb[1]}: ${clean(breadcrumb[2])}`;
  }
  const heroSub = raw.match(/class="sub"[^>]*>([\s\S]*?)<\//i);
  if (heroSub) {
    const sub = clean(heroSub[1]);
    if (sub) return `Topic ${topicNo}: ${sub.slice(0, 120)}`;
  }
  return `Topic ${topicNo}: ${title}`;
}

function extractReadTime(raw) {
  const m = raw.match(/~\s*(\d+)\s*min read/i);
  return m ? Number(m[1]) : 25;
}

function extractTags(raw) {
  const tags = [];
  const re = /<span class="tag[^"]*">\s*([^<]+?)\s*<\/span>/gi;
  let m;
  while ((m = re.exec(raw))) {
    const tag = clean(m[1]);
    if (tag) tags.push(tag);
  }
  const seen = new Set();
  return tags
    .filter((t) => (seen.has(t.toLowerCase()) ? false : (seen.add(t.toLowerCase()), true)))
    .slice(0, 5);
}

const chapters = [];

for (const [id, file] of FILES) {
  const srcPath = path.join(downloads, file);
  if (!fs.existsSync(srcPath)) {
    console.error(`Missing: ${srcPath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(srcPath, "utf8");
  const title = extractTitle(raw);
  if (!title) {
    console.error(`No h1 in ${file}`);
    process.exit(1);
  }
  const topicNo = id.replace("environment-topic", "");
  const sub = extractSub(raw, topicNo, title);
  const readTime = extractReadTime(raw);
  const tags = extractTags(raw);
  chapters.push({
    id,
    title,
    sub,
    priority: "high",
    prelims: 8,
    mains: 6,
    status: "live",
    readTime,
    tags: tags.length ? tags : [title.split(/[&,—]/)[0].trim()],
  });
}

for (const ch of chapters) {
  const tags = JSON.stringify(ch.tags);
  console.log(
    `      { id:"${ch.id}", title:"${ch.title}", sub:"${ch.sub}", priority:"${ch.priority}", prelims:${ch.prelims}, mains:${ch.mains}, status:"live", readTime:${ch.readTime}, tags:${tags} },`,
  );
}

console.log("\n// CHAPTER_TITLES for import script:");
console.log("{");
for (const ch of chapters) {
  console.log(`  "${ch.id}": "${ch.title}",`);
}
console.log("}");
