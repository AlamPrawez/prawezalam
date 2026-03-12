"use client";

import { Message } from "@/@types/ message";
import { contacts } from "@/services/api/endpoints";
import { Trash2, Eye } from "lucide-react";
import { useEffect, useState } from "react";


export default function MessagePage() {
    const [messageData, setMessage] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMessage = async () => {
        setLoading(true);
        setError(null);
        const result = await contacts.fetchMessage();
        if (result.error) {
            setError(result.error);
            setMessage([]);
        } else {
            setMessage(result.data || []);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchMessage();
    }, []);

    return (
        <>

            <div className="my-2">
                {loading && <p>Loading message...</p>}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && messageData.length === 0 && (
                    <p>No message found.</p>
                )}
                <div className="overflow-x-auto">
                    <div className="min-w-full border-0 rounded-lg">
                        <div className="bg-gray-100 rounded-lg">
                            <div className="flex justify-between items-center" >
                                <div className="w-50 px-3 py-2 text-left">Email</div>
                                <div className="w-50 px-3 py-2 text-left">Message</div>
                                <div className="w-20 px-3 py-2 text-left">Created</div>
                                <div className="w-30 px-3 py-2 text-left">Action</div>
                            </div>
                        </div>

                        <div>
                            {messageData.map((mes) => (
                                <div key={mes.id} className="flex justify-between items-center w-full max-w-4xl text-sm text-gray-500 hover:bg-gray-50 border border-gray-300 rounded-lg my-1">
                                    <div className="w-50 px-3 py-2 text-left">{mes.email}</div>
                                    <div className="w-50 px-3 py-2 text-left">{mes.message}</div>
                                    {mes.created_at && <div className="w-20 px-3 py-2 text-left">
                                        {new Date(mes.created_at).toLocaleDateString()}
                                    </div>}
                                    <div className="w-30 px-3 py-2 flex gap-2">
                                        {/* Delete Button */}
                                        <button
                                            className="flex items-center justify-center rounded p-2 border border-gray-300 hover:text-white text-gray-400 hover:bg-gray-300 transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>

                                        {/* Details Button */}
                                        <button
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