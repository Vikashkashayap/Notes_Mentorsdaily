"use client";

import { SiteNavbar } from "@/components/SiteNavbar";

type HubHeaderProps = {
  showSearch?: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onMenuToggle: () => void;
};

export function HubHeader({
  showSearch = true,
  searchQuery,
  onSearchChange,
  onMenuToggle,
}: HubHeaderProps) {
  return (
    <SiteNavbar
      variant="hub"
      onMenuToggle={onMenuToggle}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      showSearch={showSearch}
    />
  );
}
