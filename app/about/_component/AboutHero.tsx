export default function AboutSection() {
  return (
    <section className="relative w-full text-gray-300 py-16 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* ব্যাকগ্রাউন্ডের হালকা গোল্ডেন ডায়াগোনাল লাইন */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="80%"
            x2="100%"
            y2="20%"
            stroke="#c9a86a"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="60%"
            x2="100%"
            y2="0%"
            stroke="#c9a86a"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* হেডিং (তোমার .cabinet এবং .gradient-text ক্লাস ব্যবহার করা হয়েছে) */}
        <h2 className="cabinet gradient-text text-4xl font-extrabold tracking-tight drop-shadow-md">
          Crafting Digital Excellence: Where Friendship Meets Innovation!
        </h2>

        {/* প্যারাগ্রাফ (তোমার .garet ক্লাস এবং গোল্ডেন/সায়ান কালার হাইলাইট) */}
        <p className="garet text-sm md:text-base lg:text-lg leading-relaxed text-gray-400 font-normal">
          We are a powerhouse team of four dedicated developers and tech
          experts—
          <span className="text-[#c9a86a] font-medium">Joy Thayal</span>,{" "}
          <span className="text-[#c9a86a] font-medium">Aman Shaw</span>,{" "}
          <span className="text-[#c9a86a] font-medium">Bijoy Thayal</span>, and{" "}
          <span className="text-[#c9a86a] font-medium">Biprajit Paul</span>. At{" "}
          <span className="text-[#00f2fe] font-semibold">Grow Tech</span>, we
          are passionate about building the next generation of digital
          experiences. Our team specializes in turning complex ideas into
          high-performance{" "}
          <span className="text-[#00f2fe] font-semibold">Websites</span>,{" "}
          <span className="text-[#00f2fe] font-semibold">Mobile Apps</span>,{" "}
          <span className="text-[#00f2fe] font-semibold">Immersive Games</span>,
          and{" "}
          <span className="text-[#00f2fe] font-semibold">
            Robust Hardware Solutions
          </span>
          . With a perfect blend of youthful energy, technical expertise, and a
          shared vision, we create scalable solutions that help your business
          thrive in an ever-evolving digital world.
        </p>
      </div>
    </section>
  );
}
