import React from "react";

export const devopsSkills = [
    { name: "Git", img: "/skills/git.png" },
    { name: "GitHub", img: "/skills/github.png" },
    { name: "GitLab", img: "/skills/gitlab.png" },

    { name: "Jira", img: "/skills/jira.png" },

    { name: "Docker", img: "/skills/docker.png" },
    { name: "Kubernetes", img: "/skills/kubernetes.png" },

    { name: "cPanel", img: "/skills/cpanel.png" },
    { name: "Linux CLI", img: "/skills/linux.png" },

    { name: "VPS", img: "/skills/vps.png" },
    { name: "AWS EC2", img: "/skills/aws-ec2.png" },
    { name: "AWS S3", img: "/skills/aws-s3.png" },
    { name: "AWS ECR", img: "/skills/aws-ecr.png" },
    { name: "AWS ECS", img: "/skills/aws-ecs.png" },
    { name: "AWS Lambda", img: "/skills/aws-lambda.png" },
];


const DevOpsSection: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
                <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">
                    <section className="bg-white">
                        <div className="mx-auto max-w-7xl px-4">
                            {/* Heading */}
                            <div className="py-6 text-center sm:text-start">
                                <h2 className="text-lg font-bold text-gray-500">
                                    DevOps & Version Control
                                </h2>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {devopsSkills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="flex h-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md"
                                    >
                                        <img
                                            src={skill.img}
                                            alt={skill.name}
                                            className="mb-4 h-14 w-14 object-contain"
                                        />
                                        <h5 className="text-sm font-semibold text-gray-800">
                                            {skill.name}
                                        </h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>


    );
};

export default DevOpsSection;