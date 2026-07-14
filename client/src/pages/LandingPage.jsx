// Blood Groups, FAQ, Testimonials, CTA, Footer are added in Step 4.
import Navbar from "../components/landing/Navbar.jsx";
import Hero from "../components/landing/Hero.jsx";
import WhyDonate from "../components/landing/WhyDonate.jsx";
import Benefits from "../components/landing/Benefits.jsx";
import Services from "../components/landing/Services.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyDonate />
      <Benefits />
      <Services />
      <HowItWorks />

      <div className="section-container text-center text-sm text-gray-400">
        🚧 বাকি সেকশনগুলো (Blood Groups, FAQ, Testimonials, CTA, Footer) Step 4
        এ আসছে
      </div>
    </div>
  );
}
