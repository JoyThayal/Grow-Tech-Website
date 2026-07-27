import Image from "next/image";
import Button from "@/components/Button";
import { ArrowRight } from "lucide-react";

export default function DetailsSection() {
  const details = [
    {
      id: 1,
      image: "/images/website-development.png",
      alt: "Website Development",
      title: "Modern Web Development",
      description:
        "Elevate your brand with high-performance, SEO-optimized, and fully responsive websites. Led by Joy Thayal, we specialize in React, Next.js, and Full-Stack solutions to ensure your business stays ahead in the digital era.",
      buttonText: "Start Developing",
      buttonLink: "",
    },
    {
      id: 2,
      image: "/images/app-development.png",
      alt: "App Development",
      title: "Custom Mobile Apps",
      description:
        "Our app team, led by CEO Aman Shaw, builds intuitive and powerful Android applications. We focus on seamless user interfaces (UI) and robust performance to connect you with your customers on the go.",
      buttonText: "Build Your App",
      buttonLink: "",
    },
    {
      id: 3,
      image: "/images/game-development.png",
      alt: "Game Development",
      title: "Immersive Game Development",
      description:
        "Bijoy Thayal leads our gaming division, creating high-quality 2D and 3D games. From concept to deployment, we deliver engaging gameplay and stunning graphics that keep players hooked and entertained.",
      buttonText: "Level Up Now",
      buttonLink: "",
    },
    {
      id: 4,
      image: "/images/comuter-repairing.png",
      alt: "Computer Repairing",
      title: "Expert Computer Repairing",
      description:
        "Technical glitch? Biprajit Paul and his team are here to help. From hardware diagnostics to complex repairs, we ensure your devices are back in top shape with our professional and reliable repairing services.",
      buttonText: "Fix My Device",
      buttonLink: "",
    },
    {
      id: 5,
      image: "/images/tech-support.png",
      alt: "Tech Support",
      title: "24/7 Tech Support",
      description:
        "We don't just build; we maintain. Our dedicated support team ensures your digital platforms run without a glitch. We provide 24/7 maintenance, server management, and troubleshooting to protect your digital investment.",
      buttonText: "Get Support",
      buttonLink: "",
    },
  ];
  return (
    <section className="w-full min-h-screen py-20">
      {details.map((detail, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={detail.id}
            className={`flex flex-col md:flex-row items-center justify-center px-10 gap-10 ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="w-1/2">
              <Image
                width={650}
                height={550}
                src={detail.image}
                alt={detail.alt}
                className="w-auto h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="w-1/2 space-y-4">
              <h2 className="cabinet text-4xl font-bold gradient-text">
                {detail.title}
              </h2>
              <p className="garet">{detail.description}</p>
              <Button href={detail.buttonLink} variant="outline">
                {detail.buttonText}
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
