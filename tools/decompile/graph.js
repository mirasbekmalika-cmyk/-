// Build a top-level declaration graph across wakaru chunks and report reachability.
const fs = require('fs'), path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const dir = process.argv[2];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
const decls = new Map(); // key file::name -> {file,name,start,end,deps:Set(key)}
const imports = {}; // file -> local -> {src,imported}
const exportsMap = {}; // file -> exportedName -> localName
const stmtsByFile = {};
for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'], errorRecovery: true });
  imports[f] = {}; exportsMap[f] = {}; stmtsByFile[f] = [];
  for (const node of ast.program.body) {
    if (node.type === 'ImportDeclaration') {
      for (const s of node.specifiers) imports[f][s.local.name] = { src: path.basename(node.source.value), imported: s.imported ? (s.imported.name || s.imported.value) : 'default' };
      continue;
    }
    let n = node, names = [];
    if (n.type === 'ExportNamedDeclaration') {
      if (n.declaration) n = n.declaration; else { for (const s of n.specifiers) exportsMap[f][s.exported.name] = s.local.name; continue; }
      if (n.type === 'VariableDeclaration') n.declarations.forEach(d => d.id.name && (exportsMap[f][d.id.name] = d.id.name));
      else if (n.id) exportsMap[f][n.id.name] = n.id.name;
    }
    if (n.type === 'VariableDeclaration') n.declarations.forEach(d => { if (d.id.type === 'Identifier') names.push(d.id.name); else if (d.id.type==='ObjectPattern'||d.id.type==='ArrayPattern') { /* skip */ } });
    else if ((n.type === 'FunctionDeclaration' || n.type === 'ClassDeclaration') && n.id) names.push(n.id.name);
    const key = names.length ? names.map(x => f + '::' + x) : [f + '::@stmt' + node.start];
    stmtsByFile[f].push({ node, names, keys: key, start: node.start, end: node.end, code });
  }
}
function resolve(f, name, seen = 0) {
  if (seen > 20) return null;
  const imp = imports[f][name];
  if (imp) {
    const tf = imp.src; if (!exportsMap[tf]) return 'EXT::' + imp.src + '::' + imp.imported;
    const local = exportsMap[tf][imp.imported]; if (!local) return tf + '::' + imp.imported;
    return resolve(tf, local, seen + 1) || tf + '::' + local;
  }
  return f + '::' + name;
}
const all = new Map();
for (const f of files) for (const st of stmtsByFile[f]) {
  const deps = new Set();
  const local = new Set(st.names);
  traverse({ type: 'File', program: { type: 'Program', body: [st.node], sourceType: 'module' } }, {
    Identifier(p) {
      if (!p.isReferencedIdentifier() && !(p.parentPath.isAssignmentExpression() && p.key==='left') && !p.parentPath.isUpdateExpression()) return;
      const nm = p.node.name; if (p.scope.getBinding(nm) && p.scope.getBinding(nm).scope.path.type !== 'Program') return;
      deps.add(nm);
    },
    JSXIdentifier(p) { const nm = p.node.name; if (/^[A-Z_$]/.test(nm) || p.parent.type==='JSXMemberExpression') deps.add(nm); }
  }, undefined, {});
  const known = new Set([...Object.keys(imports[f]), ...stmtsByFile[f].flatMap(s => s.names)]);
  const r = [...deps].filter(d => known.has(d)).map(d => resolve(f, d));
  for (const k of st.keys) all.set(k, { file: f, start: st.start, end: st.end, deps: r, keys: st.keys });
}
// statements without names in entry (side effects) are roots
const roots = [];
const rootSpec = process.argv[3] ? process.argv[3].split(',') : null;
if (rootSpec) roots.push(...rootSpec); else for (const [k, v] of all) if (k.includes('@stmt') && v.file === 'entry.js') roots.push(k);
const stopFiles = new Set((process.argv[4] || '').split(',').filter(Boolean));
const reached = new Set(); const stack = [...roots]; const ext = new Set();
while (stack.length) { const k = stack.pop(); if (reached.has(k)) continue; reached.add(k); const v = all.get(k); if (!v) { ext.add(k); continue; } if (stopFiles.has(v.file) && !roots.includes(k)) { ext.add(k); continue; } for (const d of v.deps) stack.push(d); }
const out = { reached: [...reached].filter(k => all.has(k) && !ext.has(k)), ext: [...ext] };
const perFile = {}; for (const k of out.reached) { const v = all.get(k); perFile[v.file] = (perFile[v.file] || 0) + (v.end - v.start) / (v.keys.length); }
console.log(JSON.stringify({ perFile, ext: out.ext.slice(0, 400) }, null, 1));
fs.writeFileSync('/home/claude/tools/graph.json', JSON.stringify({ reached: out.reached, ext: out.ext, all: Object.fromEntries([...all].map(([k, v]) => [k, { file: v.file, start: v.start, end: v.end, deps: v.deps }])) }));
