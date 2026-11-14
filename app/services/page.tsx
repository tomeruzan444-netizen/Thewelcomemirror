import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { CtaBand, Models, ServiceList } from "@/components/Sections";
import { services } from "@/lib/services";
import { topics } from "@/lib/topics";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMeta({
  title: "השכרת מראת קבלת פנים לכל סוגי האירועים",
  description: "מראת קבלת פנים מעוצבת עם כיתוב אישי לכל אירוע: חתונה, בר ובת מצווה, ברית ובריתה, גילוי מין העובר, חינה, אירוסין, ימי הולדת ואירועי חברה.",
  path: "/services",
});

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: absoluteUrl(`/${s.slug}`) })),
  };
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="פירורי לחם"><ol><li><Link href="/">דף הבית</Link></li><li aria-current="page">שירותים</li></ol></nav>
          <h1>מראת קבלת פנים לכל סוג של אירוע</h1>
          <p className="lede">אותה מראה לבנה, כיתוב אחר לגמרי. בחרו את סוג האירוע כדי לראות רעיונות לכיתוב ומה כדאי לדעת.</p>
        </div>
      </section>
      <ServiceList heading={false} />
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="topics-h">
        <div className="wrap">
          <div className="head"><h2 id="topics-h">מראות להשכרה לפי מה שאתם מחפשים</h2></div>
          <div className="related">
            {topics.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`}>
                <span className="svc-arch" style={{ ["--c" as string]: t.accent, ["--c2" as string]: t.accent2 } as React.CSSProperties} aria-hidden="true" />
                <span><strong>{t.title}</strong><span>{t.highlights[0].title}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Models />
      <CtaBand />
      <JsonLd data={schema} />
    </>
  );
}
