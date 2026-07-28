import HeroSection from "./_component/Hero";
import SolutionsSection from "./_component/Solutions";
import DetailsSection from "./_component/Details";
import FearuresSection from "./_component/Features";
import HeroEcosystemSection from "./_component/HeroEcosystem";
import TechSection from "./_component/TechSection";
import FaqSection from "./_component/FaqSection";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <SolutionsSection />
      <DetailsSection />
      <FearuresSection />
      <HeroEcosystemSection />
      <TechSection />
      <FaqSection />
    </main>
  );
}