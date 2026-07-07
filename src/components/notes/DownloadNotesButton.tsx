"use client";

import { useCallback, useState } from "react";

type DownloadNotesButtonProps = {
  title: string;
  subjectName: string;
};

const PRINT_CSS = `
  html,body{margin:0 !important;padding:0 !important;background:#fff}
  body{padding:14px}
  a{color:#1a4f9c}
  @page{size:A4;margin:10mm}

  /* 1) Collapse the MAIN two-column layout to full-width single column.
     High specificity + loaded AFTER the notes' own !important rules -> wins. */
  html body .notes-topic-embedded .layout,
  html body .notes-topic-embedded .page-wrapper,
  html body .notes-topic-embedded .container,
  html body .notes-topic-embedded .wrap,
  html body .notes-topic-embedded .content-wrap,
  html body .notes-topic-embedded .main-wrap,
  html body .notes-topic-embedded .two-column,
  html body .notes-topic-embedded .two-col{
    display:block !important;
    grid-template-columns:none !important;
    max-width:none !important;
    width:auto !important;
    margin:0 !important;
    padding:0 !important;
    gap:0 !important;
    float:none !important;
  }

  /* 2) Reset the direct children (main / aside / sidebar) to full width. */
  html body .notes-topic-embedded .layout > *,
  html body .notes-topic-embedded .page-wrapper > *,
  html body .notes-topic-embedded main,
  html body .notes-topic-embedded aside,
  html body .notes-topic-embedded .sidebar,
  html body .notes-topic-embedded .right-sidebar,
  html body .notes-topic-embedded .aside-sticky{
    width:auto !important;
    max-width:none !important;
    min-width:0 !important;
    flex:none !important;
    float:none !important;
    position:static !important;
    top:auto !important;
    grid-column:auto !important;
  }

  html body .notes-topic-embedded header,
  html body .notes-topic-embedded .hero{max-width:none !important}

  /* 3) Also collapse inner multi-column card grids so nothing is cramped
     or clipped off the right edge of the page. */
  html body .notes-topic-embedded [class*="grid-"],
  html body .notes-topic-embedded .grid,
  html body .notes-topic-embedded .cols,
  html body .notes-topic-embedded .row{
    display:block !important;
    grid-template-columns:none !important;
    column-count:1 !important;
  }

  /* 4) Nothing should overflow / get cut horizontally. */
  html body .notes-topic-embedded *{overflow:visible !important}
  html body .notes-topic-embedded img{
    max-width:100% !important;
    height:auto !important;
    display:block;
    margin-left:auto;margin-right:auto;
  }
  /* SVG charts/diagrams often have only a viewBox (no width/height); force
     full container width so they always render at a proper size in the PDF. */
  html body .notes-topic-embedded svg{
    width:100% !important;
    max-width:100% !important;
    height:auto !important;
    display:block;
    margin-left:auto;margin-right:auto;
  }
  html body .notes-topic-embedded table{
    width:100% !important;
    table-layout:auto !important;
    word-break:break-word;
  }
  html body .notes-topic-embedded pre{white-space:pre-wrap !important;word-break:break-word}

  @media print{
    html,body{background:#fff !important;padding:0 !important}
    *{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}

    /* let text/sections flow across pages so there are NO big white gaps */
    .notes-topic-embedded,
    .notes,section,div,main,aside,ul,ol{
      break-inside:auto !important;
      page-break-inside:auto !important;
    }

    /* but keep diagrams, images, cards & table rows whole (never cut) */
    .svg-wrap,svg,img,figure,tr,.pyq-item,.callout,.aside-card,.card,li{
      break-inside:avoid !important;
      page-break-inside:avoid !important;
    }

    /* keep a heading with the content that follows it */
    h1,h2,h3,h4{break-after:avoid !important;page-break-after:avoid !important}
  }
`;

export function DownloadNotesButton({
  title,
  subjectName,
}: DownloadNotesButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleDownload = useCallback(() => {
    const body = document.querySelector(".notes-topic-body");
    if (!body || busy) return;

    setBusy(true);

    // The imported notes HTML already carries its own colourful <style>, so
    // rendering it inside a hidden iframe and printing produces a PDF that
    // looks identical to the web page (colours, diagrams, tables, callouts).
    const inner = body.innerHTML;
    const docTitle = `${title} — ${subjectName} | MentorsDaily UPSC Notes`;
    const docHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${docTitle}</title>
</head>
<body>
${inner}
<style>${PRINT_CSS}</style>
</body>
</html>`;

    // Render at real A4 pixel size but off-screen. A 0x0 iframe can cause
    // auto-height SVGs (charts with only a viewBox) to collapse to 0 before
    // printing, so give it real dimensions to lay out correctly.
    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "fixed";
    iframe.style.left = "-10000px";
    iframe.style.top = "0";
    iframe.style.width = "794px";
    iframe.style.height = "1123px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    document.body.appendChild(iframe);

    const idoc = iframe.contentWindow?.document;
    if (!idoc || !iframe.contentWindow) {
      iframe.remove();
      setBusy(false);
      return;
    }

    // Suggested PDF filename in Chrome/Edge is taken from the document title.
    const originalTitle = document.title;

    const cleanup = () => {
      document.title = originalTitle;
      window.setTimeout(() => iframe.remove(), 500);
      setBusy(false);
    };

    idoc.open();
    idoc.write(docHtml);
    idoc.close();

    const frameWin = iframe.contentWindow;
    frameWin.onafterprint = cleanup;

    // Give the browser a moment to lay out SVGs/fonts before printing.
    window.setTimeout(() => {
      try {
        document.title = docTitle;
        frameWin.focus();
        frameWin.print();
      } catch {
        cleanup();
      }
    }, 700);
  }, [title, subjectName, busy]);

  return (
    <div className="notes-download-bar">
      <button
        type="button"
        className="notes-download-btn"
        onClick={handleDownload}
        disabled={busy}
      >
        <span aria-hidden="true">⬇</span>
        {busy ? "Preparing…" : "Download PDF"}
      </button>
      <span className="notes-download-hint">
        Opens the print dialog — choose “Save as PDF” to keep the colourful
        layout.
      </span>
    </div>
  );
}
