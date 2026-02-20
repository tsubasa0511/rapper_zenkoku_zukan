'use server';

import { Rapper } from '@/types/rapper';
import { revalidatePath } from 'next/cache';
import { getRappersData, saveRappersData } from '@/lib/data';

export async function incrementLike(rapperId: string) {
    try {
        const rappers = getRappersData();

        let updated = false;
        const updatedRappers = rappers.map((rapper) => {
            if (rapper.id === rapperId) {
                updated = true;
                return { ...rapper, likes: (rapper.likes || 0) + 1 };
            }
            return rapper;
        });

        if (!updated) {
            console.error(`Rapper with ID ${rapperId} not found.`);
            return { success: false, error: 'Rapper not found' };
        }

        saveRappersData(updatedRappers);

        // Revalidate all pages to show new like count
        revalidatePath('/', 'layout');

        return { success: true };
    } catch (error) {
        console.error('Failed to update likes:', error);
        return { success: false, error: String(error) };
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

        const rappers = getRappersData();

        const maxId = rappers.reduce((max, r) => Math.max(max, parseInt(r.id) || 0), 0);
        const newId = (maxId + 1).toString();

        const newRapper: Rapper = {
            id: newId,
            name,
            region,
            tags,
            bio,
            discography: [],
            social: {
                youtube: youtube || undefined,
                twitter: twitter || undefined,
                instagram: instagram || undefined
            },
            image: undefined,
            likes: 0
        };

        const updatedRappers = [...rappers, newRapper];

        saveRappersData(updatedRappers);

        revalidatePath('/', 'layout');

        return { success: true, id: newId };

    } catch (error) {
        console.error('Failed to register rapper:', error);
        return { success: false, error: 'Failed to register rapper' };
    }
}
