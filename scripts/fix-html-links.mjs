import fs from "fs";

const path = "src/content/ancient-history-body.html";
let html = fs.readFileSync(path, "utf8");

html = html
  .replace(/href="index\.html"/g, 'href="/"')
  .replace(/href="\.\.\/[^"]+\.html"/g, 'href="/upsc-notes/ancient-history"')
  .replace(/id="jumpTop"/g, 'id="jumpTop" type="button"')
  .replace(
    /<div class="brand">Mentors<span>Daily<\/span><\/div>/,
    `<a href="/" class="brand brand-logo"><img src="/images/mentors-daily-logo.png" alt="Mentors Daily — UPSC Notes" width="200" height="56" /></a>`,
  )
  .replace(
    /<nav class="topnav">\s*<a href="\/" class="brand brand-logo">/,
    `<nav class="topnav">
  <div class="topnav-inner layout-shell">
    <a href="/" class="brand brand-logo">`,
  )
  .replace(
    /(<div class="nav-progress" id="navProgress">[^<]*<\/div>)\s*<\/nav>/,
    "$1\n  </div>\n</nav>",
  )
  .replace(
    /<div class="page-wrapper">/,
    '<div class="page-wrapper layout-shell">',
  );

fs.writeFileSync(path, html);
console.log("Updated links and layout alignment in ancient-history-body.html");
