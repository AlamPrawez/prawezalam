"use client";

import { useRouter } from "next/navigation";
import { useHireStore } from "@/store/hireStore";

export default function OrderServiceButton({ title }: { title: string }) {
    const router = useRouter();
    const setService = useHireStore((state) => state.setService);

    const openHire = (serviceTitle: string) => {
        setService(serviceTitle);     // store selected service
        router.push("/hire_for_tasks");         // go to hire page
    };

    return (
        <button
            onClick={() => openHire(title)}
            className="text-sm font-medium px-4 py-2 rounded-lg 
      bg-white text-gray-900 border border-gray-200 
       hover:shadow-lg 
      hover:-translate-y-0.5 
      transition duration-300"
        >
            Order Service
        </button>
    );
}