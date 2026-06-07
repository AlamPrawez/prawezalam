"use client";

import { useState } from "react";
import OrderSuccess from "@/components/OrderSuccess";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orders } from "@/services/api/endpoints";
import Features from "@/components/Features";
import { useHireStore } from "@/store/hireStore";
import Image from "next/image";
import HireFAQ from "@/components/HireFAQ";


/* ------------------ Zod Schema ------------------ */
const hireTaskSchema = z.object({
  email: z.string().email("Invalid email address"),

  phone: z.string().min(7, "Phone number is too short"),

  country: z.string().min(2, "Country is required"),
  title: z.string().min(2, "Title is required"),
  budget: z.coerce
    .number()
    .positive("Budget must be greater than 0"),


  durationValue: z.coerce
    .number()
    .positive("Duration must be greater than 0"),

  durationUnit: z.enum(["hours", "days", "weeks"]),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
})

type HireTaskFormData = z.infer<typeof hireTaskSchema>;

/* ------------------ Component ------------------ */
export default function HireForTasks() {

  const [response, setResponse] = useState<any>(false)
  const serviceTitle = useHireStore((state) => state.serviceTitle);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(hireTaskSchema),
    defaultValues: {
      title: serviceTitle || "", // Prefill with Zustand title
    },
  });

  const onSubmit = async (data: HireTaskFormData) => {
    const result = await orders.hireTask(data);
    if (result.error) {
      setResponse(false)
      return;
    }
    setResponse(true)
  };

  return (

    <main className="py-24 bg-gray-50/60 min-h-screen font-sans antialiased text-gray-900">
      {response && <OrderSuccess />}

      {!response && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Master Layout Wrapper changed to a column-based flex matrix */}
          <div className="flex flex-col gap-8 items-center justify-center">

            {/* ================= ROW 1: MAIN PROJECT FORM GATEWAY ================= */}
            <div className="w-full bg-white rounded-2xl border border-gray-200/70 shadow-premium p-6 sm:p-10 transition-all duration-300">

              {/* Premium Decorative Header Layout */}
              <div className="flex mb-8 pb-2 justify-between border-b border-gray-100">
                <div className="mb-1 pb-2 relative">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3 border border-indigo-100/60 shadow-3xs font-mono">
                    Project Gateway
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Post Jobs or Hire
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1.5 leading-relaxed">
                    Define your core deliverables below to broadcast your parameters across secure infrastructure lines.
                  </p>
                </div>
                <div className="transition-all duration-300">
                  <Image
                    src="/prawez-short.png"
                    alt="What's app Number"
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </div>
              </div>


              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                {/* PRIMARY CONTACT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Input Container: Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/40 pl-11 pr-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-400/80 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <span className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                        ⚠️ {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Input Container: Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.017 12.017 0 01-4.515-4.516c-.145-.44.02-.927.396-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/40 pl-11 pr-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-400/80 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && (
                      <span className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                        ⚠️ {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* SCOPE & GEOGRAPHY GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Input Container: Country */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                      Country
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="United States"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/40 pl-11 pr-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-400/80 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                        {...register("country")}
                      />
                    </div>
                    {errors.country && (
                      <span className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                        ⚠️ {errors.country.message}
                      </span>
                    )}
                  </div>

                  {/* Input Container: Title */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                      Title of the Job or Task
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4V14.15m16.5 0c.621 0 1.125-.504 1.125-1.125V11.1a1.125 1.125 0 00-1.125-1.125H3.75A1.125 1.125 0 002.625 11.1v1.925c0 .621.504 1.125 1.125 1.125m16.5 0a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25m-3.375 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-3.375 0A2.25 2.25 0 019 12.65v-1.5c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5a2.25 2.25 0 01-2.25 2.25m3.375 0h-3.375M9 14.15a2.25 2.25 0 01-2.25-2.25v-1.5c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5A2.25 2.25 0 019 14.15zm0 0H4.875A1.125 1.125 0 013.75 13.025V11.1M3.75 6L12 3l8.25 3M12 3v18" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Convert Figma layouts to Next.js"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/40 pl-11 pr-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-400/80 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                        {...register("title")}
                      />
                    </div>
                    {errors.title && (
                      <span className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                        ⚠️ {errors.title.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* BUDGET & TIMELINE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Input Container: Budget */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                      Budget ( In USD )
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 font-mono group-focus-within:text-indigo-500 transition-colors duration-200">
                        $
                      </div>
                      <input
                        type="number"
                        placeholder="5000"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/40 pl-8 pr-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-400/80 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 font-mono"
                        {...register("budget")}
                      />
                    </div>
                    {errors.budget && (
                      <span className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                        ⚠️ {errors.budget.message}
                      </span>
                    )}
                  </div>

                  {/* Input Container: Estimated Duration */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                      Estimated Duration
                    </label>
                    <div className="flex gap-3 items-center">
                      <div className="w-1/2 relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <input
                          type="number"
                          placeholder="Duration"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/40 pl-11 pr-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-400/80 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                          {...register("durationValue")}
                        />
                      </div>

                      <div className="w-1/2 relative">
                        <select
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/40 px-4 py-3 text-sm font-medium text-gray-700 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer appearance-none"
                          {...register("durationUnit")}
                        >
                          <option value="hours">Hours</option>
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {(errors.durationValue || errors.durationUnit) && (
                      <span className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                        ⚠️ {errors.durationValue?.message || errors.durationUnit?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* OBJECTIVE DESCRIPTION PANEL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                    Describe your job or task
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Elaborate on detailed framework objectives, technical system bounds, or performance criteria..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/40 px-4 py-3.5 text-sm font-normal text-gray-900 placeholder-gray-400/80 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 leading-relaxed"
                    {...register("description")}
                  />
                  {errors.description && (
                    <span className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                      ⚠️ {errors.description.message}
                    </span>
                  )}
                </div>

                {/* FORM METRIC SUBMIT TRIGGER */}
                <div className="mt-2 border-t border-gray-100 pt-5 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-w-[160px] rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-premium hover:bg-indigo-700 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-100 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing Container...</span>
                      </>
                    ) : (
                      <>
                        <span>Post Jobs</span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>




            {/* ================= ROW 2: HORIZONTAL FEATURES PANEL LAYER ================= */}
            <div className="w-full transition-all duration-300">
              <Features />
            </div>

          </div>
        </div>
      )}


      <div className='mx-16 ms:mx-5 mt-30 mb-5'>
        <HireFAQ />
      </div>

    </main>



    // <>
    //   <main className="py-20">
    //     {response && <OrderSuccess />}

    //     {!response && <div className="w-full">
    //       <div className="flex-row sm:flex sm:px-30 gap-10">
    //         <div className="w-full sm:w-5xl">
    //           <div className="m-4 sm:mx-auto p-6 sm:pe-12 border border-gray-300 sm:border-0 sm:border-e sm:border-gray-300 rounded-xl sm:rounded-none">
    //             <h2 className="mb-6 text-xl font-semibold text-gray-800">
    //               Post Jobs or Hire
    //             </h2>

    //             <form
    //               onSubmit={handleSubmit(onSubmit)}
    //               className="flex flex-col gap-4"
    //             >
    //               {/* Email */}
    //               <div>
    //                 <label className="mb-1 block text-sm font-medium">
    //                   Email
    //                 </label>
    //                 <input
    //                   type="email"
    //                   placeholder="Email"
    //                   className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    //                   {...register("email")}
    //                 />
    //                 {errors.email && (
    //                   <p className="mt-1 text-xs text-red-500">
    //                     {errors.email.message}
    //                   </p>
    //                 )}
    //               </div>

    //               <div className="w-full flex gap-2">
    //                 {/* Phone */}
    //                 <div className="w-1/2">
    //                   <label className="mb-1 block text-sm font-medium">
    //                     Phone Number
    //                   </label>
    //                   <input
    //                     type="tel"
    //                     placeholder="Phone number"
    //                     className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    //                     {...register("phone")}
    //                   />
    //                   {errors.phone && (
    //                     <p className="mt-1 text-xs text-red-500">
    //                       {errors.phone.message}
    //                     </p>
    //                   )}
    //                 </div>

    //                 {/* Country */}
    //                 <div className="w-1/2">
    //                   <label className="mb-1 block text-sm font-medium">
    //                     Country
    //                   </label>
    //                   <input
    //                     type="text"
    //                     placeholder="Country"
    //                     className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    //                     {...register("country")}
    //                   />
    //                   {errors.country && (
    //                     <p className="mt-1 text-xs text-red-500">
    //                       {errors.country.message}
    //                     </p>
    //                   )}
    //                 </div>
    //               </div>

    //               {/* Title */}
    //               <div>
    //                 <label className="mb-1 block text-sm font-medium">
    //                   Title of the Job or Task
    //                 </label>
    //                 <input
    //                   type="text"
    //                   placeholder="e.g. Figma into nextjs"
    //                   className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    //                   {...register("title")}
    //                 />
    //                 {errors.title && (
    //                   <p className="mt-1 text-xs text-red-500">
    //                     {errors.title.message}
    //                   </p>
    //                 )}
    //               </div>

    //               {/* Budget */}
    //               <div>
    //                 <label className="mb-1 block text-sm font-medium">
    //                   Budget ( In USD )
    //                 </label>
    //                 <input
    //                   type="number"
    //                   placeholder="Budget (USD)"
    //                   className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    //                   {...register("budget")}
    //                 />
    //                 {errors.budget && (
    //                   <p className="mt-1 text-xs text-red-500">
    //                     {errors.budget.message}
    //                   </p>
    //                 )}
    //               </div>

    //               {/* Duration */}
    //               <div className="">
    //                 <label className="mb-1 block text-sm font-medium">
    //                   Estimated duration
    //                 </label>
    //                 <div className="flex gap-2">
    //                   <input
    //                     type="number"
    //                     placeholder="Duration"
    //                     className="w-1/2 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    //                     {...register("durationValue")}
    //                   />

    //                   <select
    //                     className="w-1/2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    //                     {...register("durationUnit")}
    //                   >
    //                     <option value="hours">Hours</option>
    //                     <option value="days">Days</option>
    //                     <option value="weeks">Weeks</option>
    //                   </select>
    //                 </div>
    //               </div>

    //               {(errors.durationValue || errors.durationUnit) && (
    //                 <p className="text-xs text-red-500">
    //                   {errors.durationValue?.message || errors.durationUnit?.message}
    //                 </p>
    //               )}

    //               {/* Description */}
    //               <div>
    //                 <label className="mb-1 block text-sm font-medium">
    //                   Describe your job or task
    //                 </label>
    //                 <textarea
    //                   rows={4}
    //                   placeholder="Describe your task..."
    //                   className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    //                   {...register("description")}
    //                 />
    //                 {errors.description && (
    //                   <p className="mt-1 text-xs text-red-500">
    //                     {errors.description.message}
    //                   </p>
    //                 )}
    //               </div>

    //               {/* Submit */}
    //               <div className="flex">
    //                 <button
    //                   type="submit"
    //                   className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
    //                   disabled={isSubmitting}
    //                 >

    //                   {isSubmitting ? "Submitting..." : "Post Jobs"}
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>

    //         <Features />
    //       </div>
    //     </div>
    //     }

    //   </main>
    // </>

  );
}
