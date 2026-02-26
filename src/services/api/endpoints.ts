import { supabase } from "@/lib/supabase";
import { promises } from "dns";

export type HireTask = {
    id: number;
    email: string;
    phone: string;
    country: string;
    budget: number;
    duration_value: number;
    duration_unit: string;
    created_at: string;
    status?:string;
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
            return {
                user: null,
                session: null,
                error: error.message, // Pass the actual error message here
            };
        }

        return {
            user: data.user,
            session: data.session,
            error: null,
        };



    };

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

