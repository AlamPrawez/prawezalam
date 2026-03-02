"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { contacts } from '@/services/api/endpoints';

// 1. Zod Schema for Validation
const contactSchema = z.object({
    fullname: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    subject: z.enum(["New Project Inquiry", "Bug Fixing / Maintenance", "System Design Consultation", "Other"]),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactInput = z.infer<typeof contactSchema>;


export default function ContactPage() {

    const whyPrawezFeatures = [
        { title: "Custom Offers", desc: "Flexible plans that fit your budget." },
        { title: "Fast Delivery", desc: "Reliable, on-time project completion." },
        { title: "Clean Architecture", desc: "Production-ready, scalable code." },
        { title: "Secure & Trusted", desc: "Focus on data safety and UI/UX." },
        { title: "Ongoing Support", desc: "Reliable help even after launch." },
    ];
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (contactData: ContactInput) => {
        setStatus('loading');
        const { error } = await contacts.contactInquiries(contactData);
        if (!error) {
            setStatus('success');
            reset();
            setTimeout(() => setStatus('idle'), 5000);
        } else {
            setStatus('error');
        }
    };
    return (
        <main className="py-20 bg-gray-50 min-h-screen">
            <section id="contact" className="container mx-auto px-6 max-w-6xl">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">Let's Work Together</h1>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Have a specific project or a technical challenge? Fill out the form below and I'll get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">



                    {/* Sidebar Info */}
                    <div className="lg:col-span-1 space-y-6">

                        <div className="flex justify-center mx-4 sm:mx-0 rounded-xl border border-gray-200 sm:border-0 bg-white transition hover:shadow-md">
                            <img
                                src="/prawez.png"
                                alt="profile"
                                className="w-lg h-lg object-cover rounded-xl"
                            />
                        </div>

                        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 text-gray-700">
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <Mail size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider font-bold text-gray-400">Email</p>
                                    <p className="font-medium text-sm">prawezalam9@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Phone Number Card */}
                        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 text-gray-700">
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <Phone size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider font-bold text-gray-400">Call Me</p>
                                    <p className="font-medium text-sm">+977 9804083811</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Prawez? Dynamic Card */}
                        <div className="bg-blue-600 p-6 rounded-xl text-white shadow-xl shadow-blue-200/50">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                Why Prawez?
                            </h3>
                            <ul className="space-y-4">
                                {whyPrawezFeatures.map((item, index) => (
                                    <li key={index} className="flex flex-col gap-0.5 group">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-300 rounded-full group-hover:scale-125 transition-transform" />
                                            <span className="font-bold text-[13px] uppercase tracking-wide">
                                                {item.title}
                                            </span>
                                        </div>
                                        <p className="text-xs text-blue-100 pl-3.5 leading-relaxed opacity-90">
                                            {item.desc}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="lg:col-span-2 h-fit bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Full Name</label>
                                    <input
                                        {...register("fullname")}
                                        className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 ${errors.fullname ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.fullname && <span className="text-red-500 text-xs mt-1">{errors.fullname.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email Address</label>
                                    <input
                                        {...register("email")}
                                        className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="name@company.com"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">subject</label>
                                <select
                                    {...register("subject")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="New Project Inquiry">New Project Inquiry</option>
                                    <option value="Bug Fixing / Maintenance">Bug Fixing / Maintenance</option>
                                    <option value="System Design Consultation">System Design Consultation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
                                <textarea
                                    {...register("message")}
                                    rows={4}
                                    className={`w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Your Message..."
                                />
                                {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Processing...' : status === 'success' ? 'Message Received!' : 'Submit Inquiry'}
                                <Send size={18} />
                            </button>

                            {status === 'success' && (
                                <div className="flex items-center justify-center gap-2 text-green-600 font-medium py-2 bg-green-50 rounded-lg animate-pulse">
                                    <CheckCircle2 size={20} /> Thanks, Prawez will contact you soon!
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="flex items-center justify-center gap-2 text-red-500 font-medium py-2 bg-red-50 rounded-lg">
                                    <AlertCircle size={20} /> Connection error. Please try again.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}