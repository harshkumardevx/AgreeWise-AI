import CTA from "@/components/home/CTA";
import DashboardShowcase from "@/components/home/DashboardShowcase";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Features/>
      <HowItWorks/>
      <DashboardShowcase/>
      <Testimonials/>
      <FAQ/>
      <CTA/>
      <Footer/>
    </>
  );
};

export default Home;