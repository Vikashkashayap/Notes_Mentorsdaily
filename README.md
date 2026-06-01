# MentorsDaily UPSC Notes (Next.js)

SEO-friendly Next.js app for MentorsDaily UPSC notes. The Ancient Indian History complete notes (Topics 01–12) are served at `/upsc-notes/ancient-history`.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: set NEXT_PUBLIC_SITE_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — home page links to the full Ancient History notes.

## SEO features

- Next.js `metadata` API (title, description, keywords, canonical, Open Graph, Twitter)
- JSON-LD `Article` structured data
- `sitemap.xml` and `robots.txt`
- Server-rendered HTML content for crawlers

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/upsc-notes/ancient-history/page.tsx` | Notes page with SEO metadata |
| `src/content/ancient-history-body.html` | Main notes HTML (from original file) |
| `src/styles/notes.css` | Original master stylesheet |
| `src/styles/notes-supplement.css` | Styles for topic body components |
| `src/components/notes/` | Notes body loader + scroll enhancements |

## Updating notes content

Re-export from the source HTML and run:

```bash
node scripts/extract-from-html.mjs path/to/source.html
node scripts/fix-html-links.mjs
```

Or replace `src/content/ancient-history-body.html` manually after editing.

## Production build

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to your production domain before deploying.
