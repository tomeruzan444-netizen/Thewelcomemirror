import type { Faq as F } from "@/lib/services";

export default function Faq({ items }: { items: F[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={i} open={i === 0}>
          <summary>{f.q}</summary>
          <div className="answer"><p>{f.a}</p></div>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(items: F[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
