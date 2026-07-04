import Navbar from '../components/landing/Navbar.jsx';
import Hero from '../components/landing/Hero.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import VehicleStrip from '../components/landing/VehicleStrip.jsx';
import Footer from '../components/landing/Footer.jsx';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0e0d] text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <VehicleStrip />
      <Footer />
    </div>
  );
}