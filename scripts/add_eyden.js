
const fs = require('fs');
const path = require('path');

const rappersPath = path.join(__dirname, '../src/data/rappers.json');
const rappersData = JSON.parse(fs.readFileSync(rappersPath, 'utf8'));

// Determine ID start
const currentIds = rappersData.map(r => parseInt(r.id)).filter(id => !isNaN(id));
let nextId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;

const existingNames = new Set(rappersData.map(r => r.name.toLowerCase()));

const rapperName = 'eyden';
const rapperRegion = '千葉県'; // Chiba in Japanese
const rapperImage = '/images/rappers/eyden.jpg'; // Path confirmed earlier

if (existingNames.has(rapperName.toLowerCase())) {
    console.log(`Skipping existing: ${rapperName}`);
    // Optional: Update image if it exists but image path is different?
    // For now just skip.
} else {
    const newRapper = {
        id: String(nextId),
        name: 'eyden',
        region: rapperRegion,
        tags: ["New Entry"],
        bio: '千葉・袖ケ浦出身。ラップスタア誕生2021王者。',
        discography: [],
        social: {},
        image: rapperImage
    };

    rappersData.push(newRapper);
    fs.writeFileSync(rappersPath, JSON.stringify(rappersData, null, 4), 'utf8');
    console.log(`Successfully added ${rapperName} (${rapperRegion}) with image ${rapperImage}`);
}
