import type { Metadata } from "next";
import { PageSEO } from "@/components/seo/SEO";
import { UpscHubTopics } from "@/components/upsc-hub/UpscHubTopics";
import { buildSubjectMetadata, publisherMetadata } from "@/lib/seo/metadata";
import {
  collectionPageSchema,
  itemListSchema,
} from "@/lib/seo/schema";
import "@/styles/upsc-hub.css";

export const revalidate = 86400;

export const metadata: Metadata = {
  ...buildSubjectMetadata("ancient"),
  ...publisherMetadata,
};

export default function AncientHistoryHubPage() {
  return (
    <>
      <PageSEO
        schemas={[collectionPageSchema("ancient"), itemListSchema("ancient")]}
      />
      <UpscHubTopics subjectKey="ancient" />
    </>
  );
}
