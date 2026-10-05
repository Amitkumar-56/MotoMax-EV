import os
import re

directory = r'c:\Users\amitk\OneDrive\Desktop\assinment\my-react-app\src\pages'

color_map = {
    r'"#fff"': '"var(--bg-main)"',
    r'"#ffffff"': '"var(--bg-main)"',
    r'"#333"': '"var(--text-main)"',
    r'"#555"': '"var(--text-muted)"',
    r'"#777"': '"var(--text-muted)"',
    r'"#f5f5f5"': '"transparent"',
    r'"#f9f9fc"': '"transparent"',
    r'"#9cf0c4"': '"var(--secondary)"', # Green used in home page
    r'"#ccc"': '"var(--border-light)"',
    r'"#999"': '"var(--text-muted)"',
    r'background: "#fff"': 'background: "transparent"', # Remove hardcoded white backgrounds on sections to let gradient show
    r'backgroundColor: "#fff"': 'backgroundColor: "transparent"',
}

for filename in os.listdir(directory):
    if filename.endswith(".jsx"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for pattern, replacement in color_map.items():
            new_content = new_content.replace(pattern, replacement)
            
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")

print("Done")
