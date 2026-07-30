import React from "react";
import PortfolioTabs from "./_components/PortfolioTabs";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="pt-10 px-5 sm:px-6 lg:px-12">
          <PortfolioTabs />
        </div>

        {children}
      </div>
    </div>
  );
}
