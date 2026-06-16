const fs = require('fs');
let content = fs.readFileSync('server.js', 'utf8');
let count = 0;
content = content.replace(/console\.log\(`\[Forge-DEBUG\] /g, () => { count++; return 'forgeLog(`'; });
content = content.replace(/console\.error\(`\[Forge-DEBUG\] /g, () => { count++; return 'forgeLog(`[ERROR] '; });
fs.writeFileSync('server.js', content, 'utf8');
console.log('Replaced', count, 'occurrences');
