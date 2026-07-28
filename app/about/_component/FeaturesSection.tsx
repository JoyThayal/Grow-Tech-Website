import React from "react";
import { ShieldCheck, Zap, Users } from "lucide-react";

const FeaturesSection = () => {
  const cards = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#c9a86a]" />,
      title: "Unmatched Reliability",
      description:
        "We build robust digital ecosystems that don't just work; they thrive under pressure. Your business success is our ultimate reputation.",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#c9a86a]" />,
      title: "Agile Innovation",
      description:
        "As a young, high-energy team, we adapt to the latest tech stacks faster than industry standards, giving you a competitive edge.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#c9a86a]" />,
      title: "Direct Founder Access",
      description:
        "No middlemen. You talk directly to Joy, Aman, Bijoy, or Biprajit to ensure your vision is perfectly translated into reality.",
    },
  ];

  return (
    <section className="w-full px-15 py-16">
      {/* Header Area */}
      <div className="text-center mb-16">
        {/* Golden Tag with Druk Font */}
        <span className="golden-tag inline-block border border-[#c9a86a]/40 px-4 py-1.5 rounded-full mb-4">
          OUR DNA
        </span>

        {/* Main Heading with Cabinet Font & Gradient Text */}
        <h2 className="cabinet gradient-text text-4xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
          Why Partners Choose Grow Tech
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative bg-[#ffffff08] border border-[#ffffff14] rounded-3xl p-8 transition-all duration-300 hover:border-[#c9a86a]/50 hover:bg-[#161B2E] hover:shadow-[0_0_30px_rgba(201,168,106,0.15)] flex flex-col justify-between"
          >
            {/* Hover Badge / Active Dot (Top Right) */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-6 h-6 rounded-full border border-[#c9a86a]/50 flex items-center justify-center bg-[#0B0E17]">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"></div>
              </div>
            </div>

            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-6 group-hover:bg-[#1E2538] transition-colors">
                {card.icon}
              </div>

              {/* Title with Cabinet Font */}
              <h3 className="cabinet text-xl font-bold text-white mb-3 tracking-wide">
                {card.title}
              </h3>

              {/* Description with Garet Font */}
              <p className="garet text-slate-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
