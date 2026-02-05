import About from "@/components/About";
import DevOpsSection from "@/components/DevOpsSection";
import ExperienceCard from "@/components/ExperienceCard";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section id="home">
          <ProfileCard />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <ExperienceCard />
        </section>
        <section id="skills">
          <Expertise />
          <DevOpsSection />
        </section>
      </main>
      <Footer />
    </>
  )

}
