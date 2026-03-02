import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// --- CONFIGURATION ---
const BLACKLIST = ['/success', '/thank-you', '/404', '/error', '/(admin)/dashboard', '/(auth)/*', '/api', '/private'];
const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

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

    // --- 2. GET DYNAMIC PRODUCTS ---
    let dynamicEntries: MetadataRoute.Sitemap = [];

    // try {
    //     // Replace this URL with your actual API endpoint or database fetch logic
    //     const res = await fetch(`${BASE_URL}/api/products`, {
    //         next: { revalidate: 3600 } // Cache for 1 hour
    //     });

    //     if (res.ok) {
    //         const products = await res.json();
    //         dynamicEntries = products.map((product: any) => ({
    //             url: `${BASE_URL}/products/${product.slug}`,
    //             lastModified: new Date(product.updatedAt || new Date()),
    //             changeFrequency: 'daily',
    //             priority: 0.8,
    //         }));
    //     }
    // } catch (error) {
    //     console.error("Sitemap dynamic fetch error:", error);
    //     // If fetch fails, we still return the static pages we found
    // }

    return [...staticEntries, ...dynamicEntries];
}