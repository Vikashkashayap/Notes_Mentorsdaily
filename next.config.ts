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
      {
        source: "/medieval-history/medieval-topic01",
        destination: "/medieval-history/early-medieval-india-c-750-1200-ad",
        permanent: true,
      },
      {
        source: "/medieval-history/medieval-topic02",
        destination: "/medieval-history/the-chola-empire-c-850-1200-ad",
        permanent: true,
      },
      {
        source: "/medieval-history/medieval-topic03",
        destination:
          "/medieval-history/the-age-of-conflict-and-turkish-invasions-c-1000-1200-ad",
        permanent: true,
      },
      {
        source: "/medieval-history/medieval-topic04",
        destination: "/medieval-history/the-delhi-sultanate-1206-1526-ad",
        permanent: true,
      },
      {
        source: "/medieval-history/medieval-topic05",
        destination:
          "/medieval-history/vijayanagar-and-bahmani-kingdoms-1336-1646-ad",
        permanent: true,
      },
      {
        source: "/medieval-history/medieval-topic06",
        destination: "/medieval-history/the-mughal-empire-1526-1707-ad",
        permanent: true,
      },
      {
        source: "/medieval-history/medieval-topic07",
        destination: "/medieval-history/marathas-and-regional-states-1707-1818-ad",
        permanent: true,
      },
      {
        source: "/medieval-history/medieval-topic08",
        destination: "/medieval-history/bhakti-and-sufi-religious-movements",
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
