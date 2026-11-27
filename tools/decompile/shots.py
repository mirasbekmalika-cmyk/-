import sys
from playwright.sync_api import sync_playwright
from PIL import Image, ImageChops
routes=['/','/catalog','/protocol/croup','/assessment','/protocol/pals','/comparison/respiratory']
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for w,tag in [(1280,'d'),(390,'m')]:
        for port,name in [(4174,'old'),(4173,'new')]:
            pg=b.new_page(viewport={'width':w,'height':900})
            for i,r in enumerate(routes):
                pg.goto(f'http://localhost:{port}/#{r}'); pg.wait_for_timeout(2500 if 'pals' in r else 800)
                pg.screenshot(path=f'/tmp/s_{name}_{tag}_{i}.png',full_page=True)
            pg.close()
    b.close()
for tag in 'dm':
  for i,r in enumerate(routes):
    a=Image.open(f'/tmp/s_old_{tag}_{i}.png').convert('RGB'); c=Image.open(f'/tmp/s_new_{tag}_{i}.png').convert('RGB')
    if a.size!=c.size: print(tag,r,'size',a.size,c.size); continue
    d=ImageChops.difference(a,c).getbbox(); 
    px=sum(1 for v in ImageChops.difference(a,c).convert('L').getdata() if v>30)
    print(tag,r,'bbox',d,'px',px)
