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
    </>
  )

}
