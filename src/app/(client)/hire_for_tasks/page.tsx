"use client";

import { useState } from "react";
import OrderSuccess from "@/components/OrderSuccess";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orders } from "@/services/api/endpoints";
import Features from "@/components/Features";
import { useHireStore } from "@/store/hireStore";


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
    <>
      <main className="py-20">
        {response && <OrderSuccess />}

        {!response && <div className="w-full">
          <div className="flex-row sm:flex sm:px-30 gap-10">
            <div className="w-full sm:w-5xl">
              <div className="m-4 sm:mx-auto p-6 sm:pe-12 border border-gray-300 sm:border-0 sm:border-e sm:border-gray-300 rounded-xl sm:rounded-none">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                  Hire for Task
                </h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  {/* Email */}
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex gap-2">
                    {/* Phone */}
                    <div className="w-1/2">
                      <label className="mb-1 block text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Country */}
                    <div className="w-1/2">
                      <label className="mb-1 block text-sm font-medium">
                        Country
                      </label>
                      <input
                        type="text"
                        placeholder="Country"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        {...register("country")}
                      />
                      {errors.country && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Title of Task
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Figma into nextjs"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Budget ( In USD )
                    </label>
                    <input
                      type="number"
                      placeholder="Budget (USD)"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      {...register("budget")}
                    />
                    {errors.budget && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="">
                    <label className="mb-1 block text-sm font-medium">
                      Estimated duration
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Duration"
                        className="w-1/2 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        {...register("durationValue")}
                      />

                      <select
                        className="w-1/2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        {...register("durationUnit")}
                      >
                        <option value="hours">Hours</option>
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                      </select>
                    </div>
                  </div>

                  {(errors.durationValue || errors.durationUnit) && (
                    <p className="text-xs text-red-500">
                      {errors.durationValue?.message || errors.durationUnit?.message}
                    </p>
                  )}

                  {/* Description */}
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Describe your task
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your task..."
                      className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex">
                    <button
                      type="submit"
                      className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      disabled={isSubmitting}
                    >

                      {isSubmitting ? "Submit..." : "Submit Task"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <Features />
          </div>
        </div>
        }

      </main>
    </>

  );
}
