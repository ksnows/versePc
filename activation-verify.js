const fs = require('fs');
const path = require('path');
const os = require('os');

const _schemaVer = 4;
const _storePath = path.join(os.homedir(), '.versepc', 'app-store.json');

function _readStore() {
    try {
        const raw = fs.readFileSync(_storePath, 'utf-8');
        return JSON.parse(raw);
    } catch (_) {
        return {};
    }
}

function _writeStore(store) {
    try {
        fs.mkdirSync(path.dirname(_storePath), { recursive: true });
        fs.writeFileSync(_storePath, JSON.stringify(store, null, 2), 'utf8');
    } catch (_) {}
}

function checkTampering() {
    return 'ok';
}

function clearActivation(store) {
    if (!store) return store;
    delete store['activation_type'];
    delete store['activation_code'];
    delete store['activation_time'];
    delete store['activation_version'];
    delete store['activation_schema_ver'];
    return store;
}

function autoRecover() {
    const store = _readStore();
    if (!store || typeof store !== 'object') return;
    const next = {
        ...store,
        activation_type: 'free',
        activation_time: store['activation_time'] || new Date().toISOString(),
        activation_schema_ver: _schemaVer
    };
    delete next['activation_code'];
    delete next['activation_version'];
    _writeStore(next);
}

module.exports = { checkTampering, autoRecover, clearActivation, _schemaVer };
