"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, CheckCircle2, AlertCircle, Phone, Sparkles } from 'lucide-react';
import { contacts } from '@/services/api/endpoints';
import FAQSection from '@/components/FAQSection';

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
        <>
        <main className="py-16 sm:py-24 bg-gray-50/50 min-h-screen flex items-center">
            <section id="contact" className="container mx-auto px-4 sm:px-6 max-w-4xl">

                {/* Clean Section Header */}
                <div className="text-center mb-14">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3 border border-indigo-100/60 shadow-3xs font-mono animate-fade-in">
                        Get In Touch
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                        Let's Work Together
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
                        Have a specific project or a technical challenge? Fill out the form below and I'll get back to you within 24 hours.
                    </p>
                </div>

                {/* Main Balanced Content Layout Stack */}
                <div className="space-y-8 w-full">
                    
                    {/* Main Core Form Block Container (Spans Full Width gracefully) */}
                    <div className="w-full h-fit bg-white border border-gray-200/80 p-6 sm:p-10 rounded-2xl shadow-premium relative overflow-hidden">
                        
                        {/* Interactive UI background glowing accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Inputs Group Panel */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Name Input Wrapper */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider font-mono text-gray-700">Full Name</label>
                                    <input
                                        {...register("fullname")}
                                        className={`w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
                                            errors.fullname
                                                ? 'border-red-500 focus:ring-red-500/10 bg-red-50/5'
                                                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100/70 bg-gray-50/10 hover:border-gray-300 text-gray-800 focus:bg-white'
                                        }`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.fullname && <span className="text-red-500 text-xs font-medium block mt-1">{errors.fullname.message}</span>}
                                </div>

                                {/* Email Entry Wrapper */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider font-mono text-gray-700">Email Address</label>
                                    <input
                                        {...register("email")}
                                        className={`w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
                                            errors.email
                                                ? 'border-red-500 focus:ring-red-500/10 bg-red-50/5'
                                                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100/70 bg-gray-50/10 hover:border-gray-300 text-gray-800 focus:bg-white'
                                        }`}
                                        placeholder="name@company.com"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs font-medium block mt-1">{errors.email.message}</span>}
                                </div>
                            </div>

                            {/* Dropdown Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider font-mono text-gray-700">Inquiry Subject</label>
                                <div className="relative">
                                    <select
                                        {...register("subject")}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50/10 hover:border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100/70 transition-all text-gray-800 font-medium cursor-pointer appearance-none focus:bg-white"
                                    >
                                        <option value="New Project Inquiry">New Project Inquiry</option>
                                        <option value="Bug Fixing / Maintenance">Bug Fixing / Maintenance</option>
                                        <option value="System Design Consultation">System Design Consultation</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Message Core Entry Panel */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider font-mono text-gray-700">Message Description</label>
                                <textarea
                                    {...register("message")}
                                    rows={5}
                                    className={`w-full resize-none rounded-xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
                                        errors.message
                                            ? 'border-red-500 focus:ring-red-500/10 bg-red-50/5'
                                            : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100/70 bg-gray-50/10 hover:border-gray-300 text-gray-800 focus:bg-white'
                                    }`}
                                    placeholder="Tell me more about your system specifications, requirements, and scope timelines..."
                                />
                                {errors.message && <span className="text-red-500 text-xs font-medium block mt-1">{errors.message.message}</span>}
                            </div>

                            {/* Submission Button Trigger Control */}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.985] disabled:opacity-50 text-sm cursor-pointer shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200/50"
                            >
                                {status === 'loading' ? 'Processing Details...' : status === 'success' ? 'Inquiry Dispatched!' : 'Submit Inquiry'}
                                <Send size={14} className={`stroke-[2.5] ${status === 'loading' ? 'animate-bounce' : ''}`} />
                            </button>

                            {/* Status Notifications Panel Layer */}
                            {status === 'success' && (
                                <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold py-3.5 bg-emerald-50 border border-emerald-100 rounded-xl animate-fade-in">
                                    <CheckCircle2 size={16} className="text-emerald-600" /> Thanks, Prawez will contact you soon!
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="flex items-center justify-center gap-2 text-rose-700 text-xs font-bold py-3.5 bg-rose-50 border border-rose-100 rounded-xl animate-fade-in">
                                    <AlertCircle size={16} className="text-rose-600" /> Connection error. Please try again.
                                </div>
                            )}
                        </form>
                    </div>

                    
{/* Unified Bottom Panel Section Stack (Sits clean underneath) */}
<div className="w-full space-y-6">
    
    {/* Split Row: Ultra-Large Profile Image Left & Stacked Contacts Right */}
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full bg-white border border-gray-200/70 p-6 sm:p-8 rounded-2xl shadow-premium">
        
        {/* Profile Image View Box - Expanded to a massive high-impact container */}
        <div className="w-56 h-56 sm:w-72 sm:h-72 aspect-square rounded-2xl border border-gray-200 bg-gray-50/50 p-2.5 shadow-xs overflow-hidden group shrink-0 flex items-center justify-center">
            <img
                src="/prawez.png"
                alt="profile"
                className="w-full h-full object-cover rounded-xl transition-all duration-700 ease-in-out transform group-hover:scale-[1.03]"
            />
        </div>

        {/* Communication Channels Sub-stack - Restructured to run vertically to perfectly match the ultra-large image height */}
        <div className="flex-1 flex flex-col gap-4 w-full h-full md:min-h-[288px] justify-between">
            {/* Direct Email Card */}
            <a href="mailto:prawezalam9@gmail.com" className="bg-gray-50/40 hover:bg-white border border-gray-100 hover:border-indigo-200 p-6 rounded-xl shadow-3xs transition-all duration-200 flex items-center gap-5 group/item flex-1">
                <div className="bg-indigo-50/70 p-4 rounded-xl text-indigo-600 border border-indigo-100/30 shrink-0 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-200">
                    <Mail size={24} className="stroke-[2.5]" />
                </div>
                <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider font-bold font-mono text-gray-400">Email Address</p>
                    <p className="font-bold text-base sm:text-lg text-gray-800 transition-colors block truncate mt-1">
                        prawezalam9@gmail.com
                    </p>
                </div>
            </a>

            {/* Secure Direct Line Phone Card */}
            <a href="tel:+9779804083811" className="bg-gray-50/40 hover:bg-white border border-gray-100 hover:border-indigo-200 p-6 rounded-xl shadow-3xs transition-all duration-200 flex items-center gap-5 group/item flex-1">
                <div className="bg-indigo-50/70 p-4 rounded-xl text-indigo-600 border border-indigo-100/30 shrink-0 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-200">
                    <Phone size={24} className="stroke-[2.5]" />
                </div>
                <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider font-bold font-mono text-gray-400">Direct Contact</p>
                    <p className="font-bold text-base sm:text-lg text-gray-800 transition-colors block truncate mt-1">
                        +977 9804083811
                    </p>
                </div>
            </a>
        </div>
    </div>

    {/* Value Proposition Framework Card - Styled Premium Wide Dark Slate Block */}
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 sm:p-8 rounded-2xl text-white shadow-lg border border-gray-800 w-full relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
        
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-indigo-400 mb-6 flex items-center gap-2">
            <Sparkles size={13} className="animate-pulse" /> Why Choose Me?
        </h3>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {whyPrawezFeatures.map((item, index) => (
                <li key={index} className="flex flex-col gap-1 group transition-all duration-200 hover:translate-x-1">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:bg-indigo-400 transition-colors" />
                        <span className="font-bold text-xs tracking-tight text-gray-200 group-hover:text-white transition-colors uppercase">
                            {item.title}
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 pl-3.5 leading-relaxed font-normal">
                        {item.desc}
                    </p>
                </li>
            ))}
        </ul>
    </div>
</div>
                </div>
            </section>

        </main>
        <div className='mx-16 my-5'>
        <FAQSection/>
        </div>
        </>
           
    );
}











