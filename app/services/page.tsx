import HeroSection from "./_component/HeroSection";
import ExpertiseSection from "./_component/ExpertiseSection";
import TechStackSection from "./_component/TechStackSection"
import SustainabilitySection from "./_component/SustainabilitySection";
import FaqSection from "../_component/FaqSection";

export default function ServicesPage() {
  return (
    <div>
      <HeroSection />
      <ExpertiseSection />
      <TechStackSection />
      <SustainabilitySection />
      <FaqSection />
    </div>
  );
}