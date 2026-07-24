import { MessagePayload } from "@/@types/ message";
import { FullPagePayload } from "@/@types/cms";
import { supabase } from "@/lib/supabase";
import { Message } from "react-hook-form";

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