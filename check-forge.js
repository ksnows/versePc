const fs = require('fs');
const path = require('path');
const ROOT = 'C:\\Users\\huang\\.versepc';
const forgeDir = path.join(ROOT, 'libraries', 'net', 'minecraftforge', 'forge', '26.1.2-64.0.9');
console.log('Forge dir entries:');
if (fs.existsSync(forgeDir)) {
    fs.readdirSync(forgeDir).forEach(f => {
        const full = path.join(forgeDir, f);
        const stat = fs.statSync(full);
        console.log('  ' + (stat.isDirectory() ? 'DIR' : 'FILE') + ' ' + f + ' (' + stat.size + ' bytes)');
    });
}

const ipPath = path.join(ROOT, 'versions', '26.1.2-forge-64.0.9', 'install_profile.json');
if (fs.existsSync(ipPath)) {
    const ip = JSON.parse(fs.readFileSync(ipPath, 'utf8'));
    console.log('\ninstall_profile.json data keys:', Object.keys(ip.data || {}));
    console.log('\nprocessors:', (ip.processors || []).length);
    (ip.processors || []).forEach((p, i) => {
        console.log('  [' + i + '] ' + p.main + ' sides=' + p.sides);
    });
}

const vjPath = path.join(ROOT, 'versions', '26.1.2-forge-64.0.9', '26.1.2-forge-64.0.9.json');
if (fs.existsSync(vjPath)) {
    const vj = JSON.parse(fs.readFileSync(vjPath, 'utf8'));
    console.log('\nVersion JSON libs:', (vj.libraries || []).length);
    console.log('mainClass:', vj.mainClass);
}
