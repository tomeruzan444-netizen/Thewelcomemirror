import Link from "next/link";
import { services } from "@/lib/services";
import { models } from "@/lib/designs";
import { site, whatsappLink } from "@/lib/site";
import MirrorArt from "./MirrorArt";
import Questionnaire from "./Questionnaire";
import { IconInstagram, IconMail, IconPhone, IconWhatsapp } from "./Icons";

export function Flourish() {
  return (
    <svg className="flourish" viewBox="0 0 120 14" aria-hidden="true">
      <path d="M2 7 H46 M74 7 H118" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M60 1 C56 5 52 7 48 7 C52 7 56 9 60 13 C64 9 68 7 72 7 C68 7 64 5 60 1 Z" fill="currentColor" />
    </svg>
  );
}

export function Steps() {
  return (
    <section className="section band-white" aria-labelledby="how-h">
      <div className="wrap">
        <div className="head center">
          <span className="kicker">how it works</span>
          <h2 id="how-h">ארבעה צעדים עד המראה שלכם</h2>
          <Flourish />
        </div>
        <ol className="steps">
          <li><h3>בוחרים מראה</h3><p>אובלית, וינטג' או בעיצוב אישי, בהשכרה לאירוע.</p></li>
          <li><h3>מעצבים כיתוב</h3><p>שמות, תאריך וברכה. מקבלים הדמיה ומאשרים.</p></li>
          <li><h3>אנחנו מביאים</h3><p>מגיעים למקום האירוע ומציבים את המראה בכניסה.</p></li>
          <li><h3>מצטלמים</h3><p>האורחים מצטלמים מול השמות שלכם, כל הערב.</p></li>
        </ol>
      </div>
    </section>
  );
}

export function Models() {
  return (
    <section className="section" aria-labelledby="models-h">
      <div className="wrap">
        <div className="head center">
          <span className="kicker">our mirrors</span>
          <h2 id="models-h">הדגמים שלנו</h2>
          <p>שלושה סגנונות של מראות בגובה אדם, עם כיתוב שמעוצב במיוחד בשבילכם.</p>
        </div>
        <div className="models">
          <div className="model-card">
            <MirrorArt l1="Meitar" l2="Tomer" date="09.10.2026" foot="WELCOME TO OUR WEDDING" model="oval" animate={false} />
            <h3>{models[0].name}</h3>
            <p>{models[0].text}</p>
          </div>
          <div className="model-card">
            <MirrorArt l1="Welcome" date="Noa & Itay" foot="12.06.2027" model="vintage" animate={false} />
            <h3>{models[1].name}</h3>
            <p>{models[1].text}</p>
          </div>
          <div className="model-card">
            <MirrorArt l1="Shir" l2="Omer" date="20.05.2027" foot="WELCOME" model="floral" animate={false} />
            <h3>{models[2].name}</h3>
            <p>{models[2].text}</p>
          </div>
        </div>
        <p className="models-cta">רוצים לראות איך זה ייראה עם השמות שלכם? <Link href="/design-your-mirror">לעיצוב אישי של המראה</Link></p>
      </div>
    </section>
  );
}

export function Rental() {
  return (
    <section className="section band-blush" aria-labelledby="rb-h">
      <div className="wrap">
        <div className="head center">
          <span className="kicker">rental</span>
          <h2 id="rb-h">השכרה לאירוע, ואנחנו דואגים לכל השאר</h2>
          <p>המראות שלנו להשכרה בלבד. אתם בוחרים מראה וכיתוב, ואנחנו מטפלים בכל השאר.</p>
        </div>
        <ul className="rental">
          <li><h3>כיתוב אישי</h3><p>מעצבים את השמות, התאריך והברכה, ושולחים הדמיה לאישור.</p></li>
          <li><h3>הבאה והצבה</h3><p>מגיעים למקום האירוע לפני האורחים ומציבים את המראה בכניסה.</p></li>
          <li><h3>כל הערב</h3><p>המראה מקבלת את האורחים ומחכה לסלפי לאורך כל האירוע.</p></li>
          <li><h3>איסוף בסוף</h3><p>בסוף האירוע אנחנו אוספים את המראה. אין לכם מה להוביל או לאחסן.</p></li>
        </ul>
      </div>
    </section>
  );
}

export function ServiceList({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section band-white" aria-labelledby={heading ? "svc-h" : undefined}>
      <div className="wrap">
        {heading && (
          <div className="head center">
            <span className="kicker">for every celebration</span>
            <h2 id="svc-h">מראת קבלת פנים לכל שמחה</h2>
            <p>חתונה היא רק ההתחלה. כל אירוע מקבל מראה עם הכיתוב שלו.</p>
          </div>
        )}
        <ul className="svc-list">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/${s.slug}`} className="svc-row" style={{ ["--c" as string]: s.accent, ["--c2" as string]: s.accent2 } as React.CSSProperties}>
                <span className="svc-arch" aria-hidden="true" />
                <span className="svc-name">{s.title}</span>
                <span className="svc-go">לפרטים</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function QuizSection({ eventWord, eventType, title, h1 = false }: { eventWord?: string; eventType?: string; title?: string; h1?: boolean }) {
  const H = h1 ? "h1" : "h2";
  return (
    <section className="section quiz-band" aria-labelledby="quiz-h">
      <div className="wrap quiz-layout">
        <div className="quiz-aside">
          <span className="kicker">let&apos;s talk</span>
          <H id="quiz-h">{title ?? "שאלון הזמנה"}</H>
          <Flourish />
          <p style={{ marginTop: "1.2rem", fontSize: "1.2rem" }}>כמה שאלות קצרות, ובסוף בוחרים את המראה וסגנון הכיתוב. הפרטים נשלחים אלינו בווטסאפ, ואנחנו חוזרים אליכם עם בדיקת זמינות והצעה.</p>
          <ul className="direct">
            <li><a href={`tel:${site.phoneIntl}`}><IconPhone />{site.phoneDisplay}</a></li>
            <li><a href={whatsappLink("היי, אשמח לשמוע על מראת קבלת פנים לאירוע")} target="_blank" rel="noopener"><IconWhatsapp />שיחה בווטסאפ</a></li>
            <li><a href={site.instagramUrl} target="_blank" rel="noopener"><IconInstagram /><bdi dir="ltr">@thewelcome.mirror</bdi></a></li>
            <li><a href={`mailto:${site.email}`}><IconMail />{site.email}</a></li>
          </ul>
        </div>
        <Questionnaire eventWord={eventWord} eventType={eventType} />
      </div>
    </section>
  );
}

export function CtaBand({ text = "יש לכם תאריך? בואו נשמור לכם מראה." }: { text?: string }) {
  return (
    <section className="section cta-band" style={{ paddingBlock: "clamp(3rem,6vw,4.5rem)" }}>
      <div className="wrap cta-inner">
        <h2>{text}</h2>
        <div className="actions">
          <Link href="/questionnaire" className="btn btn-rose">למילוי השאלון</Link>
          <a href={whatsappLink("היי, אשמח לשמוע על מראת קבלת פנים לאירוע")} className="btn btn-line" target="_blank" rel="noopener"><IconWhatsapp />ווטסאפ</a>
        </div>
      </div>
    </section>
  );
}
