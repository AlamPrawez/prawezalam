import { MessagePayload } from "@/@types/ message";
import { FullPagePayload } from "@/@types/cms";
import { PageBuilderValues } from "@/app/(dashboard)/manager/blogs/types";
import { supabase } from "@/lib/supabase";
import { Message } from "react-hook-form";

import type { PostgrestError } from '@supabase/supabase-js';

import type {
  DownloadPlatform,
  Product,
  ProductListItem,
  ProductStatus,
  ProductType,
} from '@/@types/product';

export type UserRole = 'admin' | 'manager' | 'editor' | 'viewer';

export type HireTask = {
    id: number;
    email: string;
    phone: string;
    country: string;
    budget: number;
    duration_value: number;
    duration_unit: string;
    created_at: string;
    status?: string;
};

type FetchResult<T> = {
    data: T | null;
    error: string | null;
};

export type HireTaskPayload = {
    title: string;
    email: string;
    phone: string;
    country: string;
    budget: number;
    durationValue: number;
    durationUnit: "hours" | "days" | "weeks";
    description: string;
};

export default class Auth {


    signUp = async (payload: {
        email: string;
        password: string;
        name?: string;
    }) => {
        const { data, error } = await supabase.auth.signUp({
            email: payload.email.trim().toLowerCase(),
            password: payload.password,
        });

        if (error) {
            return { error: error.message };
        }

        // console.log(data)

        // optional profile update
        // if (payload.name && data.user) {
        //     await supabase
        //         .from("users")
        //         .update({ name: payload.name })
        //         .eq("id", data.user.id);
        // }

        return { data: data.user };
    };


    signIn = async (
        payload: { email: string; password: string }
    ): Promise<{
        user?: any;
        session?: any;
        error?: string | null;
    }> => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: payload.email.trim().toLowerCase(),
            password: payload.password,
        });

        if (error) {
            console.log("Login error:", error.message);
            return { user: null, session: null, error: error.message };
        }

        // --- NEW: Fetch the user's role from your profiles table ---
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

        if (profileError) {
            console.log("Profile fetch error:", profileError.message);
            // Fallback or return error if a profile is absolutely required
        }

        return {
            // We attach the role to the user object so the frontend can read it
            user: { ...data.user, role: profile?.role || 'user' },
            session: data.session,
            error: null,
        };
    };
    // signIn = async (
    //     payload: { email: string; password: string }
    // ): Promise<{
    //     user?: any;
    //     session?: any;
    //     error?: string | null;

    // }> => {

    //     const { data, error } = await supabase.auth.signInWithPassword({
    //         email: payload.email.trim().toLowerCase(),
    //         password: payload.password,
    //     });

    //     if (error) {
    //         console.log("Login error:", error.message);
    //         return {
    //             user: null,
    //             session: null,
    //             error: error.message, // Pass the actual error message here
    //         };
    //     }

    //     return {
    //         user: data.user,
    //         session: data.session,
    //         error: null,
    //     };



    // };

    signOut = async (): Promise<{
        success?: boolean | false;
        error?: any | null;
    }> => {

        const { error } = await supabase.auth.signOut();
        if (error) {
            return {
                error: null,
            };
        }

        return {
            success: true,
        };



    }
}

export const authentication = new Auth();

export class Orders {

    hireTask = async (
        data: HireTaskPayload
    ): Promise<FetchResult<HireTask[]>> => {
        try {
            const { data: result, error } = await supabase
                .from("hire_tasks")
                .insert({
                    title: data.title,
                    email: data.email,
                    phone: data.phone,
                    country: data.country,
                    budget: data.budget,
                    duration_value: data.durationValue,
                    duration_unit: data.durationUnit,
                    description: data.description,
                })
                .select()
                .single();

            if (error) {
                return { data: null, error: error.message };
            }

            return { data: result, error: null };
        } catch (err: any) {
            return { data: null, error: err.message ?? "Something went wrong" };
        }
    }

    fetchOrder = async (): Promise<{ data: any[] | null; error: string | null }> => {
        const { data, error } = await supabase
            .from("hire_tasks")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            return {
                data: null,
                error: error.message,
            };
        }

