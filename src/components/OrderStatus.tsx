"use client";

import { useState } from "react";
import { orders } from "@/services/api/endpoints"; // your API service

// Define allowed statuses as a type for better TS safety
type OrderStatusType = "PENDING" | "APPROVED" | "PROGRESS" | "CANCELLED";

interface Order {
    id: number;
    status: OrderStatusType;
}

interface OrderStatusProps {
    order: Order;
}

export default function OrderStatus({ order }: OrderStatusProps) {
    const [status, setStatus] = useState<OrderStatusType>(order.status);
    const [loading, setLoading] = useState(false);

    const statuses: OrderStatusType[] = ["PENDING", "APPROVED", "PROGRESS", "CANCELLED"];

    const handleChange = async (newStatus: OrderStatusType) => {
        setStatus(newStatus); // optimistic UI
        setLoading(true);

        try {
            const { data, error } = await orders.updateOrderStatus(order.id, newStatus);

            if (error) {
                console.error("Update failed:", error);
                setStatus(order.status); // revert on error
            } else if (data && data.length > 0) {
                setStatus(data[0].status); // safely update status from returned data
            } else {
                // fallback if data is null or empty
                setStatus(newStatus);
            }
        } catch (err) {
            console.error("Error updating status:", err);
            setStatus(order.status); // revert
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-2 relative">
            <div className="flex gap-2 items-center">
                <div>
                    <strong>Status</strong>
                </div>

                <div className="mt-1 px-3 py-1 text-sm text-gray-500 border border-gray-200 rounded-md bg-gray-100 inline-block">
                    {status}
                </div>
            </div>

            <div className="mt-2 flex w-full">
                <select
                    name="status"
                    value={status}
                    onChange={(e) => handleChange(e.target.value as OrderStatusType)}
                    disabled={loading}
                    className={`w-full px-3 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200 ${loading ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                        }`}
                >
                    {statuses.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <div className="text-sm text-gray-400 mt-1">Updating...</div>}
        </div>
    );
}







// interface Order {
//     status: string;
// }

// interface OrderStatusProps {
//     order: Order;
// }

// export default function OrderStatus({ order }: OrderStatusProps) {
//     const statuses: string[] = ["PENDING", "APPROVED", "PROGRESS", "CANCELLED"];

//     return (
//         <div className="my-2 relative">
//             <div className="flex gap-2 items-center">
//                 <div>
//                     <strong>Status</strong>
//                 </div>

//                 <div className="mt-1 px-3 py-1 text-sm text-gray-500 border border-gray-200 rounded-md bg-gray-100 inline-block">
//                     {order.status}
//                 </div>
//             </div>

//             <div className="mt-2 flex w-full">
//                 <div className="">
//                     <select
//                         name="status"
//                         defaultValue={order.status}
//                         className="w-full px-3 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
//                     >
//                         {statuses.map((item) => (
//                             <option key={item} value={item}>
//                                 {item}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//         </div>
//     );
// }

// "use client"

// import { useState, useRef, useEffect } from "react";

// interface Order {
//   status: string;
// }

// interface OrderStatusProps {
//   order: Order;
//   onChangeStatus?: (newStatus: string) => void;
// }

// export default function OrderStatus({
//   order,
//   onChangeStatus,
// }: OrderStatusProps) {
//   const [open, setOpen] = useState<boolean>(true);
//   const [status, setStatus] = useState<string>(order.status);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   const statuses: string[] = ["PENDING", "APPROVED", "CANCELLED"];

//   const handleChange = (newStatus: string) => {
//     setStatus(newStatus);
//     setOpen(false);
//     if (onChangeStatus) onChangeStatus(newStatus);
//   };

//   // Close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="my-2 relative" ref={dropdownRef}>
//       <div>
//         <strong>Status</strong>
//       </div>

//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className="mt-1 px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 flex items-center gap-2"
//       >
//         {status}
//         <svg
//           className={`w-4 h-4 transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={2}
//           viewBox="0 0 24 24"
//         >
//           <path d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {open && (
//         <div className="absolute mt-1 w-40 bg-white border rounded-md shadow-lg z-50">
//           {statuses.map((item) => (
//             <div
//               key={item}
//               onClick={() => handleChange(item)}
//               className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }