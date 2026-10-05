const fs = require('fs');
const path = require('path');

const cssPath = 'src/index.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');
const specsCss = `
/* Product Specifications 3-Column Layout */
@media (max-width: 1024px) {
  .product-specs-container {
    flex-direction: column !important;
    gap: 40px !important;
    align-items: center !important;
  }
  .product-specs-col {
    width: 100% !important;
    text-align: center !important;
    align-items: center !important;
  }
  .product-specs-img-col {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
  }
  .product-specs-img-col img {
    max-width: 90% !important;
    height: auto !important;
    object-fit: contain !important;
  }
}
`;
if (!cssContent.includes('.product-specs-container')) {
    fs.writeFileSync(cssPath, cssContent + '\n' + specsCss, 'utf8');
    console.log('Updated index.css');
}

const filesToFix = [
    'src/pages/SolidStateBatteries.jsx',
    'src/pages/SolarStreetLightStorage.jsx',
    'src/pages/LithiumInverterBattery.jsx',
    'src/pages/Inverter.jsx',
    'src/pages/EVCharger.jsx',
    'src/pages/ElectricScooterBattery.jsx'
];

for (const filePath of filesToFix) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // The container usually has display: "flex", justifyContent: "center", alignItems: "flex-start" or "center"
    // and is located right above {/* Left Specs */}
    // We can just use a regex to find the div that contains {/* Left Specs */}
    
    // 1. Inject product-specs-container
    // Find the <div> block that is immediately before {/* Left Specs */}
    if (!content.includes('className="product-specs-container"')) {
        content = content.replace(
            /(<\s*div[^>]*?>)\s*(\{\/\*\s*Left Specs\s*\*\/\})/g,
            (match, p1, p2) => {
                if (!p1.includes('className="product-specs-container"')) {
                    if (p1.includes('className=')) {
                         return p1.replace(/className="([^"]*)"/, 'className="$1 product-specs-container"') + '\n          ' + p2;
                    } else {
                         return p1.replace('<div', '<div className="product-specs-container"') + '\n          ' + p2;
                    }
                }
                return match;
            }
        );
        changed = true;
    }

    // 2. Inject product-specs-col for Left Specs
    if (!content.includes('className="product-specs-col"')) {
        content = content.replace(
            /(\{\/\*\s*Left Specs\s*\*\/\}\s*<\s*div[^>]*)(>)/g,
            (match, p1, p2) => p1 + ' className="product-specs-col"' + p2
        );
        
        // 3. Inject product-specs-col for Right Specs
        content = content.replace(
            /(\{\/\*\s*Right Specs\s*\*\/\}\s*<\s*div[^>]*)(>)/g,
            (match, p1, p2) => p1 + ' className="product-specs-col"' + p2
        );

        // 4. Inject product-specs-img-col for Middle Image
        content = content.replace(
            /(\{\/\*\s*Middle Image\s*\*\/\}\s*<\s*div[^>]*)(>)/g,
            (match, p1, p2) => p1 + ' className="product-specs-img-col"' + p2
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed Specs JSX in', filePath);
    }
}
