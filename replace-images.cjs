const fs = require('fs');
const path = require('path');

const map = {
  'nav-automotive.jpg': '1.png',
  'inverter-battery.jpg': '2.png',
  'solar-battery-cluster.jpg': '3.png',
  'drone-single-battery.jpg': '4.png',
  'inverter-hero-house.jpg': '6.png',
  'battery-product.jpg': '1.png',
  'scooter-hero.jpg': '8.png',
  'drone-hero-bg.jpg': '4.png',
  'drone-battery-cluster.jpg': '4.png',
  'solar-hero-bg.jpg': '3.png',
  'solar-black-battery.jpg': '3.png',
  'sustainable_ev_fleet.jpg': '5.png',
  'scooter-hero-bg.jpg': '1.png',
  'slider-1.jpg': '1.png',
  'slider-2.jpg': '2.png',
  'slider-3.jpg': '3.png',
  'slider-4.jpg': '4.png',
  'slider-5.jpg': '5.png'
};

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

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [oldImg, newImg] of Object.entries(map)) {
    if (content.includes(oldImg)) {
      content = content.replaceAll(oldImg, newImg);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
