import DevOpsSection from "@/components/DevOpsSection";
import Expertise from "@/components/Expertise";
import SkillsFAQ from "@/components/SkillsFAQ";

export default function SkillPage() {

    return (
        <>
            <main className="py-15">
                <section id="skills">
                    <Expertise />
                    <DevOpsSection />
                </section>

                <div className='mx-16 my-5'>
                    <SkillsFAQ />
                </div>
            </main>
        </>

    );
}
