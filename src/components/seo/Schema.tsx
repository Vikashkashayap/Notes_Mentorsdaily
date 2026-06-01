import { JsonLd } from "@/components/JsonLd";

type SchemaProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders one or more JSON-LD graphs for rich results. */
export function Schema({ data }: SchemaProps) {
  const graphs = Array.isArray(data) ? data : [data];
  return (
    <>
      {graphs.map((graph, i) => (
        <JsonLd key={i} data={graph} />
      ))}
    </>
  );
}
