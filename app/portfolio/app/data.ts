export interface AppProject {
  id: string;
  title: string;
  highlightTitle: string;
  highlightColor: string;
  imageSrc: string;
  features: string[];
  videoUrl?: string;
  apkUrl?: string;
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
  },
  {
    id: "c2",
    title: "Weather Forecast App",
    highlightTitle: "Vayun",
    highlightColor:
      "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    imageSrc: "vayun_thumbnail.png",
    videoUrl:
      "https://res.cloudinary.com/inwomltf/video/upload/q_auto,f_auto/v1790686267/task-manager.mp4",
    features: [
      "Easy location searching & getting correct weather information",
      "User can save location data locally",
      "Available screen refreshing for instant information",
      "Default location setup availability",
    ],
    apkUrl:
      "https://github.com/JoyThayal/Grow-Tech-Website/releases/download/v1.0.0/vayun.apk",
  },
];

export const demoAppProjects: AppProject[] = [
  // {
  //   id: "d1",
  //   title: "Simple UI Kit",
  //   highlightTitle: "Travello",
  //   highlightColor: "text-red-500",
  //   imageSrc: "travello.png",
  //   videoUrl: "/videos/travello.mp4",
  //   features: [
  //     "Login / Registration Integrated",
  //     "Application handle multiple pages",
  //     "User can check user data in home page",
  //     "A simple demo traveling app",
  //   ],
  //   apkUrl: "/app-apks/travello.apk",
  // },
  // {
  //   id: "d2",
  //   title: "Demo",
  //   highlightTitle: "Chat App",
  //   highlightColor: "text-green-500",
  //   imageSrc: "chat-app.png",
  //   videoUrl: "/videos/chat-app.mp4",
  //   features: [
  //     "Login / Registration Integrated",
  //     "Multi pages handling by app",
  //     "A demo chat logic integrated",
  //     "Email-Password / Google Authentication",
  //     "Theme feature integrated",
  //   ],
  //   apkUrl: "/app-apks/chat-app.apk",
  // },
  // {
  //   id: "d3",
  //   title: "Login / Register Screen",
  //   highlightTitle: "Fruzz Digital",
  //   highlightColor: "text-cyan-500",
  //   imageSrc: "fruzz.png",
  //   videoUrl: "/videos/fruzz.mp4",
  //   features: [
  //     "Login / Registration Integrated",
  //     "Email-Password / Google Authentication",
  //     "User data editable feature added",
  //   ],
  //   apkUrl: "/app-apks/fruzz-digi.apk",
  // },
];
