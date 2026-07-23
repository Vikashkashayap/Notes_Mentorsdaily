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
      { source: "/upsc-notes/worldhistory", destination: "/world-history", permanent: true },
      { source: "/upsc-notes/world", destination: "/world-history", permanent: true },
      { source: "/upsc-notes/culture", destination: "/art-culture", permanent: true },
      { source: "/upsc-notes/postindependence", destination: "/post-independence", permanent: true },
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
      {
        source: "/upsc-notes/ethics-topic01-ethics-human-interface-upsc-notes.html",
        destination: "/ethics/ethics-and-human-interface",
        permanent: true,
      },
      {
        source: "/upsc-notes/ethics-topic02-attitude-social-influence-upsc-notes.html",
        destination: "/ethics/attitude-and-social-influence",
        permanent: true,
      },
      {
        source: "/upsc-notes/ethics-topic03-aptitude-civil-service-values-upsc-notes.html",
        destination: "/ethics/aptitude-and-foundational-values-for-civil-services",
        permanent: true,
      },
      {
        source: "/upsc-notes/ethics-topic04-emotional-intelligence-upsc-notes.html",
        destination: "/ethics/emotional-intelligence",
        permanent: true,
      },
      {
        source: "/upsc-notes/ethics-topic05-indian-moral-thinkers-upsc-notes.html",
        destination: "/ethics/indian-moral-thinkers-and-philosophers",
        permanent: true,
      },
      {
        source: "/upsc-notes/ethics-topic06-western-moral-philosophers-upsc-notes.html",
        destination: "/ethics/western-moral-philosophers",
        permanent: true,
      },
      {
        source: "/upsc-notes/ethics-topic07-public-administration-corporate-governance-upsc-notes.html",
        destination: "/ethics/public-administration-ethics-and-corporate-governance",
        permanent: true,
      },
      {
        source: "/upsc-notes/ethics-topic08-probity-governance-upsc-notes.html",
        destination: "/ethics/probity-in-governance",
        permanent: true,
      },
      {
        source: "/upsc-notes/ethics-topic09-case-study-frameworks-upsc-notes.html",
        destination: "/ethics/case-study-frameworks-and-answer-writing",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic01",
        destination: "/ethics/ethics-and-human-interface",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic02",
        destination: "/ethics/attitude-and-social-influence",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic03",
        destination: "/ethics/aptitude-and-foundational-values-for-civil-services",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic04",
        destination: "/ethics/emotional-intelligence",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic05",
        destination: "/ethics/indian-moral-thinkers-and-philosophers",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic06",
        destination: "/ethics/western-moral-philosophers",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic07",
        destination: "/ethics/public-administration-ethics-and-corporate-governance",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic08",
        destination: "/ethics/probity-in-governance",
        permanent: true,
      },
      {
        source: "/ethics/ethics-topic09",
        destination: "/ethics/case-study-frameworks-and-answer-writing",
        permanent: true,
      },
      {
        source: "/indian-polity/union-territory",
        destination: "/indian-polity/union-and-its-territory",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic01",
        destination: "/indian-polity/constitutional-framework",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic02",
        destination: "/indian-polity/salient-features-and-sources-of-the-constitution",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic03",
        destination: "/indian-polity/parts-and-schedules-of-the-constitution",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic04",
        destination: "/indian-polity/preamble-of-the-constitution",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic05",
        destination: "/indian-polity/union-and-its-territory",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic06",
        destination: "/indian-polity/citizenship",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic07",
        destination: "/indian-polity/fundamental-rights",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic08",
        destination: "/indian-polity/directive-principles-and-fundamental-duties",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic09",
        destination: "/indian-polity/amendment-and-basic-structure-doctrine",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic10",
        destination: "/indian-polity/parliament",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic11",
        destination: "/indian-polity/president-and-vice-president",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic12",
        destination: "/indian-polity/prime-minister-cabinet-and-com",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic13",
        destination: "/indian-polity/parliamentary-and-federal-system",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic14",
        destination: "/indian-polity/centre-state-relations",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic15",
        destination: "/indian-polity/emergency-provisions",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic16",
        destination: "/indian-polity/governor-cm-and-state-com",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic17",
        destination: "/indian-polity/state-legislature",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic18",
        destination: "/indian-polity/uts-scheduled-and-tribal-areas",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic19",
        destination: "/indian-polity/panchayati-raj-and-municipalities",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic20",
        destination: "/indian-polity/supreme-court",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic21",
        destination: "/indian-polity/high-courts-and-subordinate-courts",
        permanent: true,
      },
      {
        source: "/indian-polity/polity-topic22",
        destination: "/indian-polity/judicial-review-activism-and-pil",
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