// "use client";

// import { useState } from 'react';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Mail, Send, CheckCircle2, AlertCircle, Phone, Sparkles } from 'lucide-react';
// import { contacts } from '@/services/api/endpoints';

// // 1. Zod Schema for Validation
// const contactSchema = z.object({
//     fullname: z.string().min(2, "Name is too short"),
//     email: z.string().email("Invalid email address"),
//     subject: z.enum(["New Project Inquiry", "Bug Fixing / Maintenance", "System Design Consultation", "Other"]),
//     message: z.string().min(10, "Message must be at least 10 characters"),
// });

// type ContactInput = z.infer<typeof contactSchema>;

// export default function ContactPage() {
//     const whyPrawezFeatures = [
//         { title: "Custom Offers", desc: "Flexible plans that fit your budget." },
//         { title: "Fast Delivery", desc: "Reliable, on-time project completion." },
//         { title: "Clean Architecture", desc: "Production-ready, scalable code." },
//         { title: "Secure & Trusted", desc: "Focus on data safety and UI/UX." },
//         { title: "Ongoing Support", desc: "Reliable help even after launch." },
//     ];
//     const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

//     const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInput>({
//         resolver: zodResolver(contactSchema)
//     });

//     const onSubmit = async (contactData: ContactInput) => {
//         setStatus('loading');
//         const { error } = await contacts.contactInquiries(contactData);
//         if (!error) {
//             setStatus('success');
//             reset();
//             setTimeout(() => setStatus('idle'), 5000);
//         } else {
//             setStatus('error');
//         }
//     };

