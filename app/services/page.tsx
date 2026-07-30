import HeroSection from "./_components/HeroSection";
import ExpertiseSection from "./_components/ExpertiseSection";
import TechStackSection from "./_components/TechStackSection"
import SustainabilitySection from "./_components/SustainabilitySection";
import FaqSection from "../_components/FaqSection";
import ElasticDivider from "@/components/ElasticDivider";

export default function ServicesPage() {
  return (
    <div>
      <HeroSection />
      <ExpertiseSection />
      <ElasticDivider />
      <TechStackSection />
      <ElasticDivider />
      <SustainabilitySection />
      <ElasticDivider />
      <FaqSection />
    </div>
  );
}