import React from "react";
import Image from "next/image";

// export const devopsSkills = [
//     {
//         name: "Git", 
//         img: "/skills/git.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 7
//     },
//     {
//         name: "GitHub", 
//         img: "/skills/github.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 7
//     },
//     {
//         name: "GitLab", 
//         img: "/skills/gitlab.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 7
//     },

//     {
//         name: "Jira", 
//         img: "/skills/jira.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 4
//     },

//     {
//         name: "Docker", 
//         img: "/skills/docker.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 3
//     },
//     {
//         name: "Kubernetes", 
//         img: "/skills/kubernetes.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 3
//     },

//     {
//         name: "cPanel", 
//         img: "/skills/cpanel.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 7
//     },
//     {
//         name: "Linux CLI", 
//         img: "/skills/linux.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 7
//     },

//     {
//         name: "VPS", 
//         img: "/skills/vps.png",
//         shortDesc: "Containerized app deployment",
//         experience: 5
//     },
//     {
//         name: "AWS EC2", 
//         img: "/skills/aws-ec2.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 5
//     },
//     {
//         name: "AWS S3", 
//         img: "/skills/aws-s3.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 5
//     },
//     {
//         name: "AWS ECR", 
//         img: "/skills/aws-ecr.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 5
//     },
//     {
//         name: "AWS ECS", 
//         img: "/skills/aws-ecs.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 5
//     },
//     {
//         name: "AWS Lambda", 
//         img: "/skills/aws-lambda.png", 
//         shortDesc: "Containerized app deployment",
//         experience: 5
//     },
// ];

