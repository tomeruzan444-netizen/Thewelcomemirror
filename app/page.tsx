import Link from "next/link";
import Image from "next/image";
import Faq, { faqSchema } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { CtaBand, Flourish, Models, QuizSection, Rental, ServiceList, Steps } from "@/components/Sections";
import { homeFaqs, services } from "@/lib/services";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `מראה ממותגת לקבלת פנים לחתונה ולאירועים | ${site.name}`,
  absoluteTitle: true,
  description: "מראה ממותגת לקבלת פנים מבית The Welcome Mirror: מראה לבנה מעוצבת עם השמות שלכם, התאריך וברכת Welcome. להשכרה לחתונות ולאירועים, כולל הבאה, הצבה ואיסוף.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="hero-tag">{site.tagline}</span>
            <h1>The Welcome Mirror - מראה ממותגת לקבלת פנים, עם השמות שלכם</h1>
            <Flourish />
            <p className="lede">
              מראה ממותגת לקבלת פנים היא מראה לבנה ומעוצבת שמקבלת את האורחים בכניסה, עם השמות שלכם, התאריך וברכת Welcome. כל אורח עוצר להצטלם מולה, וכל תמונה כוללת את השמות שלכם. בהשכרה לאירוע, כולל הבאה, הצבה ואיסוף.
            </p>
            <div className="hero-actions">
              <Link href="/questionnaire" className="btn btn-rose">לשאלון ההזמנה</Link>
              <Link href="/design-your-mirror" className="btn btn-line">עצבו את המראה שלכם</Link>
            </div>
            <ul className="hero-events" aria-label="סוגי אירועים">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}><Link href={`/${s.slug}`}>{s.short}</Link></li>
              ))}
            </ul>
          </div>
          <div className="hero-art hero-photo-wrap">
            <figure className="hero-photo">
              <Image
                src="/mirrors/oval.jpg"
                alt="מראה ממותגת לקבלת פנים: מראה אובלית לבנה עם השמות Meitar and Tomer, התאריך 09.10.2026 וברכת Welcome to our wedding בכניסה לחתונה"
                fill
                priority
                sizes="(max-width:900px) 80vw, 40vw"
              />
            </figure>
            <figure className="hero-photo-mini" aria-hidden="true">
              <Image src="/mirrors/floral.jpg" alt="" fill sizes="180px" />
            </figure>
            <span className="hero-photo-note">Welcome to our wedding</span>
          </div>
        </div>
      </section>

      <Steps />
      <Models />
      <Rental />
      <ServiceList />
      <QuizSection />

      <section className="section" aria-labelledby="faq-h">
        <div className="wrap faq-layout">
          <div className="head" style={{ marginBottom: 0 }}>
            <span className="kicker">questions</span>
            <h2 id="faq-h">שאלות שחוזרות אלינו</h2>
            <p>לא מצאתם תשובה? כתבו לנו בווטסאפ או באינסטגרם, או <Link href="/faq">לכל השאלות הנפוצות</Link>.</p>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
