const fs = require("fs");

// Read the cleaned raw icon metadata
const rawData = JSON.parse(fs.readFileSync("icons_raw.json", "utf-8"));

// Extract just the icon names
const iconNames = rawData.icons.map(icon => icon.name);

// Optional: remove duplicates
const uniqueIconNames = Array.from(new Set(iconNames)).sort();

// Save to a simplified icons.json file
fs.writeFileSync("src/data/icons.json", JSON.stringify(uniqueIconNames, null, 2));

console.log(`✅ Successfully extracted ${uniqueIconNames.length} icons to src/data/icons.json`);
