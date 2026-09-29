// app/loading.tsx
export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-4">
      {/* Grow Tech Neon Ring Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#1c2d66] border-t-cyan-400 animate-spin" />
        <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]" />
      </div>
      <p className="garet text-xs font-mono tracking-widest text-slate-400 uppercase">
        Loading Grow Tech...
      </p>
    </div>
  );
}
