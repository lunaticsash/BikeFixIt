import { useTheme } from '../context/ThemeContext.jsx';
import Navbar from '../components/landing/Navbar.jsx';
import Hero from '../components/landing/Hero.jsx';
import Stats from '../components/landing/Stats.jsx';
import HowItHelps from '../components/landing/HowItHelps.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import WhyChoose from '../components/landing/WhyChoose.jsx';
import VehicleStrip from '../components/landing/VehicleStrip.jsx';
import CallToAction from '../components/landing/CallToAction.jsx';
import Footer from '../components/landing/Footer.jsx';
import CommonProblems from '../components/landing/CommonProblems.jsx';
import FAQ from '../components/landing/FAQ.jsx';

export default function LandingPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 animate-[fade-in-up_0.35s_ease-out_both]
      ${isDark ? 'bg-[#0f0e0d] text-white' : 'bg-white text-zinc-900'}
      bg-[linear-gradient(rgba(232,25,44,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(232,25,44,0.03)_1px,transparent_1px)]
      bg-size-[48px_48px]`}>
      <Navbar />
      <Hero />
      <Stats />
      <CommonProblems/>
      <HowItHelps />
      <HowItWorks />
      <WhyChoose />
      <VehicleStrip />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
}
