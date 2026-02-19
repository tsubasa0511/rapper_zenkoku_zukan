
const fs = require('fs');
const path = require('path');

const rappersPath = path.join(__dirname, '../src/data/rappers.json');
const rappersData = JSON.parse(fs.readFileSync(rappersPath, 'utf8'));

// Determine ID start
const currentIds = rappersData.map(r => parseInt(r.id)).filter(id => !isNaN(id));
let nextId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;

const newRappers = [
    { name: 'ShowyRENZO', region: '茨城県', bio: '茨城・神栖出身。Showy。' },
    { name: 'ShowyVICTOR', region: '茨城県', bio: '茨城・神栖出身。Showy。' },
    { name: 'Young Coco', region: '兵庫県', bio: '兵庫・西宮出身。' }
];

const existingNames = new Set(rappersData.map(r => r.name.toLowerCase()));
let addedCount = 0;

newRappers.forEach(rapper => {
    if (existingNames.has(rapper.name.toLowerCase())) {
        console.log(`Skipping existing: ${rapper.name}`);
        return;
    }

    const newRapper = {
        id: String(nextId++),
        name: rapper.name,
        region: rapper.region,
        tags: ["New Entry"],
        bio: rapper.bio,
        discography: [],
        social: {},
        image: `https://placehold.co/600x400/18181b/a1a1aa?text=${encodeURIComponent(rapper.name)}`
    };

    rappersData.push(newRapper);
    addedCount++;
    console.log(`Added: ${rapper.name} (${rapper.region})`);
});

if (addedCount > 0) {
    fs.writeFileSync(rappersPath, JSON.stringify(rappersData, null, 4), 'utf8');
    console.log(`Successfully added ${addedCount} rappers.`);
} else {
    console.log('No new rappers added.');
}
