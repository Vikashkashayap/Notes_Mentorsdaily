import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { buildHomeMetadata, publisherMetadata } from "@/lib/seo/metadata";

export const revalidate = 86400;

export const metadata: Metadata = {
  ...buildHomeMetadata(),
  ...publisherMetadata,
};

export default function RootHomePage() {
  return <HomePage />;
}
