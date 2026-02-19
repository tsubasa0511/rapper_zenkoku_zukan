'use server';

import fs from 'fs';
import path from 'path';
import { Rapper } from '@/types/rapper';

// Use process.cwd() to get the root directory in Next.js
const dataFilePath = path.join(process.cwd(), 'src/data/rappers.json');

export async function incrementLike(rapperId: string) {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const rappers: Rapper[] = JSON.parse(fileContent);

        const updatedRappers = rappers.map((rapper) => {
            if (rapper.id === rapperId) {
                return { ...rapper, likes: (rapper.likes || 0) + 1 };
            }
            return rapper;
        });

        fs.writeFileSync(dataFilePath, JSON.stringify(updatedRappers, null, 4), 'utf8');
        return { success: true };
    } catch (error) {
        console.error('Failed to update likes:', error);
        return { success: false, error: 'Failed to update likes' };
    }
}

export async function registerRapper(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const region = formData.get('region') as string;
        const bio = formData.get('bio') as string;
        const tagsString = formData.get('tags') as string;
        const tags = tagsString.split(',').map(t => t.trim()).filter(t => t);

        const youtube = formData.get('youtube') as string;
        const twitter = formData.get('twitter') as string;
        const instagram = formData.get('instagram') as string;

        if (!name || !region || !bio) {
            return { success: false, error: 'Name, Region, and Bio are required.' };
        }

        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const rappers: Rapper[] = JSON.parse(fileContent);

        const newId = (rappers.length + 1).toString();

        const newRapper: Rapper = {
            id: newId,
            name,
            region,
            tags,
            bio,
            discography: [], // Init empty
            social: {
                youtube: youtube || undefined,
                twitter: twitter || undefined,
                instagram: instagram || undefined
            },
            image: undefined, // Placeholder will be used
            likes: 0
        };

        rappers.push(newRapper);

        fs.writeFileSync(dataFilePath, JSON.stringify(rappers, null, 4), 'utf8');
        return { success: true, id: newId };

    } catch (error) {
        console.error('Failed to register rapper:', error);
        return { success: false, error: 'Failed to register rapper' };
    }
}
