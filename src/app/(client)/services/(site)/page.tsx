import ServicesSectionNew from "@/components/client/ServicesSection";
import ServicesSection from "@/components/Services";
import ServicesFAQ from "@/components/ServicesFAQ";
export default function ServicesPage() {

    return (
        <>
            <main className="py-15">
                <section id="services">
                    <ServicesSection />
                    <ServicesSectionNew />
                </section>
                
                <div className='mx-5 sm:mx-7 my-5 my-10'>
                <ServicesFAQ />
                </div>

            </main>
        </>

    );
}
