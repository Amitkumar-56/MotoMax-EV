const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Inject product-specs-img-col for Middle Image block which has various comments
    if (!content.includes('className="product-specs-img-col"')) {
        content = content.replace(
            /(\{\/\*\s*(?:Middle Image|Center Spine \+ Battery Image)\s*\*\/\}\s*<\s*div[^>]*)(>)/g,
            (match, p1, p2) => p1 + ' className="product-specs-img-col"' + p2
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed Image Col JSX in', filePath);
    }
}
