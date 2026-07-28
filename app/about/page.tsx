import AboutHeroSection from "./_component/AboutHero";
import OurVisionSection from "./_component/OurVisionSection";
import TeamSection from "./_component/TeamSection";
import OurGrowthSection from "./_component/OurGrowthSection";
import DevelopmentLifecycle from "./_component/DevelopmentLifecycle";
import FeaturesSection from "./_component/FeaturesSection";
import CTASection from "./_component/CTASection";

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