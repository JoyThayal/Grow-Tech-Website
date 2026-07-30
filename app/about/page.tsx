import AboutHeroSection from "./_components/AboutHero";
import OurVisionSection from "./_components/OurVisionSection";
import TeamSection from "./_components/TeamSection";
import OurGrowthSection from "./_components/OurGrowthSection";
import DevelopmentLifecycle from "./_components/DevelopmentLifecycle";
import FeaturesSection from "./_components/FeaturesSection";
import CTASection from "./_components/CTASection";

export default function AboutSection() {
  return (
    <main>
      <AboutHeroSection />
      <OurVisionSection />
      <TeamSection />
      <OurGrowthSection />
      <DevelopmentLifecycle />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}