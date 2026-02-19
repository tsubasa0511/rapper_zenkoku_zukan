
const fs = require('fs');
const path = require('path');

const rappersPath = path.join(__dirname, '../src/data/rappers.json');
const rappersData = JSON.parse(fs.readFileSync(rappersPath, 'utf8'));

const rapperName = 'eyden'; // Case-insensitive match target
const targetImage = '/images/rappers/eyden.jpg'; // Path confirmed earlier

const index = rappersData.findIndex(r => r.name.toLowerCase() === rapperName.toLowerCase());

if (index !== -1) {
    console.log(`Found existing: ${rappersData[index].name} (ID: ${rappersData[index].id})`);
    console.log(`Current Image: ${rappersData[index].image}`);

    // Update image
    rappersData[index].image = targetImage;

    fs.writeFileSync(rappersPath, JSON.stringify(rappersData, null, 4), 'utf8');
    console.log(`Successfully updated image to: ${targetImage}`);
} else {
    console.log(`Rapper ${rapperName} not found.`);
}
