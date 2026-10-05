const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx')).map(f => path.join(dir, f));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('img[style*="right: 10%"] {') && !content.includes('div[style*="right: -35%"] { position: relative')) {
        content = content.replace(
            /(img\[style\*="right: 10%"\] \{[^}]+\})/,
            '$1\n            div[style*="right: -35%"] { position: relative !important; right: auto !important; top: auto !important; transform: none !important; justify-content: center !important; margin-top: 40px !important; }\n            div[style*="width: 30%"], div[style*="width: 40%"] { width: 100% !important; text-align: center !important; }\n            div[style*="gap: 50px"] { flex-direction: column !important; gap: 20px !important; }\n            div[style*="borderBottom"], div[style*="height: 6px"] { display: none !important; }'
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed CSS in', file);
    }
}
