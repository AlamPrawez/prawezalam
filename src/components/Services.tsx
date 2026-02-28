"use client";

import OrderServiceButton from "./OrderServiceButton";

const services = [
    {
        title: "Mobile App Development",
        desc: "Build scalable, modern Android & cross-platform apps tailored to your business needs. Focused on performance, usability, and long-term maintainability."
    },
    {
        title: "Web Apps & Websites",
        desc: "Develop fast, secure, and responsive web applications or business websites designed to handle real users and real growth."
    },
    {
        title: "Tech & DevOps Consulting",
        desc: "Get expert guidance on choosing the right tech stack, system architecture, and deployment strategy to scale efficiently."
    },
    {
        title: "API & Third-Party Integration",
        desc: "Connect your platform with payment gateways, CRMs, external tools, or services through secure and seamless API integrations."
    },
    {
        title: "Code Review & Optimization",
        desc: "Analyze your existing codebase to improve speed, structure, scalability, and reduce future technical debt."
    },
    {
        title: "SaaS Application Design",
        desc: "Design and build scalable SaaS platforms with proper multi-user architecture and growth-ready infrastructure."
    },
    {
        title: "System Architecture (AWS)",
        desc: "Plan and design cloud-based systems using AWS tools to ensure high availability, performance, and reliability."
    },
    {
        title: "VPS Setup & Management",
        desc: "Configure and secure VPS servers with production-ready setup including Nginx, Docker, and monitoring tools."
    },
    {
        title: "Complex Feature Development",
        desc: "Implement challenging custom features that require deep technical understanding and scalable logic."
    },
    {
        title: "Bug Detection & Fixing",
        desc: "Identify hidden issues affecting performance or functionality and resolve them efficiently."
    },
    {
        title: "Figma / PDF to Frontend Conversion",
        desc: "Convert Figma, PDF, or design files into pixel-perfect Next.js, Nuxt.js, or modern responsive frontend interfaces."
    },
    {
        title: "Project Deployment",
        desc: "Handle complete deployment from development to live production with optimized setup and stability."
    }
]

export default function ServicesSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">

                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Services I Offer
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                        From development to deployment — complete technical support to build, scale, and optimize your digital products.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-xl transition duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="flex justify-end mt-4">
                                <OrderServiceButton title={item.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}