//     return (
//         <main className="py-16 sm:py-24 bg-gray-50/50 min-h-screen flex items-center">
//             <section id="contact" className="container mx-auto px-4 sm:px-6 max-w-6xl">

//                 {/* Clean Section Header */}
//                 <div className="text-center mb-14">
//                     <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3 border border-indigo-100/60 shadow-3xs font-mono">
//                         Get In Touch
//                     </span>
//                     <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
//                         Let's Work Together
//                     </h1>
//                     <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
//                         Have a specific project or a technical challenge? Fill out the form below and I'll get back to you within 24 hours.
//                     </p>
//                 </div>

//                 {/* Main Content Layout Grid */}
//                 <div className="grid grid-cols-1 gap-8 items-start mb-5">
//                     {/* Main Core Form Block Container */}
//                     <div className="lg:col-span-2 h-fit bg-white border border-gray-200/70 p-6 sm:p-8 rounded-2xl shadow-premium">
//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//                             {/* Inputs Group Panel */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                                 {/* Name Input Wrapper */}
//                                 <div className="space-y-1.5">
//                                     <label className="block text-xs font-bold uppercase tracking-wider font-mono text-gray-700">Full Name</label>
//                                     <input
//                                         {...register("fullname")}
//                                         className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-4 ${errors.fullname
//                                             ? 'border-red-500 focus:ring-red-500/10 bg-red-50/5'
//                                             : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100/70 bg-gray-50/10 hover:border-gray-300 text-gray-800'
//                                             }`}
//                                         placeholder="Enter your name"
//                                     />
//                                     {errors.fullname && <span className="text-red-500 text-xs font-medium block mt-1">{errors.fullname.message}</span>}
//                                 </div>

//                                 {/* Email Entry Wrapper */}
//                                 <div className="space-y-1.5">
//                                     <label className="block text-xs font-bold uppercase tracking-wider font-mono text-gray-700">Email Address</label>
//                                     <input
//                                         {...register("email")}
//                                         className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-4 ${errors.email
//                                             ? 'border-red-500 focus:ring-red-500/10 bg-red-50/5'
//                                             : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100/70 bg-gray-50/10 hover:border-gray-300 text-gray-800'
//                                             }`}
//                                         placeholder="name@company.com"
//                                     />
//                                     {errors.email && <span className="text-red-500 text-xs font-medium block mt-1">{errors.email.message}</span>}
//                                 </div>
//                             </div>

//                             {/* Dropdown Field */}
//                             <div className="space-y-1.5">
//                                 <label className="block text-xs font-bold uppercase tracking-wider font-mono text-gray-700">Inquiry Subject</label>
//                                 <select
//                                     {...register("subject")}
//                                     className="w-full rounded-xl border border-gray-200 bg-gray-50/10 hover:border-gray-300 px-3.5 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100/70 transition-all text-gray-800 font-medium cursor-pointer"
//                                 >
//                                     <option value="New Project Inquiry">New Project Inquiry</option>
//                                     <option value="Bug Fixing / Maintenance">Bug Fixing / Maintenance</option>
//                                     <option value="System Design Consultation">System Design Consultation</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             </div>

//                             {/* Message Core Entry Panel */}
//                             <div className="space-y-1.5">
//                                 <label className="block text-xs font-bold uppercase tracking-wider font-mono text-gray-700">Message Description</label>
//                                 <textarea
//                                     {...register("message")}
//                                     rows={5}
//                                     className={`w-full resize-none rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-4 ${errors.message
//                                         ? 'border-red-500 focus:ring-red-500/10 bg-red-50/5'
//                                         : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100/70 bg-gray-50/10 hover:border-gray-300 text-gray-800'
//                                         }`}
//                                     placeholder="Tell me more about your system specifications, requirements, and scope timelines..."
//                                 />
//                                 {errors.message && <span className="text-red-500 text-xs font-medium block mt-1">{errors.message.message}</span>}
//                             </div>

