const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/amitk/OneDrive/Desktop/assinment/my-react-app/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Make inline fixed widths fluid
  content = content.replace(/width:\s*'45%'/g, "flex: '1 1 300px', maxWidth: '100%'");
  content = content.replace(/width:\s*'380px'/g, "flex: '1 1 380px', maxWidth: '100%'");
  
  // 2. Allow flex containers to wrap if they are between sections
  content = content.replace(/display:\s*'flex',\s*justifyContent:\s*'space-between'/g, "display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px'");
  content = content.replace(/display:\s*'flex',\s*flexDirection:\s*'column',\s*justifyContent:\s*'space-between'/g, "display: 'flex', flexDirection: 'column', gap: '30px'");

  // 3. Prevent absolute positioning on specs from breaking mobile by making them flex
  // Actually, the specs are inside a parent: display: 'flex', justifyContent: 'center', alignItems: 'center'
  // Let's replace the absolute left/right with relative for the 380px divs
  content = content.replace(/position:\s*'absolute',\s*left:\s*'0'/g, "position: 'relative'");
  content = content.replace(/position:\s*'absolute',\s*right:\s*'0'/g, "position: 'relative'");
  
  // 4. Update the parent of the 380px divs to be a wrapped flex container
  content = content.replace(/minHeight:\s*'600px'/g, "minHeight: 'auto', flexWrap: 'wrap', gap: '40px', padding: '40px 0'");

  fs.writeFileSync(filePath, content);
});
console.log('Fixed hardcoded widths and flex containers across all pages.');
