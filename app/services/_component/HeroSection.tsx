import Button from "@/components/Button";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center px-15 py-20 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/luxery1.mp4" type="video/mp4" />
      </video>

      {/* Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          {/* Main Title with Cabinet & Gradient */}
          <h1 className="cabinet text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            <span className="block gradient-text">Innovating</span>
            <span className="block gradient-text">Tomorrow&apos;s</span>
            <span className="block gradient-text">Technology, Today.</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="garet text-slate-300 text-base md:text-lg max-w-xl leading-relaxed mb-8">
            Transforming complex challenges into high-performance digital
            solutions with Grow Tech&apos;s expert engineering.
          </p>

          <Button href="/services" variant="primary" size="lg">Discover Solutions</Button>
        </div>

        {/* Right Side Glassmorphism Box */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          {/* Glass Card */}
          <div className="border border-[#c9a86a33] backdrop-blur-md rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl">
            <p className="garet text-slate-200 text-sm sm:text-base leading-relaxed">
              At <span className="font-bold text-[#c9a86a]">Grow Tech</span>, we
              don&apos;t just build software; we engineer excellence. Our team
              delivers bespoke Websites, Mobile Applications, Immersive Games,
              and Hardware Infrastructure designed to scale your vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
