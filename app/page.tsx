import Link from "next/link";
import MirrorArt from "@/components/MirrorArt";
import Faq, { faqSchema } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { CtaBand, Flourish, Models, QuizSection, Rental, ServiceList, Steps } from "@/components/Sections";
import { homeFaqs, services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = {
  title: { absolute: `מראת קבלת פנים לחתונה ולאירועים עם השמות שלכם | ${site.name}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="hero-tag">{site.tagline}</span>
            <h1>מראת קבלת פנים לחתונה, עם השמות שלכם</h1>
            <Flourish />
            <p className="lede">
              מראה לבנה ומעוצבת שמקבלת את האורחים בכניסה, עם השמות שלכם, התאריך וברכת Welcome. כל אורח עוצר להצטלם מולה, וכל תמונה כוללת את השמות שלכם. בהשכרה לאירוע, כולל הבאה, הצבה ואיסוף.
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
          <div className="hero-art">
            <MirrorArt l1="Meitar" l2="Tomer" date="09.10.2026" foot="WELCOME TO OUR WEDDING" model="oval" />
          </div>
        </div>
      </section>

      <Steps />
      <div id="models"><Models /></div>
      <Rental />
      <ServiceList />
      <QuizSection />

      <section className="section" id="faq" aria-labelledby="faq-h">
        <div className="wrap faq-layout">
          <div className="head" style={{ marginBottom: 0 }}>
            <span className="kicker">questions</span>
            <h2 id="faq-h">שאלות שחוזרות אלינו</h2>
            <p>לא מצאתם תשובה? כתבו לנו בווטסאפ או באינסטגרם.</p>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
