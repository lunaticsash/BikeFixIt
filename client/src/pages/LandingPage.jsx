import { useTheme } from '../context/ThemeContext.jsx';
import Navbar from '../components/landing/Navbar.jsx';
import Hero from '../components/landing/Hero.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import VehicleStrip from '../components/landing/VehicleStrip.jsx';
import Footer from '../components/landing/Footer.jsx';

export default function LandingPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0e0d] text-white' : 'bg-white text-zinc-900'}`}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <VehicleStrip />
      <Footer />
    </div>
  );
}