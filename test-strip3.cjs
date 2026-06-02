const strip = require('./node_modules/strip-comments');
const s = 'try {\r\n  await db.auth.resetPasswordRequest(email);\r\n} catch {\r\n  // Always show success regardless\r\n} finally {\r\n  setLoading(false);\r\n  setSent(true);\r\n}';
console.log(JSON.stringify(strip(s, { preserveNewlines: true })));
