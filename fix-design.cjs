const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('src/pages');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('objectFit: "cover"')) {
    content = content.replaceAll('objectFit: "cover"', 'objectFit: "contain"');
    changed = true;
  }
  
  if (content.includes("objectFit: 'cover'")) {
    content = content.replaceAll("objectFit: 'cover'", "objectFit: 'contain'");
    changed = true;
  }

  // Also make the hero background gradients look better
  // If we see background: "#e0e0e0" or similar, change to gradient
  if (content.includes('background: "#e0e0e0"')) {
    content = content.replaceAll('background: "#e0e0e0"', 'background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)"');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed objectFit in ' + file);
  }
});
