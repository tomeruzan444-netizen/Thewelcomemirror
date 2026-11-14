import Link from "next/link";
import Faq, { faqSchema } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { CtaBand, Flourish } from "@/components/Sections";
import { homeFaqs, services, type Faq as F } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "שאלות נפוצות על מראת קבלת פנים לאירועים",
  description: "כל התשובות על השכרת מראת קבלת פנים: איך זה עובד, הבאה והצבה, עיצוב הכיתוב, זמינות ומחירים, ושאלות לפי סוג האירוע - חתונה, בר ובת מצווה, ברית, חינה ועוד.",
  path: "/faq",
});

/** שאלות שחוזרות בכמה עמודים מוצגות פעם אחת בלבד */
function buildGroups() {
  const seen = new Set(homeFaqs.map((f) => f.q));
  const groups: { slug: string; title: string; items: F[] }[] = [];
  for (const s of services) {
    const items = s.faqs.filter((f) => !seen.has(f.q));
    items.forEach((f) => seen.add(f.q));
    if (items.length) groups.push({ slug: s.slug, title: s.title, items });
  }
  return groups;
}

export default function FaqPage() {
  const groups = buildGroups();
  const all = [...homeFaqs, ...groups.flatMap((g) => g.items)];
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "דף הבית", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "שאלות נפוצות", item: absoluteUrl("/faq") },
    ],
  };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="פירורי לחם"><ol><li><Link href="/">דף הבית</Link></li><li aria-current="page">שאלות נפוצות</li></ol></nav>
          <h1>שאלות נפוצות על מראת קבלת פנים</h1>
          <Flourish />
          <p className="lede">כל מה ששואלים אותנו לפני שמזמינים מראה לאירוע. לא מצאתם תשובה? <Link href="/contact">כתבו לנו</Link>.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-general-h">
        <div className="wrap faq-layout">
          <div className="head" style={{ marginBottom: 0 }}>
            <span className="kicker">questions</span>
            <h2 id="faq-general-h">שאלות כלליות</h2>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      {groups.map((g, i) => (
        <section key={g.slug} className={`section${i % 2 === 0 ? " band-white" : ""}`} aria-labelledby={`faq-${g.slug}-h`}>
          <div className="wrap faq-layout">
            <div className="head" style={{ marginBottom: 0 }}>
              <h2 id={`faq-${g.slug}-h`}>{g.title}</h2>
              <p><Link href={`/${g.slug}`}>לעמוד {g.title}</Link></p>
            </div>
            <Faq items={g.items} />
          </div>
        </section>
      ))}

      <CtaBand />
      <JsonLd data={[faqSchema(all), breadcrumb]} />
    </>
  );
}
