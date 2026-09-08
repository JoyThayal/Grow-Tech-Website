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
}

export const gameProjects: GameProject[] = [
  {
    id: "g1",
    title: "Flappy Adventurer",
    rating: "4.8",
    tags: ["Unity", "C#", "2D Arcade", "Endless Runner"],
    description:
      "Tap to flap and dodge challenging obstacles! Test your reflexes and set unbeatable high scores in this addictive 2D endless adventure.",
    imageSrc: "flappy-adventurer.png",
    trailerUrl: "flappy-bird.mp4",
    downloadUrl: "/game-apks/Flappy-Adventurer.apk",
  },
  {
    id: "g3",
    title: "Open World Zombie Shooter",
    tags: ["Unity", "C#", "Open World"],
    description:
      "An upcoming open-world 3D zombie survival shooter where players explore a dangerous world, battle endless zombie hordes, gather resources, and fight to survive. Currently in active development.",
    imageSrc: "zombie-zone.png",
    isComingSoon: true,
  },
  {
    id: "g4",
    title: "Game Coming Soon",
    description: "More games coming soon, stay tuned for the latest updates.",
    imageSrc: "game-coming-soon.png",
    isComingSoon: true,
  },
];
