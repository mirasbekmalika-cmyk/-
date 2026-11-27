"""Open every route of a built site, collect console errors and page text."""
import json, sys, subprocess, time
from playwright.sync_api import sync_playwright

base = sys.argv[1]
out = sys.argv[2]
routes = ['/', '/catalog', '/system/respiratory', '/comparison/respiratory', '/assessment', '/emergency',
          '/protocol/severe-pneumonia', '/protocol/croup', '/protocol/bronchiolitis', '/protocol/epiglottitis',
          '/protocol/acute-asthma', '/protocol/foreign-body', '/protocol/central-hypoventilation',
          '/protocol/pediatric-bls', '/protocol/pals', '/calculators', '/favorites', '/recent', '/medications',
          '/procedures', '/sources', '/about', '/team', '/editor', '/system/cardiovascular?age=adult', '/nope']
res = {}
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': 1280, 'height': 900})
    errs = []
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
    for r in routes:
        errs.clear()
        pg.goto(base + '/#' + r)
        pg.wait_for_timeout(1500 if 'pals' in r or 'bls' in r else 600)
        txt = pg.evaluate("(document.querySelector('main')||document.body).innerText")
        res[r] = {'text': txt, 'errors': [e for e in errs if 'supabase' not in e.lower()][:5]}
    b.close()
json.dump(res, open(out, 'w'), ensure_ascii=False, indent=1)
for r, v in res.items():
    print(r, len(v['text']), v['errors'][:2])
