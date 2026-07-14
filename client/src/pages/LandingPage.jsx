// Sections 3-4 (Why Donate, Benefits, Services, How It Works, Blood Groups,
// FAQ, Testimonials, CTA, Footer) are added in Steps 3-4.
import Navbar from "../components/landing/Navbar.jsx";
import Hero from "../components/landing/Hero.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      <div className="section-container text-center text-sm text-gray-400">
        🚧 বাকি সেকশনগুলো (Why Donate, Benefits, Services, How It Works, Blood
        Groups, FAQ, Testimonials, CTA, Footer) Step 3-4 এ আসছে
      </div>
    </div>
  );
}
