
import About from "@/components/About";
import AboutFAQ from "@/components/AboutFAQ";

export default function AboutPage() {

    return (
        <>
            <main className="py-20">
                <section id="about">
                    <About />
                </section>
                <div className='sm:mx-7 mx-5 my-10'>
                    <AboutFAQ />
                </div>
            </main>
        </>

    );
}
