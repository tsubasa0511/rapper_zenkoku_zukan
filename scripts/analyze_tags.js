
const fs = require('fs');
const path = require('path');

const rappersPath = path.join(__dirname, '../src/data/rappers.json');
const rappersData = JSON.parse(fs.readFileSync(rappersPath, 'utf8'));

const tagCounts = {};
const allTags = new Set();

rappersData.forEach(rapper => {
    rapper.tags.forEach(tag => {
        allTags.add(tag);
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
});

console.log('--- Unique Tags and Counts ---');
Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .forEach(([tag, count]) => {
        console.log(`${tag}: ${count}`);
    });

console.log(`\nTotal Rappers: ${rappersData.length}`);
console.log(`Total Unique Tags: ${allTags.size}`);
