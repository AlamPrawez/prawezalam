// import About from "@/components/About";
// import DevOpsSection from "@/components/DevOpsSection";
// import ExperienceCard from "@/components/ExperienceCard";
// import Expertise from "@/components/Expertise";
import ServicesSectionNew from "@/components/client/ServicesSection";
import Faq , { FAQItem } from "@/components/Faq";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import {faqs} from "./layout"



export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-15">
        <section id="home">
          <ProfileCard />
        </section>
        <section id="professional-service">
          {/* <ServicesSection /> */}
          <ServicesSectionNew />
        </section>
        <div className="px-40 py-20">
        <Faq faqs={faqs}/>
        </div>
      </main>
      <Footer />
    </>
  )

}
