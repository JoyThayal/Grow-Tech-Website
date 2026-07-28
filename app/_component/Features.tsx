import Feature1 from "@/app/_component/features-section/features-1";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-10 py-20 px-5 md:px-15">
      <div className="text-center space-y-2">
        <span className="golden-tag">Our Capabilities</span>
        <h2 className="cabinet gradient-text text-4xl flex flex-col">
          <span>Everything you need to</span>
          <span>Scale your Digital Presence</span>
        </h2>
      </div>

      {/* 🟢 Grid Container: h-50 সরিয়ে h-auto করা হয়েছে এবং grid-cols-1 md:grid-cols-2 দেওয়া হয়েছে */}
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column: Feature 1 & Small Feature Card */}
        <div className="flex flex-col gap-5">
          <Feature1 />

          <div className="bg-[#ffffff08] border border-[#ffffff14] p-10 space-y-5 rounded-2xl">
            <h3 className="cabinet text-2xl gradient-text">
              Scale Your Business with Innovation
            </h3>
            <p className="garet text-gray-400">
              Transform your traditional workflow into a digital powerhouse. Our
              custom-built software solutions are designed to automate your
              processes, engage your customers, and drive measurable growth for
              your brand.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <span className="bg-[#ffffff0a] border border-[#ffffff1a] p-3 rounded-lg text-center">
                Web
              </span>
              <span className="bg-[#ffffff0a] border border-[#ffffff1a] p-3 rounded-lg text-center">
                App
              </span>
              <span className="bg-[#ffffff0a] border border-[#ffffff1a] p-3 rounded-lg text-center">
                Game
              </span>
              <span className="bg-[#ffffff0a] border border-[#ffffff1a] p-3 rounded-lg text-center">
                Hardware
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#ffffff08] border border-[#ffffff14] rounded-2xl p-10 flex flex-col justify-between min-h-100">
          <span className="bg-[#ffffff0a] border border-[#ffffff1a] px-4 py-2 rounded-full text-center w-fit">⌘ + S</span>
          <div className="space-y-3">
            <h3 className="cabinet text-2xl gradient-text">
              Why Choose Grow Tech?
            </h3>
            <p className="garet text-gray-400">
              Led by a team of four specialized experts, we bring a 360-degree
              approach to technology. Whether it&apos;s Joy&apos;s full-stack
              expertise, Aman&apos;s app management, Bijoy&apos;s gaming vision,
              or Biprajit&apos;s hardware precision—we ensure your digital
              journey is seamless and successful.
            </p>
          </div>

          <Image
            src="/images/all.png"
            width={600}
            height={100}
            alt=""
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
