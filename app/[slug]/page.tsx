import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MirrorArt from "@/components/MirrorArt";
import Faq, { faqSchema } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { Flourish, Models, QuizSection, Steps } from "@/components/Sections";
import { IconWhatsapp } from "@/components/Icons";
import type { Service } from "@/lib/services";
import { allPages, getPage, isTopic } from "@/lib/topics";
import { absoluteUrl, site, whatsappLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPages.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getPage(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/${s.slug}`, type: "article" });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getPage(slug);
  if (!s) notFound();

  const isWedding = s.slug === "welcome-mirror-wedding" || s.slug === "wedding-entrance-mirror";
  const accentStyle = { ["--accent" as string]: s.accent, ["--accent2" as string]: s.accent2 } as React.CSSProperties;
  const related = s.related.map(getPage).filter(Boolean) as Service[];
  const topic = isTopic(s.slug);
  const quizHref = `/questionnaire?event=${encodeURIComponent(s.short)}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      serviceType: "השכרת מראות קבלת פנים מעוצבות",
      description: s.metaDescription,
      url: absoluteUrl(`/${s.slug}`),
      areaServed: { "@type": "Country", name: "Israel" },
      provider: { "@id": `${site.url}/#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: absoluteUrl("/") },
        ...(topic ? [] : [{ "@type": "ListItem", position: 2, name: "שירותים", item: absoluteUrl("/services") }]),
        { "@type": "ListItem", position: topic ? 2 : 3, name: s.title, item: absoluteUrl(`/${s.slug}`) },
      ],
    },
    faqSchema(s.faqs),
  ];

  return (
    <div style={accentStyle}>
      <section className="svc-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="פירורי לחם">
            <ol>
              <li><Link href="/">דף הבית</Link></li>
              {!topic && <li><Link href="/services">שירותים</Link></li>}
              <li aria-current="page">{s.title}</li>
            </ol>
          </nav>
          <div className="hero-grid">
            <div>
              <span className="eyebrow">{s.eyebrow}</span>
              <h1>{s.title}</h1>
              <Flourish />
              <p className="lede" style={{ marginTop: "1.2rem" }}>{s.lead}</p>
              <div className="hero-actions">
                <Link href={quizHref} className="btn btn-rose">לשאלון ההזמנה</Link>
                {topic
                  ? <Link href="/design-your-mirror" className="btn btn-line">עצבו את המראה שלכם</Link>
                  : <a href={whatsappLink(`היי, אשמח לשמוע על ${s.title}`)} className="btn btn-line" target="_blank" rel="noopener"><IconWhatsapp />ווטסאפ</a>}
              </div>
            </div>
            <div className="hero-art">
              <MirrorArt {...s.mirror} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap article">
          <article className="prose">
            {s.sections.map((sec) => (
              <section key={sec.h2}>
                <h2>{sec.h2}</h2>
                {sec.body.map((p, i) => <p key={i}>{p}</p>)}
              </section>
            ))}
          </article>
          <aside className="aside-card" aria-labelledby="aside-h">
            <h2 id="aside-h">מה כלול</h2>
            <ul>
              {s.highlights.map((h) => <li key={h.title}>{h.title}</li>)}
              {!s.highlights.some((h) => h.title.includes("השכרה")) && <li>השכרה כולל איסוף</li>}
            </ul>
            <Link href={quizHref} className="btn btn-rose">בדיקת זמינות</Link>
            <a href={`tel:${site.phoneIntl}`} className="btn btn-line">{site.phoneDisplay}</a>
          </aside>
        </div>
      </section>

      <section className="section band-white" aria-labelledby="hl-h">
        <div className="wrap">
          <div className="head"><h2 id="hl-h">מה מקבלים ב{s.title}</h2></div>
          <div className="highlights">
            {s.highlights.map((h) => (
              <div className="hl" key={h.title}><h3>{h.title}</h3><p>{h.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ideas-h">
        <div className="wrap">
          <div className="head"><span className="kicker">ideas</span><h2 id="ideas-h">{s.ideasTitle}</h2></div>
          <ul className="ideas">{s.ideas.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </section>

      <Models />
      <Steps />

      <QuizSection eventWord={isWedding ? "החתונה" : "האירוע"} eventType={s.short} title={`הזמנת ${s.title}`} />

      <section className="section" aria-labelledby="faq-h">
        <div className="wrap faq-layout">
          <div className="head" style={{ marginBottom: 0 }}>
            <h2 id="faq-h">שאלות נפוצות על {s.title}</h2>
          </div>
          <Faq items={s.faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="rel-h">
        <div className="wrap">
          <div className="head"><h2 id="rel-h">{topic ? "עוד באתר" : "אירועים נוספים"}</h2></div>
          <div className="related">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`}>
                <span className="svc-arch" style={{ ["--c" as string]: r.accent, ["--c2" as string]: r.accent2 } as React.CSSProperties} aria-hidden="true" />
                <span><strong>{r.title}</strong><span>{r.highlights[0].title}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={schema} />
    </div>
  );
}
