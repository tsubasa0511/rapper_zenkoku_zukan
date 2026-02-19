
const fs = require('fs');
const path = require('path');

const rappersPath = path.join(__dirname, '../src/data/rappers.json');
const rappersData = JSON.parse(fs.readFileSync(rappersPath, 'utf8'));
const imagesDir = path.join(__dirname, '../public/images/rappers');

if (!fs.existsSync(imagesDir)) {
    console.error(`Images directory not found: ${imagesDir}`);
    process.exit(1);
}

const imageFiles = fs.readdirSync(imagesDir).filter(f => ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(f).toLowerCase()));
const matchedImages = new Set();
let updatedCount = 0;

// Helper to normalize strings for comparison
function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-str9]/g, '');
}

rappersData.forEach(rapper => {
    // 1. Try to find a matching image
    let foundImage = null;

    // Exact match strategies
    const possibleFilenames = [
        rapper.name, // "Eyden"
        rapper.name.toLowerCase(), // "eyden"
        rapper.name.replace(/\s+/g, '_').toLowerCase(), // "Young Coco" -> "young_coco"
        rapper.name.replace(/\s+/g, '').toLowerCase(), // "Young Coco" -> "youngcoco"
        rapper.name.replace(/\./g, '').toLowerCase(), // "D.O" -> "do"
        rapper.name.replace(/-/g, '_').toLowerCase() // "T-Pablow" -> "t_pablow"
    ];

    for (const file of imageFiles) {
        const ext = path.extname(file);
        const nameWithoutExt = path.basename(file, ext);

        // Strategy 1: Check generated possibilities against filename
        if (possibleFilenames.includes(nameWithoutExt) || possibleFilenames.includes(nameWithoutExt.toLowerCase())) {
            foundImage = file;
            break;
        }

        // Strategy 2: Check if normalized names match (very loose)
        // e.g. "T-Pablow" -> "tpablow", "t-pabrow.jpg" -> "tpabrow" (No match, good)
        // "Bad Hop" -> "badhop", "bad_hop.jpg" -> "badhop" (Match)
        if (normalize(rapper.name) === normalize(nameWithoutExt)) {
            foundImage = file;
            break;
        }
    }

    if (foundImage) {
        matchedImages.add(foundImage);
        const newImagePath = `/images/rappers/${foundImage}`;

        if (rapper.image !== newImagePath) {
            console.log(`[UPDATE] Linked ${rapper.name} -> ${foundImage}`);
            rapper.image = newImagePath;
            updatedCount++;
        }
    }
});

// Report results
console.log(`\nSynced ${updatedCount} profiles with images.`);

// Report unused images to help identify typos
const unusedImages = imageFiles.filter(f => !matchedImages.has(f));
if (unusedImages.length > 0) {
    console.log('\n--- Unused Images (Could not match to any rapper) ---');
    unusedImages.forEach(f => console.log(f));
}

// Save
if (updatedCount > 0) {
    fs.writeFileSync(rappersPath, JSON.stringify(rappersData, null, 4), 'utf8');
    console.log('\nSaved changes to rappers.json');
}
