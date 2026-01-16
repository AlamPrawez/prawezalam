import Image from "next/image";
import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">

            {/* Profile wrapper */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">

              {/* Profile image */}
              <div className="w-42 h-42 rounded-full overflow-hidden border border-gray-200">
                <img
                  src="/prawez.JPEG"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile info */}
              <div className="text-center sm:text-left">
                <div className="text-lg font-semibold text-gray-800">
                  Er. Pravej Alam
                </div>

                <div className="text-sm text-gray-500">
                  Expert Full Stack Developer
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  +977 9804083811
                </div>

                <div className="text-sm text-gray-500">
                  prawezalam9@gmail.com
                </div>

                <div className="flex justify-center sm:justify-start items-center gap-4 text-gray-500 mt-5">
                  <a
                    href="https://www.linkedin.com/in/prawez-alam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>

                  <a
                    href="https://github.com/AlamPrawez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800 transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>

                  <a
                    href="https://gitlab.com/prawezAlam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 transition-colors"
                    aria-label="GitLab"
                  >
                    <FaGitlab className="w-5 h-5" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">

            {/* About section */}
            <div className="space-y-4">

              <h2 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
                About
              </h2>

              <div className="space-y-3 text-sm leading-relaxed text-gray-600">
                <p>
                  Experienced Software Developer with a strong track record of delivering
                  high-quality, scalable web applications across diverse industries.
                </p>

                <p>
                  Specialized in building modern, responsive front-end solutions using
                  <span className="font-medium text-gray-800">
                    {" "}React.js, Vue.js, Nuxt.js, and Next.js
                  </span>.
                </p>

                <p>
                  Proficient in backend development with
                  <span className="font-medium text-gray-800">
                    {" "}Node.js, Express.js, NestJS, and Laravel (PHP)
                  </span>,
                  enabling end-to-end application development.
                </p>

                <p>
                  Highly skilled in full-stack architecture, RESTful API design, and writing
                  clean, reusable, and maintainable code.
                </p>

                <p>
                  Strong problem-solving ability with proven experience in debugging,
                  performance optimization, and system reliability improvements.
                </p>

                <p>
                  User-focused developer who values feedback-driven feature development to
                  create practical and impactful solutions.
                </p>

                <p>
                  Effective communicator and collaborative team player, experienced in agile,
                  remote, and independent working environments.
                </p>

                <p>
                  Continuously learning and adopting modern technologies, frameworks, and best
                  practices to stay ahead in a fast-evolving tech landscape.
                </p>

                <p>
                  Committed to delivering on-time, scalable, and business-driven solutions
                  that consistently exceed client expectations.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )

}
