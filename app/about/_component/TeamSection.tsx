import { Globe, Smartphone, Gamepad2, Cpu } from "lucide-react";

const teamMembers = [
  {
    name: "Joy Thayal",
    role: "WEB DEVELOPER",
    description:
      "Mastering the art of full-stack web solutions with technical planning and high-performance digital architecture.",
    icon: Globe,
  },
  {
    name: "Aman Shaw",
    role: "APP DEVELOPER",
    description:
      "Leading the mobile revolution with seamless, user-centric app management and cross-platform development strategies.",
    icon: Smartphone,
  },
  {
    name: "Bijoy Thayal",
    role: "GAME DEVELOPER",
    description:
      "Pushing the boundaries of imagination by creating immersive, high-quality 2D/3D gaming experiences.",
    icon: Gamepad2,
  },
  {
    name: "Biprajit Paul",
    role: "HARDWARE EXPERT",
    description:
      "Ensuring technical stability through expert hardware diagnostics, precision repairs, and infrastructure maintenance.",
    icon: Cpu,
  },
];

export default function TeamSection() {
  return (
    <section className="w-full px-5 py-16 text-center sm:px-6 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <span className="golden-tag">THE VISIONARIES BEHIND GROW TECH</span>

          <h2 className="cabinet mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">Meet Our Expert Team</span>
          </h2>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map(
            ({ name, role, description, icon: IconComponent }) => (
              <article
                key={name}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A86A]/40 hover:shadow-lg hover:shadow-[#C9A86A]/10"
              >
                <div className="mb-5 flex justify-center text-[#C9A86A] transition-transform duration-300 group-hover:scale-110">
                  <IconComponent size={38} strokeWidth={1.5} />
                </div>

                <h3 className="cabinet text-2xl font-bold tracking-wide text-white">
                  {name}
                </h3>

                <p className="garet mt-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  {role}
                </p>

                <p className="garet mt-5 text-sm leading-relaxed text-gray-400">
                  {description}
                </p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
