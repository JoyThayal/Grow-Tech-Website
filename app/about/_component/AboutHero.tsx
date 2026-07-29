export default function AboutSection() {
  return (
    <section className="relative flex w-full overflow-hidden px-5 py-16 text-center text-gray-300 sm:px-6 lg:px-10 xl:px-16">
      {/* Background Lines */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="80"
            x2="100"
            y2="20"
            stroke="#C9A86A"
            strokeWidth="0.4"
          />

          <line
            x1="0"
            y1="60"
            x2="100"
            y2="0"
            stroke="#C9A86A"
            strokeWidth="0.2"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="cabinet gradient-text mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Crafting Digital Excellence: Where Friendship Meets Innovation!
        </h2>

        <p className="garet text-sm leading-8 font-light text-gray-400 sm:text-base md:text-lg">
          We are a powerhouse team of four dedicated developers and tech
          experts—
          <span className="font-medium text-[#C9A86A]"> Joy Thayal</span>,
          <span className="font-medium text-[#C9A86A]"> Aman Shaw</span>,
          <span className="font-medium text-[#C9A86A]"> Bijoy Thayal</span>, and
          <span className="font-medium text-[#C9A86A]"> Biprajit Paul</span>. At
          <span className="font-semibold text-cyan-400"> Grow Tech</span>, we
          are passionate about building the next generation of digital
          experiences. Our team transforms complex ideas into
          <span className="font-semibold text-cyan-400"> Websites</span>,
          <span className="font-semibold text-cyan-400"> Mobile Apps</span>,
          <span className="font-semibold text-cyan-400"> Immersive Games</span>,
          and
          <span className="font-semibold text-cyan-400">
            {" "}
            Robust Hardware Solutions
          </span>
          . By combining technical expertise, creativity, and a shared vision,
          we deliver scalable digital solutions that help businesses thrive in
          an ever-evolving world.
        </p>
      </div>
    </section>
  );
}
