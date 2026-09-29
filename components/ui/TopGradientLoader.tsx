"use client";

import NextTopLoader from "nextjs-toploader";

export default function TopGradientLoader() {
  return (
    <NextTopLoader
      color="#00e5ff"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 12px #00e5ff, 0 0 5px #00e5ff"
      template='<div class="bar" role="bar"><div class="peg"></div></div>'
      zIndex={999999}
      showAtBottom={false}
    />
  );
}
