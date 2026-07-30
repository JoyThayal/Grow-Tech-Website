import HeroSection from "./_components/Hero";
import SolutionsSection from "./_components/Solutions";
import DetailsSection from "./_components/Details";
import FearuresSection from "./_components/Features";
import HeroEcosystemSection from "./_components/HeroEcosystem";
import TechSection from "./_components/TechSection";
import FaqSection from "./_components/FaqSection";

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