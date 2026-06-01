import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/upsc-notes", destination: "/", permanent: true },
      { source: "/upsc-notes/all", destination: "/", permanent: true },
      { source: "/upsc-notes/polity", destination: "/indian-polity", permanent: true },
      { source: "/upsc-notes/ancient", destination: "/ancient-history", permanent: true },
      { source: "/upsc-notes/medieval", destination: "/medieval-history", permanent: true },
      { source: "/upsc-notes/history", destination: "/modern-history", permanent: true },
      { source: "/upsc-notes/culture", destination: "/art-culture", permanent: true },
      { source: "/upsc-notes/geo", destination: "/geography", permanent: true },
      { source: "/upsc-notes/worldgeo", destination: "/world-geography", permanent: true },
      { source: "/upsc-notes/economy", destination: "/economy", permanent: true },
      { source: "/upsc-notes/environment", destination: "/environment", permanent: true },
      { source: "/upsc-notes/science", destination: "/science-technology", permanent: true },
      { source: "/upsc-notes/ir", destination: "/international-relations", permanent: true },
      { source: "/upsc-notes/governance", destination: "/governance", permanent: true },
      { source: "/upsc-notes/security", destination: "/internal-security", permanent: true },
      { source: "/upsc-notes/ethics", destination: "/ethics", permanent: true },
      { source: "/upsc-notes/current", destination: "/current-affairs", permanent: true },
      {
        source: "/upsc-notes/ancient-history",
        destination: "/ancient-history",
        permanent: true,
      },
      {
        source: "/upsc-notes/ancient-history-complete-upsc-notes.html",
        destination: "/ancient-history",
        permanent: true,
      },
      {
        source: "/upsc-notes/ancient/:topicId",
        destination: "/ancient-history/:topicId",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