        return {
            data: data || [],
            error: null,
        };
    };

    orderDetails = async (id: number): Promise<{ data: any; error: string | null }> => {
        try {
            const { data, error } = await supabase
                .from('hire_tasks')       // replace with your table name
                .select('*')
                .eq('id', id)
                .single();            // returns a single object instead of an array

            if (error) throw error;

            return { data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message || 'Something went wrong' };
        }
    };


    deleteOrder = async (id: number): Promise<{ data: any | null; error: any | null }> => {
        const { data, error } = await supabase
            .from("hire_tasks")
            .delete()
            .eq("id", id);

        if (error) {
            return { data: null, error: error };
        }

        return { data, error: null };
    };

    updateOrderStatus = async (
        id: number,
        status: "PENDING" | "APPROVED" | "PROGRESS" | "CANCELLED"
    ): Promise<{ data: any | null; error: any | null }> => {

        const { data, error } = await supabase
            .from("hire_tasks")      // your table name
            .update({ status })      // update status column
            .eq("id", id);           // filter by order id  
        if (error) {
            return { data: null, error };
        }

        return { data, error: null };
    };

}
export const orders = new Orders();

export class Contact {
    contactInquiries = async (
        payload: MessagePayload
    ): Promise<{ data: any | null; error: any | null }> => {

        const { data, error } = await supabase
            .from("contact_inquiries")
            .insert([payload]);

        if (error) {
            return { data: null, error };
        } else {
            return { data, error: null };
        }
    };

    fetchMessage = async (): Promise<{ data: any[] | null; error: string | null }> => {
        const { data, error } = await supabase
            .from("contact_inquiries")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            return {
                data: null,
                error: error.message,
            };
        }

        return {
            data: data || [],
            error: null,
        };
    };

}
export const contacts = new Contact()





export class CmsServiceRepository {

    public async getServiceBySlug(slug: string) {
        const { data, error } = await supabase
            .from('cms_services')
            .select('*, cms_service_details(*)')
            .eq('slug', slug)
            .single();

        if (error) return null;
        return data;
    }

    /**
     * Helper: Get the current authenticated user's role
     */
    public async getCurrentUserRole(): Promise<UserRole | null> {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (error || !data) return null;
        return data.role as UserRole;
    }

    /**
     * Helper: Guard check for Admin or Manager permissions
     */
    public async verifyManagementAccess(): Promise<void> {
        const role = await this.getCurrentUserRole();
        if (role !== 'admin' && role !== 'manager') {
            throw new Error('Unauthorized: Only Admins and Managers can perform this action.');
        }
    }


    /**
     * Fetch all services
     */
    public async servicesSitemapGenerator() {
        let query = supabase
            .from('cms_services')
            .select('id, slug, status, updated_at')
            .order('updated_at', { ascending: false });

        query = query.eq('status', 'Published');


        const { data, error } = await query;
        if (error) throw error;
        return data;
    }


