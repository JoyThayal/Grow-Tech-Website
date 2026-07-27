import { Motorbike } from "lucide-react";

export default function FearuresSection() {
  const icons = [{
    icon: "Motorbike",
  }];
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-10">
      <div className="text-center">
        <span className="golden-tag">Our Capabilities</span>
        <h2 className="cabinet gradient-text text-4xl">
          <span>Everything you need to</span>
          <span>Scale your Digital Presence</span>
        </h2>
      </div>

      <div className="w-full h-50 grid grid-cols-2 place-items-stretch gap-5">
        <div className="bg-[#ffffff08] border border-[#ffffff14]">
          <h1>Multi-Platform Digital Solutions</h1>
          <p>
            We don&apos;t limit your vision to just one screen. From
            high-performance web applications to native mobile experiences and
            immersive games, we build across all platforms using the latest tech
            stacks to ensure your business stays ahead.
          </p>

          <div>
            <div>
              {icons.map((icon, index) => (
                <span key={index}>
                  <icon.icon />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#ffffff08] border border-[#ffffff14] row-span-2"></div>
        <div className="bg-[#ffffff08] border border-[#ffffff14]"></div>
      </div>
    </section>
  );
}
