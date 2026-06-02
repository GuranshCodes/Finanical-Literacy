const strip = require('./node_modules/strip-comments');
const s = `try {\n  await db.auth.resetPasswordRequest(email);\n} catch {\n  // Always show success regardless\n} finally {\n  setLoading(false);\n  setSent(true);\n}`;
console.log(JSON.stringify(strip(s, { preserveNewlines: true })));
