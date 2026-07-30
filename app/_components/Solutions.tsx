import { Globe, Smartphone, Gamepad2, Cpu, ArrowRight } from "lucide-react";
import Button from "@/components/Button";

export default function SolutionsSection() {
  const solutions = [
    {
      id: 1,
      icon: Globe,
      title: "Web Development",
      description:
        "Most websites are slow, clunky brochures that lose users. We engineer custom, ultra-fast, animated modern platforms that grab attention instantly and convert casual visitors into high-paying clients.",
    },
    {
      id: 2,
      icon: Smartphone,
      title: "App Development",
      description:
        "Tired of buggy apps that crash under pressure? We build scalable, rock-solid mobile applications designed for flawless performance, keeping your users hooked and driving revenue straight from their pockets.",
    },
    {
      id: 3,
      icon: Gamepad2,
      title: "Game Development",
      description:
        "Stop wasting thousands on high user-acquisition costs. Our engaging, interactive, hyper-casual games build massive user engagement and viral loops, turning ordinary players into fanatical brand advocates.",
    },
    {
      id: 4,
      icon: Cpu,
      title: "Hardware Repairing",
      description:
        "A crashed system means lost data, broken workflows, and lost money. Our expert hardware diagnostics and rapid servicing eliminate technical bottlenecks instantly, keeping your daily business operations running at peak performance.",
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center gap-10 py-20 lg:py-0">
      {/* Heading */}
      <div className="flex flex-col justify-center items-center gap-2 uppercase px-6">
        <span className="golden-tag">What we do</span>

        <div className="text-center">
          <h2 className="cabinet text-[1.4rem] sm:text-3xl lg:text-4xl font-bold gradient-text">
            WE FIX YOUR TECH. WE SCALE YOUR BUSINESS
          </h2>
        </div>

        <div className="w-20 h-1 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full" />
      </div>

      {/* Cards */}
      <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-6 lg:gap-10 px-6 lg:px-10">
        {solutions.map((solution) => (
          <div
            key={solution.id}
            className="h-full flex flex-col items-center gap-5 bg-[#ffffff08] border border-[#ffffff1a] p-5 rounded-3xl hover:border-[#C9A86A] hover:shadow-lg hover:shadow-black transition group relative overflow-hidden before:absolute before:top-[-20%] before:-left-full before:h-[140%] before:w-[40%] before:rotate-25 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] before:transition-all before:duration-800 before:ease-in-out hover:before:left-[140%]"
          >
            <div className="w-18 h-18 lg:w-20 lg:h-20 bg-[#c9a86a14] border border-[#c9a86a33] rounded-full flex justify-center items-center">
              <solution.icon className="w-8 h-8 lg:w-10 lg:h-10 text-[#C9A86A]" />
            </div>

            <h3 className="cabinet text-xl lg:text-2xl font-bold gradient-text text-center">
              {solution.title}
            </h3>

            <p className="garet text-sm lg:text-md text-center text-gray-400">
              {solution.description}
            </p>
          </div>
        ))}
      </div>

      <Button href="/services" variant="primary" size="lg">
        EXPLORE SERVICES
        <ArrowRight size={18} />
      </Button>
    </section>
  );
}
