export type ProductType = 'website' | 'web_app' | 'mobile_app' | 'desktop_app';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type DownloadPlatform =
  | 'android'
  | 'ios'
  | 'huawei'
  | 'windows'
  | 'macos'
  | 'linux'
  | 'other';

export interface ProductDownload {
  id: string;
  product_id: string;
  platform: DownloadPlatform;
  label: string | null;
  url: string;
  version: string | null;
  sort_order: number;
}

export interface ProductScreenshot {
  id: string;
  product_id: string;
  image_url: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  details_html: string;
  product_type: ProductType;
  status: ProductStatus;
  live_url: string | null;
  thumbnail_url: string | null;
  thumbnail_path: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[];
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  no_index: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  downloads: ProductDownload[];
  screenshots: ProductScreenshot[];
}

export type ProductListItem = Pick<
  Product,
  | 'id'
  | 'slug'
  | 'title'
  | 'short_description'
  | 'product_type'
  | 'status'
  | 'thumbnail_url'
  | 'updated_at'
>;

export const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'website', label: 'Website' },
  { value: 'web_app', label: 'Web application' },
  { value: 'mobile_app', label: 'Mobile app' },
  { value: 'desktop_app', label: 'Desktop app' },
];

export const PRODUCT_STATUSES: { value: ProductStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

export const MOBILE_PLATFORMS: { value: DownloadPlatform; label: string }[] = [
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
  { value: 'huawei', label: 'Huawei AppGallery' },
  { value: 'other', label: 'Other' },
];

export const DESKTOP_PLATFORMS: { value: DownloadPlatform; label: string }[] = [
  { value: 'windows', label: 'Windows' },
  { value: 'macos', label: 'macOS' },
  { value: 'linux', label: 'Linux' },
  { value: 'other', label: 'Other' },
];

export const isWebType = (t: ProductType) => t === 'website' || t === 'web_app';
export const isAppType = (t: ProductType) => t === 'mobile_app' || t === 'desktop_app';

/** Groups types by which kind of distribution UI they use. */
export const platformKind = (t: ProductType): 'web' | 'mobile' | 'desktop' =>
  t === 'mobile_app' ? 'mobile' : t === 'desktop_app' ? 'desktop' : 'web';

export const platformsFor = (t: ProductType) =>
  t === 'mobile_app' ? MOBILE_PLATFORMS : t === 'desktop_app' ? DESKTOP_PLATFORMS : [];

export const typeLabel = (t: ProductType) =>
  PRODUCT_TYPES.find((x) => x.value === t)?.label ?? t;

export const platformLabel = (p: DownloadPlatform) =>
  [...MOBILE_PLATFORMS, ...DESKTOP_PLATFORMS].find((x) => x.value === p)?.label ?? p;