import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderSuccess() {
    return (
        <div className="flex items-center justify-center py-10">
            <div className="max-w-6xl w-full rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Thank you for your order!
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed">
                    Your task has been successfully submitted.
                    We’ve received your request and will get back to you as soon as possible.
                </p>

                <div className="mt-6 flex gap-2 justify-center">
                    <Link
                        href="/"
                        className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition">
                        Back to Home
                    </Link>

                    <a
                        href="/hire_for_tasks"
                        className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition">
                        Order Another task
                    </a>
                </div>
            </div>
        </div>
    );
}