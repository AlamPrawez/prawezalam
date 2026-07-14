// src/app/(client)/about/page.tsx
import About from "@/components/About";
import AboutFAQ from "@/components/AboutFAQ";
export default function AboutPage() {
    return (
        <main className="py-20">
            {/* Visual Header / Showcase */}
            <section id="about">
                <About />
            </section>

            {/* Interactive FAQs */}
            <div className='sm:mx-7 mx-5 my-10'>
                <AboutFAQ />
            </div>
        </main>
    );
}





// import About from "@/components/About";
// import AboutFAQ from "@/components/AboutFAQ";

// export default function AboutPage() {

//     return (
//         <>
//             <main className="py-20">
//                 <section id="about">
//                     <About />
//                 </section>
//                 <div className='sm:mx-7 mx-5 my-10'>
//                     <AboutFAQ />
//                 </div>
//             </main>
//         </>

//     );
// }
