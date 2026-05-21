
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceFAQ from "@/components/ExperienceFAQ";
export default function ExperiencePage() {

    return (
        <>
            <main className="py-15">
                <section id="experience">
                    <ExperienceCard />
                </section>

                <div className='mx-16 my-5'>
                    <ExperienceFAQ />
                </div>

            </main>
        </>

    );
}
