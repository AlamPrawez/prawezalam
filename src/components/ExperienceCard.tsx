import React from "react";

// experienceData.ts
export interface Experience {
    role: string;
    company?: string;
    location?: string;
    duration?: string;
    responsibilities: string[];
}

export const experiences: Experience[] = [
    {
        role: "Full Stack Engineer",
        company: "Garjoo Inc",
        location: "Canada",
        duration: "Jul 2022 – Present · 3 yrs 7 mos",
        responsibilities: [
            "Comprehensive development of frontend and backend systems",
            "Created responsive, user-friendly interfaces",
            "Developed secure and scalable APIs",
            "Designed and optimized databases for performance",
            "Collaborated with teams for seamless integration",
            "Conducted testing and debugging",
            "Stayed updated with modern technologies",
            "Deployed and maintained applications effectively",
        ],
    },
    {
        role: "Full Stack Engineer",
        company: "VOLGAI",
        location: "Kathmandu, Anamnagar , Nepal",
        duration: "March 2022 - November 2023",
        responsibilities: [
            "Specialize in API creation and integration for frontend.",
            "Skilled in team and independent development.",
            "Collaborated with teams for seamless integration",
            "Comprehensive development of frontend and backend systems",
            "Created responsive, user-friendly interfaces",
            "Build efficient and seamless solutions.",
            "Stayed updated with modern technologies",
            "Designed and optimized databases for performance",
            "nodejs(express) for microservices, Nextjs , laravel. etc",
            "Developed secure and scalable APIs",
            "Conducted testing and debugging",
            "Deployed and maintained applications effectively",
            "Delivered 10+ successful projects.",
            "wentworthcentral.com.au , exchange",
            "Nrna, postApp , Saffroncottages , Nepbhumi.",
            "msntraveltours.com, Ridingnepal.com, karnaliyoga.com",
        ],
    },
    {
        role: "Full Stack Engineer",
        company: "Flintt",
        location: "Australia Elsternwick",
        duration: "October 2022 - August 2023 (Remote)",
        responsibilities: [
            "Lead both frontend and backend development processes.",
            "Ensure smooth and efficient app performance.",
            "Optimize user experience across platforms.",
            "Implement and maintain scalable architecture.",
            "Drive development for the app.flintt.au application",
            "Collaborate with cross - functional teams for seamless integration.",
            "FrontEnd: reactjs(next), vuejs(Nuxt).backEnd: laravel, express,inertia.GenAI: ChatJpt for generating content for Post."
        ],
    },
    {
        role: "Senior Full Stack Engineer",
        company: "Pailatech",
        location: "Biratnagar, Morag Nepal",
        duration: "June 2019 - March 2020",
        responsibilities: [
            "Delivered high-quality projects exceeding expectations.",
            "Demonstrated a strong commitment to excellence.",
            "Maintained meticulous attention to detail.",
            "Consistently upheld superior project standards.",
            "TvNet — connection management system.",
            "Laravel, vue.js , reactjs , codeigniter, etc. google maps integration for node to node connection monitoring."
        ],
    },
    {
        role: "Self and Freelancer",
        company: "",
        location: "",
        duration: "2020 - continue",
        responsibilities: [
            "Managed projects independently as a freelancer.",
            "Excelled in full project management roles.",
            "Delivered successful projects across diverse domains.",
            "Built strong client relationships through effective management.",
            "Ensured timely and high - quality project delivery.",
            "ansaritoolsandparts.com, Breakdownserviceqatar.com, school management system.",
            "Laravel, react, vue, laravel template, bootstrap, jquery, etc",
        ]
    },
];

const ExperienceCard: React.FC = () => {
    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-center">
                <div className="w-full max-w-6xl py-5">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center sm:text-left mb-5">
                        Experiences & Organizations I’ve Contributed To
                    </h2>
                   

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">

                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-xl border border-gray-300 bg-white shadow-sm"
                            >
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {exp.role}
                                </h2>

                                {exp.company && (<p className="mt-1 text-sm text-gray-600">
                                    <span className="font-medium text-gray-800">
                                        {exp.company}
                                    </span>{" "}
                                    · {exp.location}
                                </p>)}

                                <p className="mt-1 text-sm text-gray-500">
                                    {exp.duration}
                                </p>

                                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
                                    {exp.responsibilities.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}


                    </div>

                </div>
            </div>
        </div>
    );
};

export default ExperienceCard;