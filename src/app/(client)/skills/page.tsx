import DevOpsSection from "@/components/DevOpsSection";
import Expertise from "@/components/Expertise";

export default function SkillPage() {

    return (
        <>
            <main className="py-15">
                <section id="skills">
                    <Expertise />
                    <DevOpsSection />
                </section>
            </main>
        </>

    );
}
