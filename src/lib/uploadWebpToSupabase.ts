import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Converts a File object (PNG, JPG, etc.) into a WebP Blob in the browser.
 */
async function convertToWebP(file: File, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(img.src);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('WebP conversion failed'));
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = (error) => reject(error);
  });
}

/**
 * Converts an image to WebP and uploads it to Supabase Storage.
 * 
 * Priority for bucket selection:
 * 1. Explicitly passed `bucket` argument
 * 2. `process.env.NEXT_PUBLIC_SUPABASE_BUCKET`
 * 3. Default fallback: 'prawez.com'
 * 
 * @param file The image file selected by the user
 * @param bucket Optional Supabase Storage bucket name
 * @param path Optional subfolder path inside the bucket
 * @returns Public URL of the uploaded image
 */
export async function uploadWebpToSupabase(
  file: File,
  bucket?: string,
  path: string = 'seo'
): Promise<string> {
  // Determine bucket: passed parameter -> env variable -> default fallback
  const activeBucket =
    bucket || process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'prawez-com';

  // 1. Convert File to WebP Blob
  const webpBlob = await convertToWebP(file, 0.85);

  // 2. Generate a clean unique filename
  const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '-');
  const fileName = `${path}/${Date.now()}-${cleanName}.webp`;

  // 3. Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(activeBucket)
    .upload(fileName, webpBlob, {
      contentType: 'image/webp',
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase Upload Error: ${error.message}`);
  }

  // 4. Retrieve and return the public URL
  const { data: publicUrlData } = supabase.storage
    .from(activeBucket)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}