export const devopsSkills = [
    {
        name: "Git",
        img: "/skills/git.png",
        shortDesc: "Distributed version control system",
        experience: 7
    },
    {
        name: "GitHub",
        img: "/skills/github.png",
        shortDesc: "Code hosting & collaboration platform",
        experience: 7
    },
    {
        name: "GitLab",
        img: "/skills/gitlab.png",
        shortDesc: "CI/CD & repository management",
        experience: 7
    },
    {
        name: "Jira",
        img: "/skills/jira.png",
        shortDesc: "Agile project & issue tracking",
        experience: 4
    },
    {
        name: "Docker",
        img: "/skills/docker.png",
        shortDesc: "Containerized application deployment",
        experience: 3
    },
    {
        name: "Kubernetes",
        img: "/skills/kubernetes.png",
        shortDesc: "Container orchestration platform",
        experience: 3
    },
    {
        name: "cPanel",
        img: "/skills/cpanel.png",
        shortDesc: "Web hosting control panel",
        experience: 7
    },
    {
        name: "Linux CLI",
        img: "/skills/linux.png",
        shortDesc: "Server management via terminal",
        experience: 7
    },
    {
        name: "VPS",
        img: "/skills/vps.png",
        shortDesc: "Virtual private server setup",
        experience: 5
    },
    {
        name: "AWS EC2",
        img: "/skills/aws-ec2.png",
        shortDesc: "Cloud compute instances",
        experience: 5
    },
    {
        name: "AWS S3",
        img: "/skills/aws-s3.png",
        shortDesc: "Scalable cloud storage",
        experience: 5
    },
    {
        name: "AWS ECR",
        img: "/skills/aws-ecr.png",
        shortDesc: "Container image registry",
        experience: 5
    },
    {
        name: "AWS ECS",
        img: "/skills/aws-ecs.png",
        shortDesc: "Container orchestration service",
        experience: 5
    },
    {
        name: "AWS Lambda",
        img: "/skills/aws-lambda.png",
        shortDesc: "Serverless compute service",
        experience: 5
    },
    {
        name: "AWS Load Balancer",
        img: "/skills/aws-elb.png",
        shortDesc: "Distributes traffic across services",
        experience: 5
    },
    {
        name: "Nginx",
        img: "/skills/nginx.png",
        shortDesc: "High-performance web server & reverse proxy",
        experience: 7
    }
];
const DevOpsSection: React.FC = () => {
    return (
        <div className="bg-white py-16 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl">

                        <div className="ps-4 mb-8 text-center sm:text-start">
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-2.5 border border-indigo-100">
                                Infrastructure
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                                DevOps & Version Control
                            </h2>
                        </div>

                        <section className="mx-auto">
                            <div className="flex flex-wrap justify-center gap-5 px-2 py-4">
                                {devopsSkills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row items-center sm:items-start md:items-center bg-white border border-gray-200/70 rounded-2xl p-4 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] w-full sm:w-[47%] lg:w-[31.5%] group relative overflow-hidden"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                                        {/* FIXED SIZE LOGO WRAPPER CONTAINER */}
                                        <div className="flex-shrink-0 p-2 w-20 h-20 flex items-center justify-center bg-gray-50/80 rounded-xl mb-3 sm:mb-0 sm:mr-4 border border-gray-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100/50 transition-colors duration-300">
                                            <Image
                                                src={skill.img}
                                                alt={`${skill.name} Environment Deployment Asset`}
                                                width={100}
                                                height={100}
                                                className="w-20 h-20 object-contain block filter drop-shadow-3xs transition-transform duration-300 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="flex-1 w-full text-center sm:text-left">
                                            <h3 className="text-base font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                                                {skill.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 font-normal mt-0.5 leading-relaxed min-h-[32px] flex items-center justify-center sm:justify-start">
                                                {skill.shortDesc}
                                            </p>
                                            <div className="mt-3">
                                                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 tracking-wide uppercase mb-1.5 font-mono">
                                                    <span>Proficiency</span>
                                                    <span className="text-indigo-600 font-extrabold bg-indigo-50/80 px-1.5 py-0.5 rounded-md border border-indigo-100/30">
                                                        {skill.experience} {skill.experience === 1 ? 'Year' : 'Yrs'}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden border border-gray-200/20 shadow-2xs">
                                                    <div
                                                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1.5 rounded-full transition-all duration-1000 ease-out"
                                                        style={{ width: `${Math.min((skill.experience / 10) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
        // <div className="container mx-auto px-4 py-6">
        //     <div className="flex justify-center">
        //         <div className="w-full max-w-6xl p-5 bg-white">

        //             {/* Heading */}
        //             <div className="py-6 text-center sm:text-start">
        //                 <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center sm:text-left mb-5">
        //                     DevOps & Version Control
        //                 </h2>
        //             </div>

        //             {/* Flex Cards (3 per row) */}
        //             <div className="flex flex-wrap justify-center gap-4">

        //                 {devopsSkills.map((skill, index) => (
        //                     <div
        //                         key={index}
        //                         className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm transition hover:shadow-md w-full sm:w-[48%] lg:w-[31%]"
        //                     >

        //                         {/* Small Image */}
        //                         <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-50 rounded-lg mb-3 md:mb-0 md:mr-3">
        //                             <img
        //                                 src={skill.img}
        //                                 alt={skill.name}
        //                                 className="h-12 w-12 md:h-16 md:w-16 object-contain"
        //                             />
        //                         </div>

        //                         {/* Info */}
        //                         <div className="flex-1">

        //                             <h5 className="text-md font-semibold text-gray-800">
        //                                 {skill.name}
        //                             </h5>

        //                             <p className="text-xs text-gray-500 mt-1 mb-2">
        //                                 {skill.shortDesc}
        //                             </p>

        //                             {/* Progress */}
        //                             <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        //                                 <div
        //                                     className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-in-out"
        //                                     style={{ width: `${(skill.experience / 10) * 100}%` }}
        //                                 ></div>
        //                             </div>

        //                             <span className="text-xs text-gray-600 mt-1 block">
        //                                 {skill.experience} yrs
        //                             </span>

        //                         </div>

        //                     </div>
        //                 ))}

        //             </div>

        //         </div>
        //     </div>
        // </div>
        // <div className="container mx-auto px-4 py-6">
        //     <div className="flex justify-center">
        //         <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">
        //             <section className="bg-white">
        //                 <div className="mx-auto max-w-7xl px-4">

        //                     <div className="py-6 text-center sm:text-start">
        //                         <h2 className="text-lg font-bold text-gray-500">
        //                             DevOps & Version Control
        //                         </h2>
        //                     </div>


        //                     <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        //                         {devopsSkills.map((skill, index) => (
        //                             <div
        //                                 key={index}
        //                                 className="flex h-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md"
        //                             >
        //                                 <img
        //                                     src={skill.img}
        //                                     alt={skill.name}
        //                                     className="mb-4 h-14 w-14 object-contain"
        //                                 />
        //                                 <h5 className="text-sm font-semibold text-gray-800">
        //                                     {skill.name}
        //                                 </h5>
        //                             </div>
        //                         ))}
        //                     </div>
        //                 </div>
        //             </section>
        //         </div>
        //     </div>
        // </div>


    );
};

export default DevOpsSection;