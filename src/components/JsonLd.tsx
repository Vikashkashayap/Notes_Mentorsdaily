type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Structured data — plain script tag (not next/script) for App Router pages. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
