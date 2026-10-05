const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // We need to fix the mobile layout for "img[style*='right: 10%']" 
    // Instead of forcing width: 150px, we should make it width: 90% so wide banners fit.
    if (content.includes('width: 150px !important')) {
        content = content.replace(
            /img\[style\*="right: 10%"\] \{([^}]+)\}/g,
            'img[style*="right: 10%"] { position: relative !important; right: 0 !important; top: 0 !important; margin: 30px auto 0 !important; width: 90% !important; max-width: 350px !important; height: auto !important; display: block !important; }'
        );
        changed = true;
    }
    
    // Ensure the text wrapper max-width is 100% and text is centered on mobile to prevent cut-offs
    if (content.includes('max-width: 100% !important;') && !content.includes('text-align: center !important;')) {
        content = content.replace(
            /div\[style\*="max-width: 60%"\], div\[style\*="maxWidth: 60%"\] \{([^}]+)\}/g,
            'div[style*="max-width: 60%"], div[style*="maxWidth: 60%"] { max-width: 100% !important; text-align: center !important; margin: 0 auto !important; }'
        );
        changed = true;
    }
    
    // Also fix the padding for the mint green box so it's not too tight
    if (content.includes('padding: 30px !important')) {
        content = content.replace(
            /div\[style\*="padding: 60px 80px"\] \{([^}]+)\}/g,
            'div[style*="padding: 60px 80px"] { padding: 40px 20px !important; display: flex !important; flex-direction: column !important; align-items: center !important; }'
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed CSS in', filePath);
    }
}
