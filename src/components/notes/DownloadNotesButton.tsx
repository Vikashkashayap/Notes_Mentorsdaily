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

  /* Keep colours / backgrounds identical to the on-screen notes. */
  html,body,*,*::before,*::after{
    -webkit-print-color-adjust:exact !important;
    print-color-adjust:exact !important;
    color-adjust:exact !important;
  }

  /* 1) Collapse the MAIN two-column layout to full-width single column. */
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
    max-height:none !important;
    overflow:visible !important;
  }

  html body .notes-topic-embedded header,
  html body .notes-topic-embedded .hero{max-width:none !important}

  /* 3) Collapse only multi-column card grids — NOT diagrams. */
  html body .notes-topic-embedded .grid-2,
  html body .notes-topic-embedded .grid-3,
  html body .notes-topic-embedded .grid-4,
  html body .notes-topic-embedded .compare-grid,
  html body .notes-topic-embedded .cols,
  html body .notes-topic-embedded .toc ol{
    display:block !important;
    grid-template-columns:none !important;
    column-count:1 !important;
  }

  /* 4) Images + SVG diagrams must stay visible and sized. */
  html body .notes-topic-embedded img{
    max-width:100% !important;
    height:auto !important;
    display:block !important;
    margin-left:auto;margin-right:auto;
    visibility:visible !important;
    opacity:1 !important;
  }
  html body .notes-topic-embedded .svg-wrap,
  html body .notes-topic-embedded .figure,
  html body .notes-topic-embedded figure{
    display:block !important;
    visibility:visible !important;
    opacity:1 !important;
    width:100% !important;
    max-width:100% !important;
    overflow:visible !important;
    page-break-inside:avoid;
    break-inside:avoid;
  }
  html body .notes-topic-embedded .svg-wrap svg,
  html body .notes-topic-embedded .figure svg,
  html body .notes-topic-embedded figure svg{
    width:100% !important;
    max-width:100% !important;
    height:auto !important;
    display:block !important;
    visibility:visible !important;
    margin-left:auto;margin-right:auto;
  }
  html body .notes-topic-embedded table,
  html body .notes-topic-embedded .tbl{
    width:100% !important;
    table-layout:auto !important;
    word-break:break-word;
  }
  html body .notes-topic-embedded pre{white-space:pre-wrap !important;word-break:break-word}

  /* Hero banners are dark gradients with white copy — never inherit body ink. */
  html body .notes-topic-embedded .hero,
  html body .notes-topic-embedded section.hero{
    color:#fff !important;
  }
  html body .notes-topic-embedded .hero h1,
  html body .notes-topic-embedded .hero h2,
  html body .notes-topic-embedded .hero p,
  html body .notes-topic-embedded .hero .lede,
  html body .notes-topic-embedded .hero .sub,
  html body .notes-topic-embedded .hero .meta,
  html body .notes-topic-embedded .hero .tag,
  html body .notes-topic-embedded .hero .pill,
  html body .notes-topic-embedded .hero span,
  html body .notes-topic-embedded .hero a{
    color:#fff !important;
  }

  @media print{
    html,body{background:#fff !important;padding:0 !important}

    html body .notes-topic-embedded .svg-wrap,
    html body .notes-topic-embedded .svg-wrap svg,
    html body .notes-topic-embedded .figure,
    html body .notes-topic-embedded figure,
    html body .notes-topic-embedded img,
    html body .notes-topic-embedded svg{
      display:block !important;
      visibility:visible !important;
      opacity:1 !important;
    }
    html body .notes-topic-embedded aside,
    html body .notes-topic-embedded .sidebar,
    html body .notes-topic-embedded .right-sidebar,
    html body .notes-topic-embedded .aside-sticky{
      display:block !important;
      visibility:visible !important;
    }

    /* Hide embedded chrome only */
    html body .notes-topic-embedded .topnav,
    html body .notes-topic-embedded nav.topnav,
    html body .notes-topic-embedded header.topnav,
    html body .notes-topic-embedded nav.navbar,
    html body .notes-topic-embedded .breadcrumbs,
    html body .notes-topic-embedded footer{
      display:none !important;
    }

    /* Keep hero white-on-dark (do not greyscale / inherit ink) */
    html body .notes-topic-embedded .hero,
    html body .notes-topic-embedded section.hero,
    html body .notes-topic-embedded .hero *{
      color:#fff !important;
      -webkit-print-color-adjust:exact !important;
      print-color-adjust:exact !important;
    }

    .notes-topic-embedded,
    .notes,section,div,main,aside,ul,ol{
      break-inside:auto !important;
      page-break-inside:auto !important;
    }
    .svg-wrap,.figure,svg,img,figure,tr,.pyq-item,.callout,.aside-card,.card,.widget,li{
      break-inside:avoid !important;
      page-break-inside:avoid !important;
    }
    h1,h2,h3,h4{break-after:avoid !important;page-break-after:avoid !important}
  }
`;

/** Drop legacy @media print blocks that hide .svg-wrap / aside or greyscale heroes. */
function stripLegacyPrintCss(html: string): string {
  return html.replace(/@media\s+print\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/gi, "");
}

function absolutizeUrls(root: ParentNode, baseHref: string) {
  root.querySelectorAll("img[src]").forEach((el) => {
    const img = el as HTMLImageElement;
    const src = img.getAttribute("src");
    if (!src || src.startsWith("data:") || src.startsWith("blob:")) return;
    try {
      img.setAttribute("src", new URL(src, baseHref).href);
    } catch {
      /* keep original */
    }
  });
}

export function DownloadNotesButton({
  title,
  subjectName,
}: DownloadNotesButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleDownload = useCallback(() => {
    const body = document.querySelector(".notes-topic-body");
    if (!body || busy) return;

    setBusy(true);

    const clone = body.cloneNode(true) as HTMLElement;
    absolutizeUrls(clone, window.location.href);

    const inner = stripLegacyPrintCss(clone.innerHTML);
    const docTitle = `${title} — ${subjectName} | MentorsDaily UPSC Notes`;
    const origin = window.location.origin;
    const docHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<base href="${origin}/">
<title>${docTitle}</title>
</head>
<body>
${inner}
<style>${PRINT_CSS}</style>
</body>
</html>`;

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

    const waitForAssets = (): Promise<void> => {
      const images = Array.from(idoc.images ?? []);
      if (images.length === 0) {
        return new Promise((resolve) => window.setTimeout(resolve, 500));
      }
      return Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
                return;
              }
              img.onload = () => resolve();
              img.onerror = () => resolve();
              window.setTimeout(resolve, 2500);
            }),
        ),
      ).then(() => undefined);
    };

    void waitForAssets().then(() => {
      // Extra paint tick so SVG viewBox layouts settle at A4 width.
      window.setTimeout(() => {
        try {
          document.title = docTitle;
          frameWin.focus();
          frameWin.print();
        } catch {
          cleanup();
        }
      }, 600);
    });
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
        Opens the print dialog — choose “Save as PDF”. Keep “Background
        graphics” on so colours and diagrams match the page.
      </span>
    </div>
  );
}
