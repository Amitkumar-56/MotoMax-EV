const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src', 'pages');

const colorMap = {
    '"#fff"': '"var(--bg-main)"',
    '"#ffffff"': '"var(--bg-main)"',
    '"#333"': '"var(--text-main)"',
    '"#555"': '"var(--text-muted)"',
    '"#777"': '"var(--text-muted)"',
    '"#f5f5f5"': '"transparent"',
    '"#f9f9fc"': '"transparent"',
    '"#9cf0c4"': '"var(--secondary)"',
    '"#ccc"': '"var(--border-light)"',
    '"#999"': '"var(--text-muted)"',
    'background: "#fff"': 'background: "transparent"',
    'backgroundColor: "#fff"': 'backgroundColor: "transparent"',
};

fs.readdirSync(directory).forEach(file => {
    if (file.endsWith('.jsx')) {
        const filepath = path.join(directory, file);
        let content = fs.readFileSync(filepath, 'utf8');
        let newContent = content;
        
        for (const [pattern, replacement] of Object.entries(colorMap)) {
            newContent = newContent.split(pattern).join(replacement);
        }
        
        if (newContent !== content) {
            fs.writeFileSync(filepath, newContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});

console.log("Done");
