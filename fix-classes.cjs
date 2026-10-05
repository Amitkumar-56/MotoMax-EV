const fs = require('fs');
const path = require('path');

const cssPath = 'src/index.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');
const globalCss = `
/* Global Product Card Fixes */
@media (max-width: 768px) {
  .product-mint-box {
    padding: 40px 20px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
  .product-mint-text {
    max-width: 100% !important;
    text-align: center !important;
    margin: 0 auto !important;
  }
  .product-mint-img {
    position: relative !important;
    right: auto !important;
    top: auto !important;
    margin: 30px auto 0 !important;
    width: 95% !important;
    max-width: 400px !important;
    height: auto !important;
    display: block !important;
  }
}
`;
if (!cssContent.includes('.product-mint-box')) {
    fs.writeFileSync(cssPath, cssContent + '\n' + globalCss, 'utf8');
    console.log('Updated index.css');
}

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Inject className="product-mint-box"
    if (content.includes('padding: "60px 80px"')) {
        content = content.replace(
            /(padding:\s*"60px 80px"[^}]*\}\s*>)/g,
            '$1\n          {/* MINT BOX */}'
        );
        content = content.replace(
            /<\s*div\s*style=\{\{\s*background:\s*"var\(--secondary\)"/g,
            '<div className="product-mint-box" style={{ background: "var(--secondary)"'
        );
        changed = true;
    }

    // Inject className="product-mint-text"
    if (content.includes('maxWidth: "60%"')) {
        content = content.replace(
            /<\s*div\s*style=\{\{\s*maxWidth:\s*"60%"\s*\}\}\s*>/g,
            '<div className="product-mint-text" style={{ maxWidth: "60%" }}>'
        );
        changed = true;
    }

    // Inject className="product-mint-img"
    if (content.includes('right: "10%"')) {
        content = content.replace(
            /<img([^>]+)right:\s*"10%"([^>]+)>/g,
            '<img className="product-mint-img" $1right: "10%"$2>'
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed JSX in', filePath);
    }
}
