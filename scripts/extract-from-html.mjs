import fs from "fs";
import path from "path";

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error("Usage: node scripts/extract-from-html.mjs <path-to-html>");
  process.exit(1);
}

const html = fs.readFileSync(sourcePath, "utf8");
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const bodyMatch = html.match(/<body>([\s\S]*?)<script>/);

if (!styleMatch || !bodyMatch) {
  console.error("Could not parse <style> or <body> from HTML");
  process.exit(1);
}

const root = path.resolve(".");
fs.mkdirSync(path.join(root, "src/content"), { recursive: true });
fs.mkdirSync(path.join(root, "src/styles"), { recursive: true });

fs.writeFileSync(
  path.join(root, "src/styles/notes.css"),
  styleMatch[1].trim(),
);
fs.writeFileSync(
  path.join(root, "src/content/ancient-history-body.html"),
  bodyMatch[1].trim(),
);

console.log("Extracted notes.css and ancient-history-body.html");
