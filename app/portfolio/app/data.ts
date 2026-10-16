export interface AppProject {
  id: string;
  title: string;
  highlightTitle: string;
  highlightColor: string;
  imageSrc: string;
  features: string[];
  videoUrl?: string;
  apkUrl?: string;
  category: "own" | "client"; // 👈 নতুন যোগ করা হলো
}

export const completedAppProjects: AppProject[] = [
  {
    id: "c1",
    title: "Advanced",
    highlightTitle: "Task Manager",
    highlightColor:
      "bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent",
    imageSrc: "task-manager.png",
    videoUrl:
      "https://res.cloudinary.com/inwomltf/video/upload/q_auto,f_auto/v1790686267/task-manager.mp4",
    features: [
      "Task Creation & Management",
      "Goals Creation & Tracking",
      "Important Notes Creation",
      "List Creation & Management",
    ],
    apkUrl:
      "https://github.com/JoyThayal/Grow-Tech-Website/releases/download/v1.0.0/task-manager.apk",
    category: "own", // 👈 Grow Tech-এর নিজস্ব
  },
  {
    id: "c2",
    title: "Weather Forecast App",
    highlightTitle: "Vayun",
    highlightColor:
      "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    imageSrc: "vayun_thumbnail.png",
    videoUrl:
      "https://res.cloudinary.com/inwomltf/video/upload/q_auto,f_auto/v1791791623/WhatsApp_Video_2026-10-07_at_9.39.20_AM.mp4",
    features: [
      "Easy location searching & getting correct weather information",
      "User can save location data locally",
      "Available screen refreshing for instant information",
      "Default location setup availability",
    ],
    apkUrl:
      "https://github.com/JoyThayal/Grow-Tech-Website/releases/download/v1.0.0/vayun.apk",
    category: "own", // 👈 Grow Tech-এর নিজস্ব
  },
  {
    id: "c3",
    title: "Food Delivery & Catering",
    highlightTitle: "Roy Biryani",
    highlightColor:
      "bg-gradient-to-r from-red-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]",
    imageSrc: "roy-biryani.png", // 👈 নিচে তোমার জন্য ইমেজটি জেনারেট করে দেওয়া হয়েছে
    videoUrl:
      "https://res.cloudinary.com/inwomltf/video/upload/q_auto,f_auto/v1792193542/roy-biryani-demo.mp4", // এখানে তোমার ডেমো ভিডিও লিঙ্ক বসাবে
    features: [
      "Smooth Online Biryani & Side Dishes Ordering",
      "Special Occasions Catering Services Booking",
      "Interactive Menu with Chicken, Mutton & Chaps",
      "Real-time Order Status & On-Time Delivery Tracking",
    ],
    apkUrl:
      "https://github.com/JoyThayal/Grow-Tech-Website/releases/download/v1.0.0/roy-biryani.apk", // তোমাদের ডেপ্লয় করা apk-র লিঙ্ক
    category: "client", // 👈 Client Works ট্যাবে দেখাবে
  },
];
