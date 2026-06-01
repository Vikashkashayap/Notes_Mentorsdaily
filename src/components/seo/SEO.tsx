import type { Metadata } from "next";
import {
  educationalOrganizationSchema,
  homeItemListSchema,
  websiteSchema,
} from "@/lib/seo/schema";
import { Schema } from "./Schema";

/** Global site-level structured data (layout / homepage). */
export function GlobalSEO() {
  return (
    <Schema
      data={[
        websiteSchema(),
        educationalOrganizationSchema(),
        homeItemListSchema(),
      ]}
    />
  );
}

export type PageSEOProps = {
  schemas: Record<string, unknown> | Record<string, unknown>[];
};

/** Per-page JSON-LD bundle — pair with generateMetadata() on the route. */
export function PageSEO({ schemas }: PageSEOProps) {
  return <Schema data={schemas} />;
}

export type { Metadata };
