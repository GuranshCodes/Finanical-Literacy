const fs = require('fs');
const path = require('path');
const strip = require('./node_modules/strip-comments');
const root = process.cwd();
const exts = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.md', '.yml', '.yaml']);
let count = 0;
function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (name.isDirectory()) {
      if (name.name === 'node_modules' || name.name === '.git') continue;
      walk(path.join(dir, name.name));
    } else {
      const filePath = path.join(dir, name.name);
      const ext = path.extname(name.name).toLowerCase();
      if (!exts.has(ext)) return;
      const input = fs.readFileSync(filePath, 'utf8');
      const output = strip(input, { preserveNewlines: true });
      if (output !== input) {
        fs.writeFileSync(filePath, output, 'utf8');
        count++;
      }
    }
  }
}
walk(root);
console.log('Comment removal complete. Files changed:', count);