//                             {/* Submission Button Trigger Control */}
//                             <button
//                                 type="submit"
//                                 disabled={status === 'loading'}
//                                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 text-sm cursor-pointer shadow-sm shadow-indigo-100"
//                             >
//                                 {status === 'loading' ? 'Processing Details...' : status === 'success' ? 'Inquiry Dispatched!' : 'Submit Inquiry'}
//                                 <Send size={14} className="stroke-[2.5]" />
//                             </button>

//                             {/* Status Notifications Panel Layer */}
//                             {status === 'success' && (
//                                 <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
//                                     <CheckCircle2 size={16} className="text-emerald-600" /> Thanks, Prawez will contact you soon!
//                                 </div>
//                             )}

//                             {status === 'error' && (
//                                 <div className="flex items-center justify-center gap-2 text-rose-700 text-xs font-bold py-3 bg-rose-50 border border-rose-100 rounded-xl">
//                                     <AlertCircle size={16} className="text-rose-600" /> Connection error. Please try again.
//                                 </div>
//                             )}
//                         </form>
//                     </div>
//                 </div>

              
//                 <div className="lg:col-span-1 space-y-5">


//                     <div className='flex'>
//                         {/* contact image what's app number Display Card */}
//                         <div className="w-2xlg aspect-square rounded-2xl border border-gray-200 bg-white p-2 shadow-xs overflow-hidden group flex items-center justify-center">
//                             <img
//                                 src="/prawez.png"
//                                 alt="profile"
//                                 className="w-50 h-50 object-cover rounded-xl transition-all duration-500 ease-in-out transform hover:scale-[1.02]"
//                             />
//                         </div>
//                         <div>

//                             {/* Direct Email Card */}
//                             <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-3xs">
//                                 <div className="flex items-center gap-4 text-gray-700">
//                                     <div className="bg-indigo-50/70 p-3 rounded-xl text-indigo-600 border border-indigo-100/30 shrink-0">
//                                         <Mail size={18} className="stroke-[2.5]" />
//                                     </div>
//                                     <div className="overflow-hidden">
//                                         <p className="text-[10px] uppercase tracking-wider font-bold font-mono text-gray-400">Email Address</p>
//                                         <a href="mailto:prawezalam9@gmail.com" className="font-semibold text-sm text-gray-900 hover:text-indigo-600 transition-colors block truncate">
//                                             prawezalam9@gmail.com
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Secure Direct Line Phone Card */}
//                             <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-3xs">
//                                 <div className="flex items-center gap-4 text-gray-700">
//                                     <div className="bg-indigo-50/70 p-3 rounded-xl text-indigo-600 border border-indigo-100/30 shrink-0">
//                                         <Phone size={18} className="stroke-[2.5]" />
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] uppercase tracking-wider font-bold font-mono text-gray-400">Direct Contact Line</p>
//                                         <a href="tel:+9779804083811" className="font-semibold text-sm text-gray-900 hover:text-indigo-600 transition-colors block">
//                                             +977 9804083811
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Value Proposition Framework Card - Styled Premium Gray/Indigo Accent */}
//                             <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-6 rounded-2xl text-white shadow-lg border border-gray-800">
//                                 <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-indigo-400 mb-4 flex items-center gap-2">
//                                     <Sparkles size={13} /> Why Choose Me?
//                                 </h3>
//                                 <ul className="space-y-4">
//                                     {whyPrawezFeatures.map((item, index) => (
//                                         <li key={index} className="flex flex-col gap-0.5 group">
//                                             <div className="flex items-center gap-2">
//                                                 <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:bg-indigo-400 transition-colors" />
//                                                 <span className="font-bold text-xs tracking-tight text-gray-200 group-hover:text-white transition-colors">
//                                                     {item.title}
//                                                 </span>
//                                             </div>
//                                             <p className="text-xs text-gray-400 pl-3.5 leading-relaxed font-normal">
//                                                 {item.desc}
//                                             </p>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>



//                 </div>
//             </section>
//         </main>
//     );
// }