    /**
     * Fetch all services
     */
    public async fetchServicesList() {
        const role = await this.getCurrentUserRole();
        const canViewDrafts = role === 'admin' || role === 'manager';

        let query = supabase
            .from('cms_services')
            .select('id, title, slug, status, updated_at, cms_service_details(hero,seo)')
            .order('updated_at', { ascending: false });

        if (!canViewDrafts) {
            query = query.eq('status', 'Published');
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    /**
     * Fetch single service with full details for editing
     */
    public async getServiceWithDetails(serviceId: string) {
        const { data, error } = await supabase
            .from('cms_services')
            .select('*, cms_service_details(*)')
            .eq('id', serviceId)
            .single();

        if (error) throw error;
        return data;
    }

    /**
     * Save / Upsert Service
     */
    public async saveService(
        payload: FullPagePayload,
        status: 'Draft' | 'Published' = 'Published',
        existingServiceId?: string
    ) {
        await this.verifyManagementAccess();

        const title = payload.seo?.title || payload.hero?.headline || 'Untitled Service';
        const slug = payload.seo?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // 1. Upsert List Entry (cms_services)
        const { data: service, error: serviceError } = await supabase
            .from('cms_services')
            .upsert(
                {
                    id: existingServiceId,
                    title,
                    slug,
                    status,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'slug' }
            )
            .select('id')
            .single();

        if (serviceError) throw serviceError;

        // 2. Upsert Details Entry (cms_service_details)
        const { error: detailsError } = await supabase
            .from('cms_service_details')
            .upsert(
                {
                    service_id: service.id,
                    seo: payload.seo,
                    hero: payload.hero,
                    services: payload.services,
                    process: (payload as any).process || {},
                    why_choose: (payload as any).whyChoose || {},
                    features_industries: (payload as any).features_industries || {},
                    why_work_with_me: (payload as any).whyWorkWithMe || {},
                    content_sections: payload.contentSections || [],
                    faqs: payload.faqs || [],
                    cta: (payload as any).cta || {},
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'service_id' }
            );

        if (detailsError) throw detailsError;

        return { success: true, serviceId: service.id };
    }

    /**
     * DELETE Service
     */
    public async deleteService(serviceId: string) {
        await this.verifyManagementAccess();

        const { error } = await supabase
            .from('cms_services')
            .delete()
            .eq('id', serviceId);

        if (error) throw error;

        return { success: true };
    }
}

export const cmsService = new CmsServiceRepository()




export class CmsBlogRepository {
    /**
     * Helper: Get current authenticated user's role
     */
    public async getCurrentUserRole(): Promise<UserRole | null> {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (error || !data) return null;
        return data.role as UserRole;
    }

    /**
     * Helper: Guard check for Admin or Manager permissions
     */
    public async verifyManagementAccess(): Promise<void> {
        const role = await this.getCurrentUserRole();
        if (role !== 'admin' && role !== 'manager') {
            throw new Error('Unauthorized: Only Admins and Managers can perform this action.');
        }
    }

    /**
     * Fetch blog by slug with details
     */
    public async getBlogBySlug(slug: string) {
        const { data, error } = await supabase
            .from('cms_blogs')
            .select('*, cms_blogs_details(*)')
            .eq('slug', slug)
            .single();

        if (error) return null;
        this.updateCount({ id: data.id }).catch((err) =>
            console.error('Failed to update view count', err)
        );
        return data;
    }

    /**
     * Fetch all blogs for sitemap generator
     */
    public async blogsSitemapGenerator() {
        const { data, error } = await supabase
            .from('cms_blogs')
            .select('id, slug, status, updated_at')
            .eq('status', 'published')
            .order('updated_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    /**
     * Fetch blogs list with details snippet based on access level
     */
    // public async fetchBlogsList() {
    //     const role = await this.getCurrentUserRole();
    //     const canViewDrafts = role === 'admin' || role === 'manager';

    //     let query = supabase
    //         .from('cms_blogs')
    //         .select('id, title, slug, status, views_count, seo, created_at, updated_at, cms_blogs_details(sections)')
    //         .order('updated_at', { ascending: false });

    //     if (!canViewDrafts) {
    //         query = query.eq('status', 'published');
    //     }

    //     const { data, error } = await query;
    //     if (error) throw error;
    //     return data;
    // }

    public async fetchBlogsList(limit?: number) {
        const role = await this.getCurrentUserRole();
        const canViewDrafts = role === 'admin' || role === 'manager';

        let query = supabase
            .from('cms_blogs')
            .select('id, title, slug, status, views_count, seo, created_at, updated_at, cms_blogs_details(sections)');

        if (!canViewDrafts) {
            query = query.eq('status', 'published');
        }

        if (limit) {
            // Limited fetch = "recent/news" view: newest-created first, capped to `limit`.
            query = query.order('created_at', { ascending: false }).limit(limit);
        } else {
            // Unlimited fetch = existing behavior, unchanged.
            query = query.order('updated_at', { ascending: false });
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    /**
     * Fetch single blog with full details for editing
     */
    public async getBlogWithDetails(blogId: string) {
        const { data, error } = await supabase
            .from('cms_blogs')
            .select('*, cms_blogs_details(*)')
            .eq('id', blogId)
            .single();

        if (error) throw error;

        
        return data;
    }

    public async updateCount(identifier: { id?: string; slug?: string }) {
        const { data, error } = await supabase.rpc('increment_blog_views', {
            p_id: identifier.id ?? null,
            p_slug: identifier.slug ?? null,
        });

        if (error) throw error;
        return data as number; // new views_count
    }
    /**
     * Save / Upsert Blog
     */
    // Inside CmsBlogRepository
    public async saveBlog(
        payload: PageBuilderValues,
        storedSections: any[],
        status: 'Draft' | 'Published' = 'Published',
        existingBlogId?: string
    ) {
        await this.verifyManagementAccess();

        const title = payload.title || 'Untitled Blog';
        const slug = payload.seo.slug || title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
        const seo = payload.seo;
        const formattedStatus = status.toLowerCase();

        // 1. Build the update/insert payload dynamically
        const blogPayload: Record<string, any> = {
            title,
            slug,
            seo,
            status: formattedStatus,
            updated_at: new Date().toISOString(),
        };

        // Only attach `id` if editing an existing record with a valid ID
        if (existingBlogId && existingBlogId.trim() !== '') {
            blogPayload.id = existingBlogId;
        }

        // 2. Upsert List Entry (cms_blogs) using 'id' when editing, or 'slug' when creating/updating by slug
        const { data: blog, error: blogError } = await supabase
            .from('cms_blogs')
            .upsert(
                blogPayload,
                { onConflict: existingBlogId ? 'id' : 'slug' }
            )
            .select('id')
            .single();

        if (blogError) throw blogError;

        // 3. Upsert Details Entry (cms_blogs_details)
        const { error: detailsError } = await supabase
            .from('cms_blogs_details')
            .upsert(
                {
                    cms_blogs_id: blog.id,
                    sections: storedSections,
                    bg_theme: payload.bgTheme || 'light', // Ensures bg_theme is preserved
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'cms_blogs_id' }
            );

        if (detailsError) throw detailsError;

        return { success: true, blogId: blog.id };
    }

    /**
     * DELETE Blog
     */
    public async deleteBlog(blogId: string) {
        await this.verifyManagementAccess();

        const { error } = await supabase
            .from('cms_blogs')
            .delete()
            .eq('id', blogId);

        if (error) throw error;

        return { success: true };
    }
}

export const cmsBlog = new CmsBlogRepository();



export interface ListParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: ProductStatus | 'all';
  type?: ProductType | 'all';
}
 
export interface SaveProductInput {
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
  downloads: {
    platform: DownloadPlatform;
    label: string | null;
    url: string;
    version: string | null;
    sort_order: number;
  }[];
  screenshots: {
    image_url: string;
    storage_path: string;
    alt_text: string | null;
    sort_order: number;
  }[];
}
 
export class CmsProductRepository {
  private static readonly BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'prawez-com';
  private static readonly FULL_SELECT =
    '*, details:product_details(*), downloads:product_downloads(*), screenshots:product_screenshots(*)';
 
  /**
   * Helper: Get current authenticated user's role
   */
  public async getCurrentUserRole(): Promise<string | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
 
    if (!user) return null;
 
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
 
    if (error || !data) return null;
    return data.role as string;
  }
 
  /**
   * Helper: Guard check for Admin or Manager permissions
   */
  public async verifyManagementAccess(): Promise<void> {
    const role = await this.getCurrentUserRole();
    if (role !== 'admin' && role !== 'manager') {
      throw new Error('Unauthorized: Only Admins and Managers can perform this action.');
    }
  }
 
  /**
   * Map Postgres / PostgREST errors to readable messages
   */
  private toError(error: PostgrestError): Error {
    if (error.code === '23505') return new Error('A product with this slug already exists. Choose a different slug.');
    if (error.code === '42501') return new Error('Unauthorized: Only Admins and Managers can perform this action.');
    if (error.code === '23514') {
      if (error.message.includes('products_web_requires_url')) {
        return new Error('Published websites and web apps need a live URL.');
      }
      return new Error(`A value failed validation: ${error.message}`);
    }
    return new Error(error.message || 'Something went wrong. Please try again.');
  }
 
  /**
   * Fetch paginated products list (CMS view, all statuses)
   */
  public async listProducts(params: ListParams): Promise<{ items: ProductListItem[]; total: number }> {
    await this.verifyManagementAccess();
 
    const { page, pageSize, search, status = 'all', type = 'all' } = params;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
 
    let query = supabase
      .from('products')
      .select(
        'id, slug, title, short_description, product_type, status, thumbnail_url, updated_at',
        { count: 'exact' }
      )
      .order('updated_at', { ascending: false })
      .range(from, to);
 
    if (status !== 'all') query = query.eq('status', status);
    if (type !== 'all') query = query.eq('product_type', type);
    if (search?.trim()) {
      const escaped = search.trim().replace(/[\\%_]/g, (c) => `\\${c}`);
      query = query.ilike('title', `%${escaped}%`);
    }
 
    const { data, error, count } = await query;
    if (error) throw this.toError(error);
    return { items: (data ?? []) as ProductListItem[], total: count ?? 0 };
  }
 
  /**
   * Fetch single product with downloads + screenshots for editing / viewing
   */
  public async getProduct(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select(CmsProductRepository.FULL_SELECT)
      .eq('id', id)
      .single();
 
    if (error) throw this.toError(error);
    return this.normalize(data);
  }

   /**
   * Public site: published products list (card columns only, newest first).
   * Optional `limit` for "latest products" blocks, optional `type` filter.
   */
  public async fetchProductsList(
    opts: { limit?: number; type?: ProductType | 'all' } = {}
  ): Promise<ProductListItem[]> {
    const { limit, type = 'all' } = opts;
 
    let query = supabase
      .from('products')
      .select('id, slug, title, short_description, product_type, status, thumbnail_url, updated_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
 
    if (type !== 'all') query = query.eq('product_type', type);
    if (limit) query = query.limit(limit);
 
    const { data, error } = await query;
    if (error) throw this.toError(error);
    return (data ?? []) as ProductListItem[];
  }
 
 
  /**
   * Public site: fetch a published product by slug (null if missing / not published)
   */
  public async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(CmsProductRepository.FULL_SELECT)
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();
 
    if (error || !data) return null;
    return this.normalize(data);
  }
 
  /**
   * Fetch all published products for the sitemap generator
   */
  public async productsSitemapGenerator() {
    const { data, error } = await supabase
      .from('products')
      .select('id, slug, status, updated_at')
      .eq('status', 'published')
      .eq('no_index', false)
      .order('updated_at', { ascending: false });
 
    if (error) throw this.toError(error);
    return data;
  }
 
  /**
   * Save / Upsert product (atomic: product + downloads + screenshots)
   */
  public async saveProduct(input: SaveProductInput): Promise<string> {
    await this.verifyManagementAccess();
 
    const { data, error } = await supabase.rpc('save_product', { payload: input });
    if (error) throw this.toError(error);
    return data as string;
  }
 
  /**
   * DELETE product (children cascade; storage files removed best-effort)
   */
  public async deleteProduct(id: string) {
    await this.verifyManagementAccess();
 
    const { data: existing } = await supabase
      .from('products')
      .select('thumbnail_path, screenshots:product_screenshots(storage_path)')
      .eq('id', id)
      .maybeSingle();
 
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw this.toError(error);
 
    const paths: string[] = [];
    if (existing?.thumbnail_path) paths.push(existing.thumbnail_path);
    for (const s of (existing?.screenshots ?? []) as { storage_path: string }[]) {
      if (s.storage_path) paths.push(s.storage_path);
    }
    await this.removeImages(paths);
 
    return { success: true };
  }
 
  /**
   * Upload an image to the product-assets bucket.
   * NOTE: this is the single place to swap in the blogs upload helper.
   */
  public async uploadImage(
    productId: string,
    file: File,
    folder: 'thumbnail' | 'screenshots'
  ): Promise<{ path: string; url: string }> {
    await this.verifyManagementAccess();
 
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const path = `products/${productId}/${folder}/${crypto.randomUUID()}.${ext}`;
 
    const { error } = await supabase.storage.from(CmsProductRepository.BUCKET).upload(path, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false,
    });
    if (error) throw new Error(`Image upload failed: ${error.message}`);
 
    const { data } = supabase.storage.from(CmsProductRepository.BUCKET).getPublicUrl(path);
    return { path, url: data.publicUrl };
  }
 
  /**
   * Best-effort cleanup. Never throws: orphaned files are harmless, a failed save is not.
   */
  public async removeImages(paths: string[]): Promise<void> {
    const unique = Array.from(new Set(paths.filter(Boolean)));
    if (unique.length === 0) return;
    try {
      await supabase.storage.from(CmsProductRepository.BUCKET).remove(unique);
    } catch {
      /* ignore */
    }
  }
 
  /**
   * Flatten the product_details row into the Product shape and sort children,
   * so components keep working with a single flat Product object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private normalize(raw: any): Product {
    const { details, ...base } = raw;
    const d = Array.isArray(details) ? details[0] : details;
 
    const product: Product = {
      ...base,
      details_html: d?.details_html ?? '',
      meta_title: d?.meta_title ?? null,
      meta_description: d?.meta_description ?? null,
      meta_keywords: d?.meta_keywords ?? [],
      canonical_url: d?.canonical_url ?? null,
      og_title: d?.og_title ?? null,
      og_description: d?.og_description ?? null,
      og_image_url: d?.og_image_url ?? null,
    };
    product.downloads = [...(base.downloads ?? [])].sort((a, b) => a.sort_order - b.sort_order);
    product.screenshots = [...(base.screenshots ?? [])].sort((a, b) => a.sort_order - b.sort_order);
    return product;
  }
}
 
export const cmsProduct = new CmsProductRepository();


// =====================================================================
// APPEND THIS to the same file that exports cmsBlog / cmsService /
// cmsProduct (it already imports `supabase`). Nothing else changes there.
// =====================================================================

export type ContentCounts = Pick<DashboardCounts, 'blogs' | 'services' | 'products'>;
export interface DashboardCounts {
    blogs: { total: number | null; published: number | null };
    services: { total: number | null; published: number | null };
    products: { total: number | null; published: number | null };
    orders: { total: number | null };
    messages: { total: number | null };
}

export class CmsDashboardRepository {
    /**
     * Count rows without downloading them (HEAD request + exact count).
     */
    private async count(
        table: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filter?: (query: any) => any
    ): Promise<number> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let query: any = supabase.from(table).select('id', { count: 'exact', head: true });
        if (filter) query = filter(query);

        const { count, error } = await query;
        if (error) throw error;
        return count ?? 0;
    }

    /** One failing count must not blank the whole dashboard. */
    private safe(promise: Promise<number>): Promise<number | null> {
        return promise.catch((err) => {
            console.error('Dashboard count failed', err);
            return null;
        });
    }

    /**
     * All dashboard numbers in parallel.
     * Status values match how each module saves them:
     * blogs 'published', services 'Published', products 'published'.
     */
    public async getCounts(): Promise<DashboardCounts> {
        const [
            blogsTotal,
            blogsPublished,
            servicesTotal,
            servicesPublished,
            productsTotal,
            productsPublished,
            ordersTotal,
            messagesTotal,
        ] = await Promise.all([
            this.safe(this.count('cms_blogs')),
            this.safe(this.count('cms_blogs', (q) => q.eq('status', 'published'))),
            this.safe(this.count('cms_services')),
            this.safe(this.count('cms_services', (q) => q.eq('status', 'Published'))),
            this.safe(this.count('products')),
            this.safe(this.count('products', (q) => q.eq('status', 'published'))),
            this.safe(this.count('hire_tasks')),
            this.safe(this.count('contact_inquiries')),
        ]);

        return {
            blogs: { total: blogsTotal, published: blogsPublished },
            services: { total: servicesTotal, published: servicesPublished },
            products: { total: productsTotal, published: productsPublished },
            orders: { total: ordersTotal },
            messages: { total: messagesTotal },
        };
    }
}

export const cmsDashboard = new CmsDashboardRepository();