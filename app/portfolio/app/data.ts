export interface AppProject {
  id: string;
  title: string;
  highlightTitle: string;
  imageSrc: string;
  features: string[];
  videoUrl?: string; // 🔥 নতুন ফিল্ড
  apkUrl?: string;
}

export const completedAppProjects: AppProject[] = [
  {
    id: "c1",
    title: "Advanced",
    highlightTitle: "Task Manager",
    imageSrc: "task-manager.png",
    videoUrl: "/videos/task-manager.mp4",
    features: [
      "Task Creation & Management",
      "Goals Creation & Tracking",
      "Important Notes Creation",
      "List Creation & Management",
    ],
    apkUrl: "/app-apks/task-manager.apk",
  },
];

export const demoAppProjects: AppProject[] = [
  {
    id: "d1",
    title: "Simple UI Kit",
    highlightTitle: "Travello",
    imageSrc: "travello.png",
    videoUrl: "/videos/travello.mp4",
    features: [
      "Login / Registration Integrated",
      "Application handle multiple pages",
      "User can check user data in home page",
      "A simple demo traveling app",
    ],
    apkUrl: "/app-apks/travello.apk",
  },
  {
    id: "d2",
    title: "Demo",
    highlightTitle: "Chat App",
    imageSrc: "chat-app.png",
    videoUrl: "/videos/chat-app.mp4",
    features: [
      "Login / Registration Integrated",
      "Multi pages handling by app",
      "A demo chat logic integrated",
      "Email-Password / Google Authentication",
      "Theme feature integrated",
    ],
    apkUrl: "/app-apks/chat-app.apk",
  },
  {
    id: "d3",
    title: "Login / Register Screen",
    highlightTitle: "Fruzz Digital",
    imageSrc: "fruzz.png",
    videoUrl: "/videos/fruzz.mp4",
    features: [
      "Login / Registration Integrated",
      "Email-Password / Google Authentication",
      "User data editable feature added",
    ],
    apkUrl: "/app-apks/fruzz-digi.apk",
  },
];
