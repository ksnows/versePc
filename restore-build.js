const fs = require('fs');
const path = require('path');

const root = __dirname;

const aiChatBak = path.join(root, 'js', 'ai-chat.js.bak');
const aiChatOrig = path.join(root, 'js', 'ai-chat.js');
if (fs.existsSync(aiChatBak)) {
    fs.copyFileSync(aiChatBak, aiChatOrig);
    fs.unlinkSync(aiChatBak);
    console.log('Restored js/ai-chat.js');
}

const avBak = path.join(root, 'activation-verify.js.bak');
const avOrig = path.join(root, 'activation-verify.js');
if (fs.existsSync(avBak)) {
    fs.copyFileSync(avBak, avOrig);
    fs.unlinkSync(avBak);
    console.log('Restored activation-verify.js');
}

const mainPath = path.join(root, 'main.js');
let mainContent = fs.readFileSync(mainPath, 'utf8');
const restored = mainContent.replace(
    /let IS_BETA = \(\(\) => \{ try \{ return (?:true|false); \} catch \(_\) \{ return false; \} \}\)\(\);/,
    'let IS_BETA = (() => { try { return __IS_BETA__; } catch (_) { return false; } })();'
);
if (restored !== mainContent) {
    fs.writeFileSync(mainPath, restored);
    console.log('Restored main.js IS_BETA placeholder');
}

const preloadPath = path.join(root, 'preload.cjs');
if (fs.existsSync(preloadPath)) {
    let preloadContent = fs.readFileSync(preloadPath, 'utf8');
    const restoredPreload = preloadContent.replace(
        /isAIEnabled:\s*\(\)\s*=>\s*\{\s*return\s+true;\s*\}/,
        'isAIEnabled: () => { return false; }'
    );
    if (restoredPreload !== preloadContent) {
        fs.writeFileSync(preloadPath, restoredPreload);
        console.log('Restored preload.cjs isAIEnabled');
    }
}

console.log('Build artifacts restored');
