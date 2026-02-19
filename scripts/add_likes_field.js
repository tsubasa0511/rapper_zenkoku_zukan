const fs = require('fs');
const path = require('path');

const rappersPath = path.join(__dirname, '../src/data/rappers.json');
const rappers = JSON.parse(fs.readFileSync(rappersPath, 'utf8'));

const updatedRappers = rappers.map(rapper => {
    if (typeof rapper.likes === 'undefined') {
        return {
            ...rapper,
            likes: 0
        };
    }
    return rapper;
});

fs.writeFileSync(rappersPath, JSON.stringify(updatedRappers, null, 4), 'utf8');

console.log(`Updated ${updatedRappers.length} rappers with 'likes' field.`);
