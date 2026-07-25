import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { cmsService } from '@/services/api/endpoints';

// --- CONFIGURATION ---
const BLACKLIST = ['/success', '/thank-you', '/404', '/error', '/(admin)/dashboard', '/(auth)/*', '/api', '/private'];
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';



// 1. Force Next.js to run this dynamically on first request after app restart
export const dynamic = 'force-dynamic';

// 2. Set 24-hour cache revalidation (86,400 seconds)
export const revalidate = 86400;

// Define the interface for items returned from your database
interface ItemPayload {
    slug: string;
    updatedAt?: Date | string;
}
/**
 * Automatically crawls the (client) directory to find all static pages.
 */
function getClientRoutes(dir: string, baseRoute = ''): string[] {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) return [];

    const files = fs.readdirSync(fullPath);
    let routes: string[] = [];

    files.forEach((file) => {
        const filePath = path.join(fullPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            // 1. Handle Route Groups (skip the name in the URL)
            if (file.startsWith('(') && file.endsWith(')')) {
                routes = [...routes, ...getClientRoutes(path.join(dir, file), baseRoute)];
            }
            // 2. Handle standard folders
            else if (!file.startsWith('_') && !file.startsWith('[') && file !== 'api') {
                const currentRoute = `${baseRoute}/${file}`;

                // Only add if the folder contains a page.tsx/js
                if (fs.existsSync(path.join(filePath, 'page.tsx')) || fs.existsSync(path.join(filePath, 'page.js'))) {
                    if (!BLACKLIST.includes(currentRoute)) {
                        routes.push(currentRoute);
                    }
                }
                // Recurse into subdirectories
                routes = [...routes, ...getClientRoutes(path.join(dir, file), currentRoute)];
            }
        }
    });

    return routes;
}



// Map each entity type to its direct database query function
const resourceDataFetchers: Record<string, () => Promise<ItemPayload[]>> = {

    services: async () => {
        try {
            // Fetch published services directly from Supabase via cmsService
            const data = await cmsService.servicesSitemapGenerator();

            if (!data || data.length === 0) return [];

            // Map Supabase rows to sitemap payload format
            return data.map((item: any) => ({
                slug: item.slug,
                updatedAt: item.updated_at,
            }));
        } catch (error) {
            console.error('Sitemap fetch error (services):', error);
            return [];
        }
    },

};

// Control active dynamic entities here
const ACTIVE_RESOURCES: (keyof typeof resourceDataFetchers)[] = [
    'services',
    // 'blogs',
];

/**
 * Main Sitemap Function
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // --- 1. GET STATIC PAGES ---
    // We point it specifically at the (client) group
    const clientPaths = getClientRoutes('src/app/(client)');

    const staticEntries: MetadataRoute.Sitemap = clientPaths.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Add the root homepage
    staticEntries.push({
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
    });



    // --- 2. GET DYNAMIC ENTRIES FROM CMS SERVICES ---
    const dynamicResults = await Promise.allSettled(
        ACTIVE_RESOURCES.map(async (resourceKey) => {
            const fetcher = resourceDataFetchers[resourceKey];
            if (!fetcher) return [];

            const items = await fetcher();

            return items.map((item) => ({
                url: `${BASE_URL}/${resourceKey}/${item.slug}`,
                lastModified: new Date(item.updatedAt || new Date()),
                changeFrequency: 'daily' as const, // 24-hour cycle standard
                priority: 0.8,
            }));
        })
    );

    const dynamicEntries: MetadataRoute.Sitemap = dynamicResults.flatMap((result) =>
        result.status === 'fulfilled' ? result.value : []
    );

    return [...staticEntries, ...dynamicEntries];
}