const fs = require('fs');
const path = require('path');

// 1. Add class to the wrapper in JSX files
const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // We add the class product-mint-wrapper to the parent div of product-mint-box
    // It looks like:
    // <div
    //   style={{
    //     maxWidth: "900px",
    //     margin: "0 auto",
    //     position: "relative",
    //     display: "flex",
    //     justifyContent: "center",
    //   }}
    // >
    //   <div className="product-mint-box"

    if (content.includes('className="product-mint-box"') && !content.includes('className="product-mint-wrapper"')) {
        content = content.replace(
            /(<\s*div[^>]*?>\s*)(<\s*div\s+className="product-mint-box")/g,
            (match, p1, p2) => {
                // p1 is the wrapper opening tag, but it might be matched too broadly.
                // It's safer to just regex replace the wrapper if it has display: "flex"
                if (p1.includes('display: "flex"')) {
                    return p1.replace('<div', '<div className="product-mint-wrapper"') + p2;
                }
                return match;
            }
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Added product-mint-wrapper to', filePath);
    }
}

// 2. Update index.css
const cssPath = 'src/index.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('.product-mint-wrapper')) {
    cssContent = cssContent.replace(
        '@media (max-width: 1024px) {',
        `@media (max-width: 1024px) {
  .product-mint-wrapper {
    flex-direction: column !important;
    align-items: center !important;
  }`
    );
    fs.writeFileSync(cssPath, cssContent, 'utf8');
    console.log('Updated index.css with .product-mint-wrapper');
}
