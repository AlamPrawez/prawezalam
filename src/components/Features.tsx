import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Features() {
    const features = [
        {
            title: "Custom Offers That Fit Your Budget",
            description:
                "I create flexible pricing plans based on your project scope, ensuring you get the best value without unnecessary costs.",
        },
        {
            title: "Fast & Reliable Delivery",
            description:
                "Deadlines matter. I deliver projects on time with clear communication and consistent progress updates.",
        },
        {
            title: "Production-Ready Code Quality",
            description:
                "Every project follows industry best practices with clean, scalable, and maintainable code ready for real-world deployment.",
        },
        {
            title: "Well-Structured & Scalable Project Architecture",
            description:
                "I organize projects using a clean folder structure, modular components, and reusable logic to support future growth and easy maintenance.",
        },
        {
            title: "Secure & Trusted Solutions",
            description:
                "Security is a priority. I implement authentication, authorization, and best security practices to protect your data and users.",
        },
        {
            title: "Clean UI & User-Friendly Experience",
            description:
                "I focus on intuitive design and smooth user experience so your product looks professional and feels easy to use.",
        },
        {
            title: "Easy Maintenance & Future Updates",
            description:
                "My codebase is easy to understand and extend, making future updates, feature additions, and maintenance hassle-free.",
        },
        {
            title: "Clear Communication & Ongoing Support",
            description:
                "You’ll receive regular updates, clear explanations, and reliable support even after the project is completed.",
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleItem = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (

        <div className="w-xl space-y-4">
            {features.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                    <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
                    >
                        {/* Title */}
                        <button
                            onClick={() => toggleItem(index)}
                            className="flex w-full items-center justify-between p-6 text-left"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">
                                {item.title}
                            </h3>

                            <ChevronDown
                                size={18}
                                className={`transform transition-transform duration-200 ${isOpen
                                    ? "rotate-180 text-gray-900"
                                    : "text-gray-400"
                                    }`}
                            />
                        </button>

                        {/* Description */}
                        {isOpen && (
                            <div className="px-6 pb-6">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
        // <div className="w-xl space-y-4">
        //     {features.map((item, index) => (
        //         <div
        //             key={index}
        //             className="rounded-xl border border-gray-200 bg-white p-6 transition duration-200 hover:shadow-md"
        //         >
        //             <h3 className="mb-2 text-lg font-semibold text-gray-900">
        //                 {item.title}
        //             </h3>
        //             <p className="text-sm text-gray-600 leading-relaxed">
        //                 {item.description}
        //             </p>
        //         </div>
        //     ))}
        // </div>
    );
}