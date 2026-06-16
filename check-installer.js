const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const ROOT = 'C:\\Users\\huang\\.versepc';
const installerPath = path.join(ROOT, 'temp', 'forge-installer-26.1.2-64.0.9.jar');
if (!fs.existsSync(installerPath)) { console.log('Installer not found'); process.exit(1); }
const zip = new AdmZip(installerPath);
const entries = zip.getEntries().map(e => e.entryName);
console.log('Maven entries:');
entries.filter(e => e.startsWith('maven/')).forEach(e => {
    const entry = zip.getEntry(e);
    console.log('  ' + e + ' (' + entry.header.size + ' bytes)');
});
console.log('\nclient.jar entries:');
entries.filter(e => e.includes('client') && e.endsWith('.jar')).forEach(e => {
    const entry = zip.getEntry(e);
    console.log('  ' + e + ' (' + entry.header.size + ' bytes)');
});
