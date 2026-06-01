import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath =
  process.argv[2] ?? "c:/Users/vikas/Downloads/index.html";
const html = fs.readFileSync(htmlPath, "utf8");
const m = html.match(/const SYLLABUS_DATA = (\{[\s\S]*?\n\});/);
if (!m) {
  console.error("SYLLABUS_DATA not found");
  process.exit(1);
}
const outDir = path.join(__dirname, "../src/lib/upsc-syllabus");
fs.mkdirSync(outDir, { recursive: true });
const content =
  "/** UPSC syllabus hub data — migrated from index.html */\n" +
  "export const SYLLABUS_DATA = " +
  m[1] +
  " as const;\n\n" +
  "export type SubjectKey = keyof typeof SYLLABUS_DATA;\n";
fs.writeFileSync(path.join(outDir, "data.ts"), content);
console.log("Wrote", content.length, "chars to data.ts");
