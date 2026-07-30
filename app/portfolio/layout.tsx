import React from "react";
import PortfolioTabs from "./_components/PortfolioTabs";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <PortfolioTabs />

        {children}
      </div>
    </div>
  );
}
