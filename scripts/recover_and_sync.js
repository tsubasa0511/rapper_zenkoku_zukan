
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
let revertedCount = 0;

// 1. RECOVERY: Revert incorrect Kohh images
// The bug caused many to link to "/images/rappers/千葉雄喜.jpg"
const kohhImage = "/images/rappers/千葉雄喜.jpg";
const kohhName = "千葉雄喜"; // valid owner

rappersData.forEach(rapper => {
    if (rapper.image === kohhImage && rapper.name !== kohhName) {
        console.log(`[REVERT] Unlinking ${rapper.name} from ${kohhImage}`);
        rapper.image = `https://placehold.co/600x400/18181b/a1a1aa?text=${encodeURIComponent(rapper.name)}`;
        revertedCount++;
    }
});

// 2. HELPERS
// Normalize for loose matching (English only)
function normalizeEn(str) {
    if (!str) return '';
    // Remove non-alphanumeric, lower case
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Normalize for Japanese/mixed (Keep all chars, just lowercase and strict trim)
function normalizeJp(str) {
    return str.toLowerCase().replace(/\s+/g, '').replace(/[.．-]/g, '');
}

// 3. SPECIAL MAPPINGS (Handle typos/variations)
const specialMappings = {
    't_pabrow.jpg': 'T-Pablow',
    't-pabrow.jpg': 'T-Pablow',
    'saggypants_shimba.jpg': 'saggypantsshinba',
    'juggrixhsentana.jpg': 'juggrixcsentana',
    'taro.jpg': 'Shotaro (Taro)', // or 'Taro'
    'dab.jpg': 'DABO', // Checking if this file is for DABO or DAB
    'elle.jpg': 'Elle Teresa' // Assuming for Elle Teresa
};
// Note: File keys are lowercased in check loop for safety

// 4. SYNC
rappersData.forEach(rapper => {
    let foundImage = null;
    let rapperNameNormEn = normalizeEn(rapper.name);
    let rapperNameNormJp = normalizeJp(rapper.name);

    // Skip if empty normalization (prevent empty string match bug)
    if (!rapperNameNormEn && !rapperNameNormJp) return;

    for (const file of imageFiles) {
        const ext = path.extname(file);
        const nameWithoutExt = path.basename(file, ext);
        const fileLower = file.toLowerCase();

        // A. Check Special Mappings
        for (const [key, val] of Object.entries(specialMappings)) {
            if (file.toLowerCase() === key.toLowerCase() && rapper.name === val) {
                foundImage = file;
                break;
            }
            // Handle case where mapping value matches partial name? Not for now.

            // Reverse mapping check: if rapper name matches value, verify file
            if (rapper.name === val && file.toLowerCase() === key.toLowerCase()) {
                foundImage = file;
                break;
            }
        }
        if (foundImage) break;

        // B. Exact/Close Match Strategies

        // 1. Exact filename match (case-insensitive)
        if (nameWithoutExt.toLowerCase() === rapper.name.toLowerCase()) {
            foundImage = file;
            break;
        }

        // 2. Snake_case match (Young Coco -> young_coco)
        const snakeName = rapper.name.replace(/\s+/g, '_').toLowerCase();
        if (nameWithoutExt.toLowerCase() === snakeName) {
            foundImage = file;
            break;
        }

        // 3. Clean match (T-Pablow -> tpablow vs tpablow)
        // ONLY if length > 2 to avoid accidental short matches
        if (rapperNameNormEn.length > 2) {
            const fileNorm = normalizeEn(nameWithoutExt);
            if (fileNorm === rapperNameNormEn) {
                foundImage = file;
                break;
            }
        }

        // 4. Japanese strict match (ignore space/dots)
        if (rapperNameNormJp.length > 0) {
            const fileNormJp = normalizeJp(nameWithoutExt);
            if (fileNormJp === rapperNameNormJp) {
                foundImage = file;
                break;
            }
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


console.log(`\nReverted ${revertedCount} incorrect links.`);
console.log(`Synced ${updatedCount} profiles with images.`);

// Report unused
const unused = imageFiles.filter(f => !matchedImages.has(f));
if (unused.length > 0) {
    console.log('\n--- Unused Images ---');
    unused.forEach(f => console.log(f));
}

// Save
fs.writeFileSync(rappersPath, JSON.stringify(rappersData, null, 4), 'utf8');
console.log('\nSaved changes to rappers.json');
