import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dataPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "lib",
  "upsc-syllabus",
  "data.ts",
);
let s = fs.readFileSync(dataPath, "utf8");
s = s.replace(/, file:"\.\.\/ancient-topic[^"]+"/g, "");
fs.writeFileSync(dataPath, s);
console.log("Cleaned ancient file fields.");
