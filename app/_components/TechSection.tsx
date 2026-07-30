import {
  Atom,
  Smartphone,
  Code2,
  Gamepad2,
  Server,
  Cpu,
  Database,
  Flame,
} from "lucide-react";

const techCards = [
  {
    title: "React & Next.js",
    description:
      "We build blazing fast, SEO-friendly, and highly interactive web interfaces for modern businesses.",
    icon: Atom,
  },
  {
    title: "Flutter",
    description:
      "Crafting mobile apps that bring your ideas to life and deliver exceptional user experiences.",
    icon: Smartphone,
  },
  {
    title: "HTML & CSS",
    description:
      "Crafting visually stunning and user-friendly interfaces that captivate and engage your audience.",
    icon: Code2,
  },
  {
    title: "Unity 3D",
    description:
      "Developing immersive 2D/3D games with high-end graphics and smooth gameplay mechanics.",
    icon: Gamepad2,
  },
  {
    title: "Node.js & Express",
    description:
      "Powering your applications with scalable, secure, and high-performance server-side architectures.",
    icon: Server,
  },
  {
    title: "Hardware Precision",
    description:
      "Expert-level diagnostics and repair solutions for advanced computing and networking hardware.",
    icon: Cpu,
  },
  {
    title: "Modern Databases",
    description:
      "Ensuring data integrity and speed with advanced SQL and NoSQL database structures.",
    icon: Database,
  },
  {
    title: "Firebase",
    description:
      "Simplifying app development and ensuring secure authentication and data storage.",
    icon: Flame,
  },
];

export default function TechSection() {
  return (
    <section className="w-full px-5 py-16 text-white sm:px-6 lg:py-20">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-14">
        <span className="golden-tag">OUR POWERHOUSE</span>

        <div>
          <h2 className="cabinet gradient-text mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Modern Technologies We
          </h2>
        </div>

        <h3 className="cabinet gradient-text text-2xl font-black italic uppercase tracking-wide sm:text-3xl md:text-4xl">
          Master & Use
        </h3>

        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C9A86A]" />
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {techCards.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/80 transition duration-300 group-hover:scale-110 group-hover:text-cyan-300">
              <Icon
                size={24}
                className="text-cyan-400 transition-colors duration-300"
              />
            </div>

            <h4 className="cabinet mb-3 text-xl font-bold tracking-wide text-slate-100 transition-colors duration-300 group-hover:text-white">
              {title}
            </h4>

            <p className="garet text-sm leading-relaxed font-light text-slate-400">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
