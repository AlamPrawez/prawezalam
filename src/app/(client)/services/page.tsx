import ServicesSection from "@/components/Services";
import ServicesFAQ from "@/components/ServicesFAQ";
export default function SkillPage() {

    return (
        <>
            <main className="py-15">
                <section id="services">
                    <ServicesSection />
                </section>
                
                <div className='mx-5 sm:mx-7 my-5 my-10'>
                <ServicesFAQ />
                </div>

            </main>
        </>

    );
}
