import { Heart } from "lucide-react";
import { useState } from "react";

export default function LikeSection() {
  const [isLike, setIsLike] = useState(false);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsLike(!isLike)}
        className={`group flex items-center justify-center gap-2 rounded-full border px-4 py-2 transition-all duration-200
          ${
            isLike
              ? "border-pink-500/40 bg-pink-500/15 text-pink-500"
              : "border-white/10 bg-white/5 text-gray-400 hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400"
          }
        `}
      >
        <Heart
          size={18}
          strokeWidth={2}
          fill={isLike ? "currentColor" : "none"}
          className="transition-transform duration-200 group-active:scale-90"
        />

        <span className="text-sm font-medium">
          {isLike ? 1 : 0}
        </span>
      </button>

      <div>
        
      </div>
    </div>
  );
}
