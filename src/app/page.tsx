import About from "@/components/About";
import DevOpsSection from "@/components/DevOpsSection";
import ExperienceCard from "@/components/ExperienceCard";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import ServicesSection from "@/components/Services";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-15">
        <section id="home">
          <ProfileCard />
        </section>
        <section id="service">
          <ServicesSection />
        </section>
      </main>
      <Footer />
    </>
  )

}
