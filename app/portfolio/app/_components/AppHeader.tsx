import React from "react";

export default function AppHeader() {
  return (
    <div className="text-center flex flex-col items-center mb-16">
      <span className="golden-tag">
        Mobile Excellence
      </span>
      <h1 className="cabinet text-4xl sm:text-5xl font-bold tracking-tight">
        <span className="gradient-text">App Creation</span>
      </h1>
      <div className="w-14 h-0.5 bg-[#c9a86a] mt-5 rounded-full" />
    </div>
  );
}
