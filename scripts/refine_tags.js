
const fs = require('fs');
const path = require('path');

const rappersPath = path.join(__dirname, '../src/data/rappers.json');
const rappersData = JSON.parse(fs.readFileSync(rappersPath, 'utf8'));

// Tag Mapping Rules
const tagMapping = {
    // Genres
    'Trap': 'Trap',
    'Drill': 'Drill',
    'Boom Bap': 'Boom Bap',
    'Boombap': 'Boom Bap',
    'Melodic': 'Melodic',
    'West Coast': 'West Coast',
    'Reggae': 'Reggae',
    'Reggae vibe': 'Reggae',
    'R&B': 'R&B',
    'Rock': 'Rock',
    'Jersey Club': 'Club',
    'Club': 'Club',
    'Grime': 'Grime',
    'Phonk': 'Phonk',
    'Rage': 'Rage',
    'Cloud Rap': 'Cloud Rap',
    'Jazz Rap': 'Jazz Rap',
    'Jazzy': 'Jazz Rap',
    'UK Garage': 'UK Garage',
    'Hyperpop': 'Hyperpop',

    // Vibes / Styles
    'Skill': 'Lyrical',
    'Skillful': 'Lyrical',
    'Lyricist': 'Lyrical',
    'Flow': 'Technical',
    'Fast': 'Technical',
    'Chill': 'Chill',
    'Chilled': 'Chill',
    'Emotional': 'Emotional',
    'Emo': 'Emotional',
    'Dark': 'Dark',
    'Conscious': 'Conscious',
    'Political': 'Conscious',
    'Love': 'Love Song',
    'Funny': 'Comedy',
    'Humorous': 'Comedy',
    'Gal': 'Gal',
    'Kawaii': 'Kawaii',
    'Hard': 'Hard',
    'Gangsta': 'Gangsta',
    'Outlaw': 'Gangsta',
    'Street': 'Street',
    'Real': 'Real',
    'Dope': 'Dope',
    'Cool': 'Stylish',
    'Fashionable': 'Stylish',
    'Unique': 'Unique',
    'Artistic': 'Artistic',
    'Pop': 'Pop',
    'Mainstream': 'Mainstream',
    'Underground': 'Underground',

    // Status / Era
    'Legend': 'Legend',
    'OG': 'OG',
    'New Wave': 'New Wave',
    'Rookie': 'New Wave',
    'Superstar': 'Star',
    'Star': 'Star',
    'Rapstar Winner': 'Rapstar Champion',
    'Rapstar Champion': 'Rapstar Champion',
    'Rapstar Finalist': 'Rapstar Finalist',

    // Crews / Labels / Events
    'BAD HOP': 'BAD HOP',
    'KANDYTOWN': 'KANDYTOWN',
    'YENTOWN': 'YENTOWN',
    'CreativeDrugStore': 'CreativeDrugStore',
    'Mall Boyz': 'Mall Boyz',
    'BMSG': 'BMSG',
    'Summit': 'Summit',
    '9Sari': '9Sari',
    'UMB': 'MC Battle',
    'KOK': 'MC Battle',
    'Battle': 'MC Battle',
    'Freestyle': 'MC Battle',
    'High School': 'High School Rap',
    'POP YOURS': 'POP YOURS',
    'AH1': 'AH1',
    'STARZ': 'STARZ',

    // Ignore / Remove
    'New Entry': null, // Removing this as it's not a permanent category
    'Local': null,
    'Nagoya': null, // Region is already set
    'Yokohama': null,
    'Kawasaki': null,
    'Shonan': null,
    'Himeji': null,
    'Okinawa': null,
    'Tokyo': null,
    'Osaka': null,
    'Sagamihara': null,
    'Fujisawa': null,
    'Mukaijima': null,
    'Ikuno': null,
    'Suminoe': null,
    'Kobe': null,
    'Amagasaki': null,
    'Tsuyama': null,
    'Asahikawa': null,
    'Sendai': null,
    'Mito': null,
    'Kumagaya': null,
    'Nagasaki': null,
    'Oji': null,
    'Katsushika': null,
    'Kyushu': null,
    'Numazu': null,
    'Chiryu': null,
    'Suzuka': null,
    'Toyonaka': null,
    'West Osaka': null,
    'Nishinari': null,
    'Oyakofuko': null,
    'Kanagawa': null,

    'Male': null,
    'Female': 'Female',
    'Group': 'Group',

    // Misc
    'Producer': 'Producer',
    'Singer': 'Singer',
    'Actor': 'Actor',
    'Model': 'Model',
    'CEO': 'CEO'
};

