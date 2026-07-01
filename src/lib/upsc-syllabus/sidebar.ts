import type { SidebarSection } from "./types";

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    label: "All",
    items: [{ key: "all", icon: "📚", name: "All Subjects" }],
  },
  {
    label: "GS Paper 1",
    items: [
      { key: "ancient", icon: "🏺", name: "Ancient History" },
      { key: "medieval", icon: "🕌", name: "Medieval History" },
      { key: "history", icon: "📜", name: "Modern History" },
      { key: "worldhistory", icon: "🌍", name: "World History" },
      { key: "culture", icon: "🎭", name: "Art & Culture" },
      { key: "geo", icon: "🗺️", name: "Indian Geography" },
      { key: "worldgeo", icon: "🌐", name: "World Geography" },
      { key: "society", icon: "👥", name: "Indian Society" },
    ],
  },
  {
    label: "GS Paper 2",
    items: [
      { key: "polity", icon: "⚖️", name: "Polity & Constitution" },
      { key: "governance", icon: "🏛️", name: "Governance & Social" },
      { key: "ir", icon: "🌍", name: "International Relations" },
    ],
  },
  {
    label: "GS Paper 3",
    items: [
      { key: "economy", icon: "📈", name: "Indian Economy" },
      { key: "environment", icon: "🌿", name: "Environment & Ecology" },
      { key: "science", icon: "🔬", name: "Science & Technology" },
      { key: "security", icon: "🛡️", name: "Internal Security" },
    ],
  },
  {
    label: "GS Paper 4",
    items: [{ key: "ethics", icon: "🧭", name: "Ethics GS4" }],
  },
  {
    label: "Extras",
    items: [
      { key: "current", icon: "📰", name: "Current Affairs Monthly" },
    ],
  },
];
