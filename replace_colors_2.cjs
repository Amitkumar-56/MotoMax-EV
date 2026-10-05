const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src', 'pages');

const colorMap = {
    '"#222"': '"var(--text-main)"',
    '"#444"': '"var(--text-muted)"',
    '"#111"': '"var(--text-main)"',
    '"#000"': '"var(--text-main)"',
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

console.log("Done 2");
