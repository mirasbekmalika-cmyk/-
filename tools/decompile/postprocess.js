// Turn JSON.parse('<literal>') blobs into real .json files and fix the manuals module.
const fs = require('fs'), path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const ROOT = process.argv[2];
const files = ['data/respiratory-sources.tsx', 'data/manuals.tsx'];
for (const rel of files) {
  const fp = path.join(ROOT, rel); const code = fs.readFileSync(fp, 'utf8');
  const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
  const newImports = [];
  traverse(ast, {
    CallExpression(p) {
      const c = p.node.callee;
      if (!(t.isMemberExpression(c) && c.object.name === 'JSON' && c.property.name === 'parse')) return;
      const a = p.node.arguments[0]; let str;
      if (t.isStringLiteral(a)) str = a.value; else if (t.isTemplateLiteral(a) && a.expressions.length === 0) str = a.quasis[0].value.cooked; else return;
      let data = JSON.parse(str);
      let name;
      if (p.parentPath.isVariableDeclarator()) name = p.parent.id.name; else if (p.parentPath.isObjectProperty()) name = p.parent.key.name || p.parent.key.value; else name = 'data';
      let dir = rel === 'data/manuals.tsx' ? 'manuals' : 'source-documents';
      if (rel === 'data/manuals.tsx') {
        data = data.map(m => { const { base64, ...rest } = m; return { ...rest, url: `/manuals/${m.filename}` }; });
        name = 'manuals';
      }
      const jsonRel = `../content/${dir}/${name}.json`;
      const jsonPath = path.join(ROOT, 'content', dir, name + '.json');
      fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n');
      const id = name.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase()) + 'Doc';
      newImports.push(`import ${id} from '${jsonRel}';`);
      p.replaceWith(t.identifier(id));
    }
  });
  let out = generate(ast, { jsescOption: { minimal: true } }).code;
  out = out.replace(/^\/\/ @ts-nocheck\n/, '// @ts-nocheck\n' + newImports.join('\n') + '\n');
  fs.writeFileSync(fp, out);
}
