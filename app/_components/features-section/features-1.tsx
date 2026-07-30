import {
  Globe,
  Code,
  Smartphone,
  Layout,
  Server,
  Database,
  Cpu,
  Layers,
  Gamepad2,
  Wrench,
  Monitor,
  ShieldCheck,
  Zap,
  Sparkles,
  Terminal,
  Headphones,
} from "lucide-react";

export default function Feature1() {
  const topRowIcons = [
    { icon: Globe },
    { icon: Code },
    { icon: Smartphone },
    { icon: Layout },
    { icon: Server },
    { icon: Database },
    { icon: Cpu },
    { icon: Layers },
  ];

  const bottomRowIcons = [
    { icon: Gamepad2 },
    { icon: Wrench },
    { icon: Monitor },
    { icon: ShieldCheck },
    { icon: Zap },
    { icon: Sparkles },
    { icon: Terminal },
    { icon: Headphones },
  ];

  const topDuplicated = [...topRowIcons, ...topRowIcons, ...topRowIcons, ...topRowIcons];
  const bottomDuplicated = [...bottomRowIcons, ...bottomRowIcons, ...bottomRowIcons, ...bottomRowIcons];

  return (
    <div className="bg-[#ffffff08] border border-[#ffffff14] p-6 lg:p-10 space-y-5 rounded-2xl">
      <div className="space-y-3 text-center lg:text-left">
        <h3 className="cabinet text-xl lg:text-2xl gradient-text">
          Multi-Platform Digital Solutions
        </h3>

        <p className="garet text-gray-400">
          We don&apos;t limit your vision to just one screen. From
          high-performance web applications to native mobile experiences and
          immersive games, we build across all platforms using the latest tech
          stacks to ensure your business stays ahead.
        </p>
      </div>

      <div className="space-y-5 overflow-hidden">
        {/* First Row */}
        <div className="flex overflow-hidden w-full">
          <div className="flex w-max will-change-transform animate-[scroll-left_18s_linear_infinite] lg:animate-[scroll-left_10s_linear_infinite]">
            {topDuplicated.map((item, index) => (
              <span
                key={index}
                className="bg-[#ffffff0d] border border-[#ffffff1a] p-3 lg:p-5 rounded-lg shrink-0 mr-3 lg:mr-5"
              >
                <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </span>
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="flex overflow-hidden w-full">
          <div className="flex w-max will-change-transform animate-[scroll-right_18s_linear_infinite] lg:animate-[scroll-right_10s_linear_infinite]">
            {bottomDuplicated.map((item, index) => (
              <span
                key={index}
                className="bg-[#ffffff0d] border border-[#ffffff1a] p-3 lg:p-5 rounded-lg shrink-0 mr-3 lg:mr-5"
              >
                <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
