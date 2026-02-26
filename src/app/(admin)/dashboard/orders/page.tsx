"use client";

import { HireTask, orders } from "@/services/api/endpoints";
import { Trash2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function Order() {
    const [ordersData, setOrders] = useState<HireTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        const result = await orders.fetchOrder();
        if (result.error) {
            setError(result.error);
            setOrders([]);
        } else {
            setOrders(result.data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);

        const result = await orders.deleteOrder(id);

        if (result.error) {
            setError(result.error);
        } else {
            setOrders((prev) => prev.filter((order) => order.id !== id));
        }

        setLoading(false);
    };

    const handleDetails = async (id: any) => {
        router.push(`/dashboard/orders/${id}`);
    }
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>

            <div className="my-2">
                {loading && <p>Loading orders...</p>}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && ordersData.length === 0 && (
                    <p>No orders found.</p>
                )}


                <div className="overflow-x-auto">
                    <div className="min-w-full border-0 rounded-lg">
                        <div className="bg-gray-100 rounded-lg">
                            <div className="flex justify-between items-center" >
                                <div className="w-50 px-3 py-2 text-left">Email</div>
                                <div className="w-25 px-3 py-2 text-left">Phone</div>
                                <div className="w-20 px-3 py-2 text-left">Country</div>
                                <div className="w-20 px-3 py-2 text-left">Budget</div>
                                <div className="w-25 px-3 py-2 text-left">Duration</div>
                                <div className="w-20 px-3 py-2 text-left">Created</div>
                                <div className="w-30 px-3 py-2 text-left">Action</div>
                            </div>
                        </div>

                        <div>
                            {ordersData.map((order) => (
                                <div key={order.id} className="flex justify-between items-center w-full max-w-4xl text-sm text-gray-500 hover:bg-gray-50 border border-gray-300 rounded-lg my-1">
                                    <div className="w-50 px-3 py-2 text-left">{order.email}</div>
                                    <div className="w-25 px-3 py-2 text-left">{order.phone}</div>
                                    <div className="w-20 px-3 py-2 text-left">{order.country}</div>
                                    <div className="w-20 px-3 py-2 text-left">${order.budget}</div>
                                    <div className="w-25 px-3 py-2 text-left">
                                        {order.duration_value} {order.duration_unit}
                                    </div>
                                    <div className="w-20 px-3 py-2 text-left">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="w-30 px-3 py-2 flex gap-2">
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="flex items-center justify-center rounded p-2 border border-gray-300 hover:text-white text-gray-400 hover:bg-gray-300 transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>

                                        {/* Details Button */}
                                        <button
                                            onClick={() => handleDetails(order.id)}
                                            className="flex items-center justify-center rounded p-2 border border-gray-300 hover:text-white text-gray-400 hover:bg-gray-300 transition"
                                            title="View Details"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}