const strip = require('./node_modules/strip-comments');
const s = 'catch {\n      // comment\n    }';
console.log(JSON.stringify(strip(s, { preserveNewlines: true })));
