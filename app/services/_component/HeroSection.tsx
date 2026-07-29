import Button from "@/components/Button";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-20 sm:px-8 lg:px-16">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/videos/luxery1.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12">
        {/* Left Content */}
        <div className="lg:col-span-7">
          <h1 className="cabinet mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            <span className="gradient-text">
              Innovating <br />
              Tomorrow&apos;s <br />
              Technology, Today.
            </span>
          </h1>

          <p className="garet mb-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Transforming complex challenges into high-performance digital
            solutions with Grow Tech&apos;s expert engineering.
          </p>

          <Button href="/services" variant="primary" size="lg">
            Discover Solutions
          </Button>
        </div>

        {/* Right Content */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <div className="w-full max-w-md rounded-3xl border border-[#c9a86a33] bg-white/5 p-8 backdrop-blur-xl sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <p className="garet text-sm leading-7 text-slate-200 sm:text-base">
              At <span className="font-semibold text-[#c9a86a]">Grow Tech</span>
              , we don&apos;t just build software—we engineer excellence. Our
              team delivers bespoke Websites, Mobile Applications, Immersive
              Games, and Hardware Infrastructure designed to scale your vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
