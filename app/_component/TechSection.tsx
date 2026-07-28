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

export default function TechSection() {
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

  return (
    <section className="w-full text-white py-20 px-6 flex flex-col items-center justify-center">
      {/* 🏷️ Header Section */}
      <div className="text-center space-y-2 mb-14">
        <span className="golden-tag">
          OUR POWERHOUSE
        </span>

        <h2 className="cabinet text-4xl gradient-text">
          Modern Technologies we
        </h2>

        <h3 className="cabinet text-4xl font-extrabold italic tracking-wide gradient-text text-slate-200">
          MASTER & USE
        </h3>

        {/* Underline Bar */}
        <div className="w-16 h-1 bg-[#C9A86A] mx-auto rounded-full mt-3" />
      </div>

      {/* 📦 8-Card Grid Layout */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {techCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-[#ffffff08] border border-[#ffffff14] hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition duration-300">
                  <Icon size={24} />
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-slate-100 group-hover:text-white transition cabinet tracking-wider">
                  {card.title}
                </h4>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed font-light garet">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
