import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="w-full flex justify-center">
          <div className="p-4 rounded-xl border border-gray-300">
            <div className="w-200 flex between gap-5">
              <div className="w-42 h-42 rounded-full overflow-hidden">
                <img src="/prawez.JPEG" alt="profile" className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center justify-center">
                <div className="">
                  <div className="text-lg font-semibold text-gray-600">
                    Er. Pravej Alam
                  </div>
                  <div className="text-sm text-gray-500">
                    Expert Full Stack Developer
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    +977 9804083811
                  </div>
                  <div className="text-sm text-gray-500">
                    prawezalam9@gmail.com
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>


      <div className="container mx-auto p-4">
        <div className="w-full flex justify-center">
          <div className="p-4 rounded-xl border border-gray-300">
            <div className="w-200 flex between gap-5">
              <div className="flex items-center justify-center">
                <div className="">
                  <div className="text-lg font-semibold text-gray-600">
                    About
                  </div>
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
        </div>

      </div>

    </>
  )

}
