import fs from "fs";

const css = fs.readFileSync("src/styles/notes.css", "utf8");
const body = fs.readFileSync("src/content/ancient-history-body.html", "utf8");
const classRe = /class="([^"]+)"/g;
const classes = new Set();
let m;
while ((m = classRe.exec(body))) {
  m[1].split(/\s+/).forEach((c) => classes.add(c));
}
const defined = new Set();
const defRe = /\.([a-zA-Z0-9_-]+)/g;
while ((m = defRe.exec(css))) defined.add(m[1]);
const missing = [...classes]
  .filter((c) => !defined.has(c) && !c.startsWith("topic-"))
  .sort();
console.log("Missing:", missing.join(", "));
