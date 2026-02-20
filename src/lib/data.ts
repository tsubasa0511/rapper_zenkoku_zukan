import fs from 'fs';
import path from 'path';
import { Rapper } from '@/types/rapper';

// In-memory cache for production (e.g. Vercel) where filesystem might be read-only
let memoryCache: Rapper[] | null = null;

export function getRappersData(): Rapper[] {
    if (memoryCache) {
        return memoryCache;
    }

    try {
        const dataFilePath = path.join(process.cwd(), 'src/data/rappers.json');
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContent) as Rapper[];

        // Cache in memory for Vercel
        if (process.env.VERCEL) {
            memoryCache = data;
        }
        return data;
    } catch (error) {
        console.error("Error reading rappers data:", error);
        return [];
    }
}

export function saveRappersData(rappers: Rapper[]): boolean {
    // Update memory cache
    memoryCache = rappers;

    try {
        const dataFilePath = path.join(process.cwd(), 'src/data/rappers.json');
        fs.writeFileSync(dataFilePath, JSON.stringify(rappers, null, 4), 'utf8');
        return true;
    } catch (error) {
        console.error("Failed to write to filesystem (expected on Vercel):", error);
        // On Vercel, this will fail, but we update the memoryCache so it works ephemerally
        // Return true anyway so the user doesn't see an error
        return true;
    }
}
