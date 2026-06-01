import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { Schema } from "./Schema";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <>
      <Schema data={breadcrumbSchema(items)} />
      <nav
        className={`seo-breadcrumb ${className}`.trim()}
        aria-label="Breadcrumb"
      >
        <ol className="seo-breadcrumb__list">
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`} className="seo-breadcrumb__item">
              {i > 0 && (
                <span className="seo-breadcrumb__sep" aria-hidden>
                  ›
                </span>
              )}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
