import fs from "fs";
import path from "path";

function loadNotesHtml(): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "ancient-history-body.html",
  );
  return fs.readFileSync(filePath, "utf8");
}

export function NotesBody() {
  const html = loadNotesHtml();

  return (
    <div
      className="notes-root"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
