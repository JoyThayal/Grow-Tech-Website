import HeroSection from "./_components/Hero";
import SolutionsSection from "./_components/Solutions";
import DetailsSection from "./_components/Details";
import FeaturesSection from "./_components/Features";
import HeroEcosystemSection from "./_components/HeroEcosystem";
import TechSection from "./_components/TechSection";
import FaqSection from "./_components/FaqSection";
import ElasticDivider from "@/components/ui/ElasticDivider";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <ElasticDivider />

      <SolutionsSection />
      <DetailsSection />

      <ElasticDivider />

      <FeaturesSection />
      <HeroEcosystemSection />

      <ElasticDivider />

      <TechSection />
      <FaqSection />
    </main>
  );
}
