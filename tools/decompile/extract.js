// Extract app code from wakaru chunks into a set of modules with real imports.
const fs = require('fs'), path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const DIR = '/home/claude/work/unpacked';
const OUT = process.argv[2] || '/home/claude/out/src';
const g = require('./graph.json');
const all = g.all;
const srcCache = {};
const src = f => (srcCache[f] ||= fs.readFileSync(path.join(DIR, f), 'utf8'));
const lineOf = (f, p) => src(f).slice(0, p).split('\n').length;

// ---- library mapping: key -> {from, name, ns?, def?}
const LIB = {
  'chunk_Fp.js::x': { from: 'react', local: 'React', def: true },
  'chunk_T2.js::x3': { from: 'react', local: 'React', def: true },
  'chunk_T2.js::U3': { from: 'react-dom/client', local: 'ReactDOMClient', ns: true },
  'chunk_E3.js::o5': { from: 'react-router-dom', local: 'HashRouter' },
  'chunk_E3.js::de': { from: 'react-router-dom', local: 'Link' },
  'chunk_E3.js::_0': { from: 'react-router-dom', local: 'NavLink' },
  'chunk_E3.js::l5': { from: 'react-router-dom', local: 'Form' },
  'chunk_ao.js::na': { from: 'react-router-dom', local: 'useLocation' },
  'chunk_ao.js::Du': { from: 'react-router-dom', local: 'useNavigate' },
  'chunk_ao.js::j1': { from: 'react-router-dom', local: 'useParams' },
  'chunk_P3.js::kt': { from: 'react-router-dom', local: 'Route' },
  'chunk_P3.js::Uv': { from: 'react-router-dom', local: 'Routes' },
  'entry.js::RR': { from: '@supabase/supabase-js', local: 'createClient' },
  'entry.js::getDocument': { from: 'pdfjs-dist', local: 'getDocument' },
  'chunk_dt.js::eo': { from: 'pdfjs-dist', local: 'GlobalWorkerOptions' },
  'chunk_dt.js::WS': { from: 'pdfjs-dist/build/pdf.worker.min.mjs?url', local: 'pdfWorkerUrl', def: true },
};
// lucide icons: entry decls initialised with Ie("Name", ...)
const ICON = {};
{
  const code = src('entry.js');
  for (const [k, v] of Object.entries(all)) {
    if (!k.startsWith('entry.js::')) continue;
    const s = code.slice(v.start, v.end);
    const m = s.match(/^const\s+([\w$]+)\s*=\s*Ie\("([A-Za-z0-9]+)"/);
    if (m) ICON[k] = m[2];
  }
  for (const [k, n] of Object.entries(ICON)) LIB[k] = { from: 'lucide-react', imported: n, local: n + 'Icon' };
}
// ---- module assignment
const MOD_OVERRIDE = {
  'entry.js::B81': 'pages/TeamPage', 'entry.js::$9': 'pages/EditorPage',
  'entry.js::VComponent': 'components/Icon', 'entry.js::p8': 'components/Icon', 'entry.js::X9': 'components/Icon',
  'entry.js::KsComponent': 'components/Modal', 'entry.js::BSComponent': 'features/manuals/ManualViewer',
  'entry.js::S7Component': 'app/AppShell', 'entry.js::M7Component': 'app/App', 'entry.js::A7Component': 'app/Sidebar', 'entry.js::N7Component': 'app/SearchDialog',
  'entry.js::H9': 'pages/TeamPage',
};
const PAGE_KEYS = ['O7Component','XSComponent','L7Component','C7Component','N2Component','H7Component','U7Component','J2Component','G7Component','D7Component','G2Component','SmComponent'];
for (const n of PAGE_KEYS) MOD_OVERRIDE['entry.js::' + n] = 'pages/' + (JSON.parse(fs.readFileSync('/home/claude/tools/renames.json','utf8'))['entry.js::' + n]);
function moduleFor(key) {
  if (MOD_OVERRIDE[key]) return MOD_OVERRIDE[key];
  const v = all[key]; const f = v.file; const name = key.split('::')[1];
  if (f === 'chunk_UR_2.js') return 'data/respiratory-sources';
  if (f === 'chunk_zh.js') return 'data/topic-sections';
  if (f === 'chunk_dt.js') return 'data/manuals';
  if (f === 'chunk_G1.js') return 'state/app-state';
  if (f === 'chunk_ao.js') return 'state/navigation';
  if (f === 'chunk_SR.js') return 'lib/auth-callback';
  if (f === 'chunk_u1.js') return 'lib/utils';
  if (f === 'chunk_D8.js') return 'lib/flow-and-images';
  if (f === 'chunk_bR_2.js') return 'lib/supabase-config';
  if (f !== 'entry.js') return 'misc/' + f.replace('.js', '');
  const l = lineOf(f, v.start);
  if (l < 6871) return 'components/TopicIllustrations';
  if (l < 8461) return 'lib/supabase-and-topics';
  if (l < 9062) return 'data/catalog';
  if (l < 9532) return 'features/auth';
  if (l < 11289) return 'components/icons';
  if (l < 12021) return 'features/editor-forms';
  if (l < 12501) return 'features/editor';
  if (l < 12584) return 'components/age-filter';
  if (l < 14636) return 'features/manuals';
  if (l < 14785) return 'components/common';
  if (key.includes('@stmt')) return 'app/bootstrap';
  return 'components/catalog-cards';
}
// ---- reachability with stops
const roots = ['entry.js::M7Component', 'entry.js::CD1Component', 'chunk_G1.js::E8', 'chunk_E3.js::o5'];
// the render statement
const renderKey = Object.keys(all).find(k => k.startsWith('entry.js::@stmt') && src('entry.js').slice(all[k].start, all[k].end).includes('createRoot'));
roots.push(renderKey);
for (const [k, v] of Object.entries(all)) {
  if (!k.startsWith('entry.js::@stmt')) continue;
  const l = lineOf('entry.js', v.start);
  if (l === 6901 || l === 8827) roots.push(k);
}
const reached = new Set(); const stack = [...roots]; const missing = new Set();
while (stack.length) {
  const k = stack.pop(); if (reached.has(k)) continue;
  if (LIB[k]) { reached.add(k); continue; }
  if (!all[k]) { missing.add(k); continue; }
  reached.add(k); for (const d of all[k].deps) stack.push(d);
}
const appKeys = [...reached].filter(k => !LIB[k] && all[k]);
// report modules
const byMod = {};
for (const k of appKeys) (byMod[moduleFor(k)] ||= []).push(k);
for (const m of Object.keys(byMod).sort()) console.error(m, byMod[m].length);
console.error('missing', [...missing]);
// ---- final names (unique across project)
const finalName = {}; const used = new Map();
const RENAME = JSON.parse(fs.existsSync('/home/claude/tools/renames.json') ? fs.readFileSync('/home/claude/tools/renames.json', 'utf8') : '{}');
for (const k of Object.keys(LIB).filter(k => reached.has(k))) finalName[k] = LIB[k].local;
const taken = new Set(Object.values(finalName));
for (const k of appKeys.sort()) {
  let n = RENAME[k] || k.split('::')[1];
  if (n.startsWith('@stmt')) { finalName[k] = null; continue; }
  let c = n, i = 2; while (taken.has(c)) c = n + '_' + i++;
  taken.add(c); finalName[k] = c;
}
// ---- emit
const resolveLocal = (f, name) => {
  // mimic graph resolve
  const code = src(f);
  return null;
};
// Build per-file import table again
const imports = {}; const exportsMap = {};
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.js'))) {
  const ast = parser.parse(src(f), { sourceType: 'module', plugins: ['jsx'], errorRecovery: true });
  imports[f] = {}; exportsMap[f] = {};
  for (const n of ast.program.body) {
    if (n.type === 'ImportDeclaration') for (const s of n.specifiers) imports[f][s.local.name] = { src: path.basename(n.source.value), imported: s.imported ? (s.imported.name || s.imported.value) : 'default' };
    if (n.type === 'ExportNamedDeclaration') {
      if (n.declaration) { const d = n.declaration; if (d.type === 'VariableDeclaration') d.declarations.forEach(x => exportsMap[f][x.id.name] = x.id.name); else if (d.id) exportsMap[f][d.id.name] = d.id.name; }
      else for (const s of n.specifiers) exportsMap[f][s.exported.name] = s.local.name;
    }
  }
}
function resolve(f, name, depth = 0) {
  const imp = imports[f][name];
  if (imp) { const tf = imp.src; const local = exportsMap[tf] && exportsMap[tf][imp.imported]; if (!local) return tf + '::' + imp.imported; return depth > 20 ? tf + '::' + local : resolve(tf, local, depth + 1); }
  return f + '::' + name;
}
const modules = {}; // mod -> {code:[], needs:Set(key)}
const order = appKeys.slice().sort((a, b) => (all[a].file === all[b].file ? all[a].start - all[b].start : a < b ? -1 : 1));
const seenStmt = new Set();
for (const k of order) {
  const v = all[k]; const id = v.file + ':' + v.start; if (seenStmt.has(id)) continue; seenStmt.add(id);
  let code = src(v.file).slice(v.start, v.end).replace(/^export\s+/, '');
  let ast;
  try { ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] }); } catch (e) { console.error('parse fail', k, e.message); continue; }
  const mod = moduleFor(k); const M = (modules[mod] ||= { stmts: [], needs: new Set(), defines: new Set() });
  const topNames = new Set();
  traverse(ast, {
    Program(p) { for (const [n, b] of Object.entries(p.scope.bindings)) topNames.add(n); },
  });
  const renameRef = (node, scopePath) => {
    const nm = node.name;
    const b = scopePath.scope.getBinding(nm);
    if (b && b.scope.path.type !== 'Program') return;
    if (b && b.scope.path.type === 'Program' && !topNames.has(nm)) return;
    const key = resolve(v.file, nm);
    if (!(key in finalName)) return;
    const fn = finalName[key]; if (!fn) return;
    if (fn !== nm) node.name = fn;
    if (!(topNames.has(nm) && key === v.file + '::' + nm && moduleFor(key) === mod)) M.needs.add(key);
  };
  traverse(ast, {
    Identifier(p) {
      if (!p.isReferencedIdentifier() && !(p.parentPath.isAssignmentExpression() && p.key === 'left') && !p.parentPath.isUpdateExpression() && !(p.parentPath.isVariableDeclarator() && p.parentPath.parentPath.parentPath.isProgram() && p.key === 'id') && !(p.parentPath.isFunctionDeclaration() && p.key === 'id' && p.parentPath.parentPath.isProgram()) && !(p.parentPath.isClassDeclaration() && p.key === 'id' && p.parentPath.parentPath.isProgram())) return;
      if (p.parentPath.isObjectProperty() && p.parentPath.node.shorthand && p.key === 'value') {
        // expand shorthand so renamed value keeps the key
        const nm = p.node.name; const key = resolve(v.file, nm); const fn = finalName[key];
        if (fn && fn !== nm) { p.parentPath.node.shorthand = false; }
      }
      renameRef(p.node, p);
    },
    JSXOpeningElement(p) { fixJsx(p.node.name, p); },
    JSXClosingElement(p) { fixJsx(p.node.name, p); },
  });
  function fixJsx(n, p) {
    if (n.type === 'JSXMemberExpression') { let o = n; while (o.object.type === 'JSXMemberExpression') o = o.object; const nm = o.object.name; const b = p.scope.getBinding(nm); if (b && b.scope.path.type !== 'Program') return; const key = resolve(v.file, nm); if (finalName[key]) { o.object.name = finalName[key]; M.needs.add(key); } return; }
    if (n.type !== 'JSXIdentifier') return; const nm = n.name;
    const b = p.scope.getBinding(nm); if (b && b.scope.path.type !== 'Program') { if (/^[a-z]/.test(nm)) console.error('LOCAL lowercase jsx', k, nm); return; }
    const key = resolve(v.file, nm);
    if (!(key in finalName) || !finalName[key]) { if (/^[A-Z]/.test(nm)) console.error('unresolved jsx', k, nm); return; }
    if (/^[a-z]/.test(nm) && nm !== 'file') return;
    n.name = finalName[key]; M.needs.add(key);
  }
  if (finalName[k]) M.defines.add(k);
  M.stmts.push(generate(ast, { retainLines: false, jsescOption: { minimal: true } }).code);
}
// write modules
fs.rmSync(OUT, { recursive: true, force: true });
for (const [mod, M] of Object.entries(modules)) {
  const lines = [];
  const libImports = {}; const appImports = {};
  for (const key of M.needs) {
    if (LIB[key]) { const L = LIB[key]; (libImports[L.from] ||= new Set()).add(JSON.stringify(L)); continue; }
    if (!all[key]) { lines.push(`// MISSING ${key}`); continue; }
    const tm = moduleFor(key); if (tm === mod) continue; if (!finalName[key]) continue;
    (appImports[tm] ||= new Set()).add(finalName[key]);
  }
  for (const [from, set] of Object.entries(libImports)) {
    const L = [...set].map(s => JSON.parse(s));
    const def = L.find(l => l.def), ns = L.find(l => l.ns), named = L.filter(l => !l.def && !l.ns);
    if (def) lines.push(`import ${def.local} from '${from}';`);
    if (ns) lines.push(`import * as ${ns.local} from '${from}';`);
    if (named.length) lines.push(`import { ${[...new Set(named.map(l => l.imported && l.imported !== l.local ? `${l.imported} as ${l.local}` : l.local))].sort().join(', ')} } from '${from}';`);
  }
  for (const [tm, set] of Object.entries(appImports).sort()) {
    const rel = path.relative(path.dirname(path.join(OUT, mod)), path.join(OUT, tm)); const r = rel.startsWith('.') ? rel : './' + rel;
    lines.push(`import { ${[...set].sort().join(', ')} } from '${r}';`);
  }
  const exportsList = [...M.defines].map(k => finalName[k]).filter(Boolean);
  const body = M.stmts.join('\n\n');
  const out = `// @ts-nocheck\n${lines.join('\n')}\n\n${body}\n\nexport { ${exportsList.sort().join(', ')} };\n`;
  const fp = path.join(OUT, mod + '.tsx'); fs.mkdirSync(path.dirname(fp), { recursive: true }); fs.writeFileSync(fp, out);
}
console.error('modules', Object.keys(modules).length);
