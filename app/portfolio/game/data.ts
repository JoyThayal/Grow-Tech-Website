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
    title: "Farmer Runner",
    rating: "4.9",
    tags: ["Unity", "C#", "Blender"],
    description:
      "A 2D platformer game where you play as a farmer trying to escape a zombie apocalypse.",
    imageSrc: "farmer-runner.png",
    trailerUrl: "farmer-runner.mp4",
    downloadUrl: "/game-apks/Farmer Runner.apk",
  },
  {
    id: "g2",
    title: "Game Coming Soon",
    description: "More games coming soon, stay tuned for the latest updates.",
    imageSrc: "game-coming-soon.png",
    isComingSoon: true,
  },
];
