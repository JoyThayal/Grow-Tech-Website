export interface GameProject {
  id: string;
  title: string;
  rating?: string;
  tags?: string[];
  description: string;
  imageSrc: string;
  trailerUrl?: string;
  downloadUrl?: string;
  isComingSoon?: boolean;
  category: "own" | "client"; // 👈 Grow Tech Originals | Client Works
  serviceCategory: "3d" | "code" | "design" | "optimization"; // 👈 গেম সার্ভিসের ক্যাটাগরি
}

export const gameProjects: GameProject[] = [
  {
    id: "g1",
    title: "Flappy Adventurer",
    rating: "4.8",
    category: "own",
    serviceCategory: "code", // 👈 C# Scripting & Mechanics
    tags: ["Unity", "C#", "2D Arcade", "Endless Runner"],
    description:
      "Tap to flap and dodge challenging obstacles! Test your reflexes and set unbeatable high scores in this addictive 2D endless adventure.",
    imageSrc: "flappy-adventurer.png",
    trailerUrl:
      "https://res.cloudinary.com/inwomltf/video/upload/q_auto,f_auto/v1790686273/flappy-bird.mp4",
    downloadUrl:
      "https://github.com/JoyThayal/Grow-Tech-Website/releases/download/v1.0.0/Flappy-Bird.apk",
  },
  {
    id: "g2",
    title: "Physics Parkour",
    rating: "4.8",
    category: "own",
    serviceCategory: "code", // 👈 C# Scripting & Physics Mechanics
    tags: ["Unity", "C#", "2D Arcade", "Physics"],
    description:
      "Master momentum, precision leaps, and gravity-defying parkour stunts across dynamic obstacle courses.",
    imageSrc: "physics-parkour.png",
    trailerUrl:
      "https://res.cloudinary.com/inwomltf/video/upload/q_auto,f_auto/v1792686027/WhatsApp_Video_2026-10-22_at_9.43.55_PM.mp4",
    downloadUrl:
      "https://github.com/JoyThayal/Grow-Tech-Website/releases/download/v1.0.0/Parkour.apk",
  },
];
