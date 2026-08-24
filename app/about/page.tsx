import AboutHeroSection from "./_components/AboutHero";
import OurVisionSection from "./_components/OurVisionSection";
import TeamSection from "./_components/TeamSection";
import OurGrowthSection from "./_components/OurGrowthSection";
import DevelopmentLifecycle from "./_components/DevelopmentLifecycle";
import FeaturesSection from "./_components/FeaturesSection";
import CTASection from "./_components/CTASection";
import ElasticDivider from "@/components/ui/ElasticDivider";

export default function AboutSection() {
  return (
    <main className="w-full overflow-x-hidden">
      <AboutHeroSection />
      <ElasticDivider />
      <OurVisionSection />
      <ElasticDivider />
      <TeamSection />
      <ElasticDivider />
      <OurGrowthSection />
      <ElasticDivider />
      <DevelopmentLifecycle />
      <ElasticDivider />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
