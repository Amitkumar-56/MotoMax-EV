const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/amitk/OneDrive/Desktop/assinment/my-react-app/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/return\s*\(\s*<div\s+style={{/i, 'return (\n    <div className=\"responsive-page\" style={{');
  content = content.replace(/return\s*\(\s*<div\s+className="([^"]+)"/i, 'return (\n    <div className=\"responsive-page \"');

  fs.writeFileSync(filePath, content);
});
console.log('Added responsive-page class to all pages.');