// Known Artist Specific Fixes (manual overrides for clear genres)
const artistTags = {
    'BAD HOP': ['Trap', 'Gangsta', 'BAD HOP'],
    'YZERR': ['Trap', 'Lyrical', 'BAD HOP'],
    'T-Pablow': ['Trap', 'Lyrical', 'BAD HOP'],
    'Benjazzy': ['Drill', 'Skill', 'BAD HOP'],
    'Tiji Jojo': ['Melodic', 'BAD HOP'],
    'Yellow Pato': ['Melodic', 'BAD HOP'],

    'KANDYTOWN': ['Boom Bap', 'City Pop', 'KANDYTOWN'],
    'IO': ['Boom Bap', 'Stylish', 'KANDYTOWN'],
    'KEIJU': ['Melodic', 'Pop', 'KANDYTOWN'],
    'Holly Q': ['Boom Bap', 'KANDYTOWN'],
    'Gottz': ['Trap', 'KANDYTOWN'],

    'BIM': ['Chill', 'Lyrical', 'CreativeDrugStore'],
    'VaVa': ['Producer', 'Chill', 'CreativeDrugStore'],
    'in-d': ['Chill', 'CreativeDrugStore'],

    'LEX': ['New Wave', 'Hyperpop', 'Melodic'],
    'Only U': ['New Wave', 'Hyperpop'],
    'Hezron': ['Trap', 'Melodic'],
    'ShowyRENZO': ['Trap', 'Showy'],
    'ShowyVICTOR': ['Trap', 'Showy'],

    'Tohji': ['New Wave', 'Mall Boyz', 'Hyperpop'],
    'Gummyboy': ['New Wave', 'Mall Boyz'],

    'JP THE WAVY': ['Trap', 'Fashionable', 'Dance'],
    'Eyden': ['Trap', 'Drill', 'Rapstar Champion'],
    'Watson': ['Lyrical', 'Real', '德島'],

    'Bonbero': ['Drill', 'Technical', 'Lyrical'],
    'LANA': ['R&B', 'Female', 'Pop'],
    'MaRI': ['Gangsta', 'Female', 'Trap'],

    'Awich': ['Queen', 'Trap', 'YENTOWN'],
    'kZm': ['Alternative', 'Trap', 'YENTOWN'],
    'PETZ': ['Trap', 'Cloud Rap', 'YENTOWN'],

    'Ralph': ['Grime', 'Drill', 'Hard'],

    'ZORN': ['Lyrical', 'Boom Bap', 'Family'],
    'ANARCHY': ['Gangsta', 'Legend', 'Kyoto'],
    'KREVA': ['Legend', 'Pop', 'Start'],
    'AK-69': ['Legend', 'Gangsta', 'Nagoya'],

    'Skaai': ['Lyrical', 'Academic'],
    'Bose (Scha Dara Parr)': ['Legend', 'Old School'],

    'Punpee': ['Producer', 'Alternative', 'Summit'],
    'BIM': ['Chill', 'CreativeDrugStore'],

    'Campanella': ['Alternative', 'Artistic'],
    'Kid Fresino': ['Alternative', 'Stylish'],
    'JJJ': ['Producer', 'Boom Bap'],
    'Febb': ['Legend', 'Boom Bap'],

    'Kohh': ['Legend', 'Trap', 'Artistic'],
    '千葉雄喜': ['Team Tomodachi', 'Trap', 'Viral'],

    'JUMADIBA': ['Alternative', 'Drill'],
    'ralph': ['Grime', 'Drill'],
    'Hideyoshi': ['Emo', 'Melodic'],

    'Jin Dogg': ['Sad Mad Pure', 'Dirt', 'Hifumi'],
    'Red Eye': ['Reggae', 'Trap', 'High School Rap'],
    'D.O': ['Gangsta', '9Sari', 'Legend'],
    'Kan a.k.a. Gami': ['Gangsta', '9Sari', 'Legend'],

    'Miyachi': ['Global', 'Technical'],
    'Week Dudus': ['Fast', 'Technical'],
    'Shurkn Pap': ['Melodic', 'Himeji'],

    'Leon Fanourakis': ['Trap', 'Hard'],
    'Santaworldview': ['Trap', 'Technical'],

    'WILYWNKA': ['Hentai Shinshi', 'Mainstream'],
    'VIGORMAN': ['Reggae', 'Melodic', 'Hentai Shinshi']
};

rappersData.forEach(rapper => {
    let newTags = new Set();

    // 1. Apply existing tag mappings
    rapper.tags.forEach(tag => {
        const mapped = tagMapping[tag];
        if (mapped) {
            newTags.add(mapped);
        } else if (mapped === undefined) {
            // Keep tags that aren't explicitly nullified or mapped
            // But try to avoid "New Entry" if it wasn't caught
            if (tag !== 'New Entry' && tag !== 'New Entry ') {
                newTags.add(tag);
            }
        }
    });

    // 2. Apply Manual Artist Overrides (Additively)
    // Check strict name match or fuzzy
    const override = Object.entries(artistTags).find(([k, v]) =>
        k.toLowerCase() === rapper.name.toLowerCase()
    );

    if (override) {
        override[1].forEach(t => newTags.add(t));
    }

    // 3. Fallbacks / Cleanup
    // If no tags left (e.g. only had 'New Entry'), add 'Rapper' or 'New Entry' back?
    // User wants fine grain.
    if (newTags.size === 0) {
        newTags.add('Rapper');
    }

    // Convert back to array
    rapper.tags = Array.from(newTags);
});

fs.writeFileSync(rappersPath, JSON.stringify(rappersData, null, 4), 'utf8');
console.log('Successfully refined tags for ' + rappersData.length + ' rappers.');
