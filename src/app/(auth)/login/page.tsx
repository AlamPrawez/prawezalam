"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authentication } from "@/services/endpoints";

import { useRouter } from "next/navigation";

/* ------------------ Zod Schema ------------------ */
const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {

    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });


    const onSubmit = async (data: LoginFormData) => {
        // console.log(data)
        setServerError(null);

        const res = await authentication.signIn(data);

        if (res.error) {
            setServerError(res.error);
            return;
        }
        if (res.session) {
            // window.location.href = "/dashboard";
            router.refresh();
            router.replace("/dashboard");
        }
    };

   

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex justify-center">
                <div className="w-full max-w-lg rounded-xl border border-gray-300 p-6">
                    <h1 className="mb-6 text-center text-2xl font-semibold">
                        Login
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black ${errors.email ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                {...register("password")}
                                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black ${errors.password ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Server error */}
                        {serverError && (
                            <p className="text-sm text-red-600">{serverError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}