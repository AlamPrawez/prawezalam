import React from "react";

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
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
                <div className="w-full max-w-6xl p-5 bg-white">

                    {/* Heading */}
                    <div className="py-6 text-center sm:text-start">
                        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center sm:text-left mb-5">
                            DevOps & Version Control
                        </h2>
                    </div>

                    {/* Flex Cards (3 per row) */}
                    <div className="flex flex-wrap justify-center gap-4">

                        {devopsSkills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm transition hover:shadow-md w-full sm:w-[48%] lg:w-[31%]"
                            >

                                {/* Small Image */}
                                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-50 rounded-lg mb-3 md:mb-0 md:mr-3">
                                    <img
                                        src={skill.img}
                                        alt={skill.name}
                                        className="h-12 w-12 md:h-16 md:w-16 object-contain"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1">

                                    <h5 className="text-md font-semibold text-gray-800">
                                        {skill.name}
                                    </h5>

                                    <p className="text-xs text-gray-500 mt-1 mb-2">
                                        {skill.shortDesc}
                                    </p>

                                    {/* Progress */}
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-in-out"
                                            style={{ width: `${(skill.experience / 10) * 100}%` }}
                                        ></div>
                                    </div>

                                    <span className="text-xs text-gray-600 mt-1 block">
                                        {skill.experience} yrs
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
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