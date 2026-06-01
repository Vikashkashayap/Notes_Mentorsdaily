import type { FaqItem } from "@/lib/seo/faqs";
import { faqPageSchema } from "@/lib/seo/schema";
import { Schema } from "./Schema";

type FAQProps = {
  faqs: FaqItem[];
  title?: string;
};

export function FAQ({ faqs, title = "Frequently Asked Questions" }: FAQProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="seo-faq" aria-labelledby="seo-faq-heading">
      <Schema data={faqPageSchema(faqs)} />
      <h2 id="seo-faq-heading">{title}</h2>
      <dl className="seo-faq__list">
        {faqs.map((faq) => (
          <div key={faq.question} className="seo-faq__item">
            <dt>{faq.question}</dt>
            <dd>{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
