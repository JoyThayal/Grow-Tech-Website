import { Star } from "lucide-react";
export default function RatingSection() {
  return (
    <div className="flex items-center gap-1.5 shrink-0 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5">
      {" "}
      <Star
        size={16}
        strokeWidth={2}
        fill="currentColor"
        className="text-yellow-400"
      />{" "}
      <span className="text-sm font-semibold text-yellow-400"> 4.5 </span>{" "}
      <span className="text-[11px] text-cyan-400"> (1.2k) </span>{" "}
    </div>
  );
}
