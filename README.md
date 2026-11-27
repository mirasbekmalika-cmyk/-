# Неотложка+

Электронная клиническая методичка по неотложной медицине для врачей Республики Казахстан.
Live: https://emergencymedicinekz.netlify.app/

## Clinical safety

This is a working project, not an officially approved national clinical handbook. No page has
passed independent medical review yet. Clinical content must be checked against current
Kazakhstan Ministry of Health protocols and authoritative guidelines. Draft or unreviewed
material must never be presented as verified. Do not invent doses, thresholds, treatment
pathways or escalation criteria.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build in dist/
npm run typecheck
```

Netlify settings are in `netlify.toml` (build `npm run build`, publish `dist`).

## Stack

React 19, React Router 7 (hash routes), Supabase (editor accounts and shared articles),
pdf.js (BLS/PALS manual viewer), lucide-react icons. Styles are one stylesheet,
`src/styles/app.css` (compiled from the original Tailwind build).

## Layout

| Path | What's there |
|---|---|
| `src/app/` | App shell, sidebar, search dialog, routes |
| `src/pages/` | One file per route: home, catalog, system, protocol, assessment, team, editor… |
| `src/features/` | Editor forms, auth, PDF manual viewer |
| `src/data/` | Catalog, organ systems, respiratory topics, comparison table |
| `src/lib/` | Supabase client and topic content (doses, tables, flowcharts, references) |
| `src/content/` | Original author documents and manual metadata (JSON) |
| `src/state/` | Theme, favorites, recent, font size, age filter (saved in the browser) |
| `public/manuals/` | BLS and PALS source PDFs |
| `legacy/standalone-0.6.6/` | The old single-file build, kept as a backup |
| `tools/decompile/` | How the source was recovered from the build |
| `docs/` | Original master prompt and project handover |

## Status of the code

Version 0.6.6 was built in another tool and its source was lost. Version 0.7.0 is the same
app recovered from the built site: all 26 routes render the same text as 0.6.6. See
`tools/decompile/README.md`.

Recovered files still carry `// @ts-nocheck` and some short machine-generated names
(`P8Component`, `xt`, `ql`). Clean these up gradually, file by file, when a file is touched
for another reason. New files should be written in proper TypeScript.

## Changes since 0.6.6

- Editable source restored; Netlify can now build from this repo.
- PDFs load from `public/manuals/` instead of being embedded in the JavaScript
  (bundle went from 4.2 MB to 1.2 MB).
- Every respiratory topic page shows a review-status banner: status, version, author,
  reviewer, review date, and a warning that doses aren't yet checked against MoH RK protocols.
