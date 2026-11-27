# How the source was recovered

The original editable source of version 0.6.6 was lost. Only the built site existed
(`legacy/standalone-0.6.6/` and the Netlify deploy). This folder holds the scripts used
to turn that build back into the code in `src/`. You don't need them for day-to-day work;
they're kept so the recovery can be checked or repeated.

1. `wakaru bundle.js --unpack -o unpacked` split the minified bundle into modules and
   rebuilt JSX.
2. `graph.js` maps every top-level declaration and what it depends on.
3. `extract.js` keeps only the app code (from `App` down), swaps library internals for real
   packages (React, React Router, Supabase, pdf.js, lucide-react), groups code into modules,
   and wires imports. `renames.json` gives the main components readable names.
4. `postprocess.js` moves the large embedded JSON (source documents, manual metadata) into
   `src/content/`. The PDFs are served from `public/manuals/` instead of base64 in the bundle.
5. `fixes.py` applies the few manual fixes needed for the PDF viewer.
6. `smoke.py` opens all 26 routes in the old and new build and compares the page text.
   At recovery time every route matched exactly; `shots.py` compared screenshots.

Paths in these scripts point to the temporary workspace used during recovery.
