import Feature1 from "@/app/_components/features-section/features-1";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-10 py-16 lg:py-20 px-5 md:px-8 lg:px-15">
      <div className="text-center space-y-2">
        <span className="golden-tag">Our Capabilities</span>

        <div>
          <h2 className="cabinet text-2xl lg:text-4xl flex flex-col gradient-text">
            Everything you need to <br />
            Scale your Digital Presence
          </h2>
        </div>
      </div>

      <div className="w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          <Feature1 />

          <div className="bg-[#ffffff08] border border-[#ffffff14] p-6 lg:p-10 space-y-5 rounded-2xl text-center lg:text-left">
            <h3 className="cabinet text-xl lg:text-2xl gradient-text">
              Scale Your Business with Innovation
            </h3>

            <p className="garet text-gray-400">
              Transform your traditional workflow into a digital powerhouse. Our
              custom-built software solutions are designed to automate your
              processes, engage your customers, and drive measurable growth for
              your brand.
            </p>

            {/* 🚀 ৩টি কোর সার্ভিস ট্যাগ (Web, App, Game) */}
            <div className="grid grid-cols-3 gap-3">
              <span className="bg-[#ffffff0a] border border-[#ffffff1a] p-2.5 lg:p-3 rounded-xl text-center text-xs lg:text-sm font-medium text-cyan-300">
                Web Development
              </span>

              <span className="bg-[#ffffff0a] border border-[#ffffff1a] p-2.5 lg:p-3 rounded-xl text-center text-xs lg:text-sm font-medium text-white">
                App Engineering
              </span>

              <span className="bg-[#ffffff0a] border border-[#ffffff1a] p-2.5 lg:p-3 rounded-xl text-center text-xs lg:text-sm font-medium text-[#c9a86a]">
                Game Creation
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-[#ffffff08] border border-[#ffffff14] rounded-2xl p-6 lg:p-10 flex flex-col justify-between min-h-auto lg:min-h-100 gap-6">
          <span className="bg-[#ffffff0a] border border-[#ffffff1a] px-3 py-2 lg:px-4 rounded-full text-center w-fit text-xs font-mono text-cyan-300">
            ⌘ + S
          </span>

          <div className="space-y-3">
            <h3 className="cabinet text-xl lg:text-2xl gradient-text">
              Why Choose Grow Tech?
            </h3>

            <p className="garet text-gray-400 leading-relaxed">
              We bring an agile and future-proof approach to digital products.
              Whether it&apos;s architecting fast, responsive web systems,
              engineering scalable mobile platforms, or designing captivating
              interactive games—our collective engineering focus ensures your
              digital journey is seamless and impactful.
            </p>
          </div>

          <Image
            src="/images/all.png"
            width={600}
            height={100}
            alt="Grow Tech capabilities"
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
