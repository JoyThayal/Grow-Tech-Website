export interface WebProject {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  techStack: string[];
  liveUrl: string;
}

export const webProjectsData: WebProject[] = [
  {
    id: "01",
    title: "Lazarev Web Agency",
    description:
      "High-converting, precision-focused UI reproduction for modern AI & ML design agencies.",
    imageSrc:
      "https://res.cloudinary.com/inwomltf/image/upload/q_auto,f_auto/v1790690811/lazarev-website.png",
    techStack: ["NEXT.JS 15", "TAILWIND CSS", "FRAMER MOTION"],
    liveUrl: "https://lazarev-website-gt.netlify.app/",
  },
  {
    id: "02",
    title: "Gym Website",
    description:
      "Dynamic and modern fitness platform featuring interactive client reviews, articles, and training plans.",
    imageSrc:
      "https://res.cloudinary.com/inwomltf/image/upload/q_auto,f_auto/v1790690588/gym-website.png",
    techStack: ["TYPESCRIPT", "TAILWIND", "NEXT.JS"],
    liveUrl: "https://gym-power-website.vercel.app/",
  },
  {
    id: "03",
    title: "Restaurant Website",
    description:
      "Elegant culinary experience showcase with interactive menus, online reservations, and brand story.",
    imageSrc:
      "https://res.cloudinary.com/inwomltf/image/upload/q_auto,f_auto/v1790690797/restaurant-website.png",
    techStack: ["TYPESCRIPT", "TAILWIND", "NEXT.JS"],
    liveUrl: "https://bhojraj-restaurant.vercel.app/",
  },
  {
    id: "04",
    title: "Let's ABC Website",
    description:
      "A UK based Production Company crafted with clean typography and dark aesthetics.",
    imageSrc:
      "https://res.cloudinary.com/inwomltf/image/upload/q_auto,f_auto/v1790690818/lets-abc.png",
    techStack: ["NEXT.JS", "TYPESCRIPT", "THREE.JS"],
    liveUrl: "https://lets-abc.vercel.app/",
  },
  {
    id: "05",
    title: "Netpro IT Systems",
    description:
      "Robust, enterprise-grade web architecture designed for hardware and network infrastructure security.",
    imageSrc:
      "https://res.cloudinary.com/inwomltf/image/upload/q_auto,f_auto/v1790690812/netpro-it-website.png",
    techStack: ["REACT", "NODE.JS", "TAILWIND"],
    liveUrl: "https://netpro-it.netlify.app/",
  },
  {
    id: "06",
    title: "Infinity Maths Academy",
    description:
      "Interactive and modern educational platform designed for seamless online learning.",
    imageSrc:
      "https://res.cloudinary.com/inwomltf/image/upload/q_auto,f_auto/v1790690804/infinity-maths-academy.png",
    techStack: ["REACT", "TAILWIND", "NEXT.JS"],
    liveUrl: "https://infinity-maths-academy.netlify.app/",
  },
];
