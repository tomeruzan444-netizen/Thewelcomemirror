import Image from "next/image";
import Link from "next/link";
import Faq, { faqSchema } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { CtaBand, Flourish } from "@/components/Sections";
import { IconWhatsapp } from "@/components/Icons";
import { absoluteUrl, site, whatsappLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { renderInline } from "@/lib/inline";

const PATH = "/event-welcome-sign";
const TITLE = "שלט קבלת פנים לאירועים";
const DESCRIPTION =
  "שלט קבלת פנים לאירועים: איך בונים שלט שקוראים מרחוק, איזה חומר מתאים, נוסחים לחתונה, לבר מצווה ולברית, והטעויות שכדאי לתפוס לפני שהשלט מוכן.";

export const metadata = pageMeta({
  title: "שלט קבלת פנים לאירועים: ניסוח, עיצוב והצבה",
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const SNIPPET =
  "שלט קבלת פנים הוא השלט שעומד בכניסה לאירוע ומקבל את האורחים בשם בעלי השמחה. שלט טוב נקרא בתוך שניות: ברכה קצרה, השמות בגדול והתאריך מתחת. הוא עומד בגובה העיניים, במקום שכל האורחים עוברים בו, ומעוצב בצבעים של האירוע כדי שירצו גם להצטלם איתו.";

const layers = [
  { n: 1, title: "ברכה פותחת", text: "Welcome, ברוכים הבאים או Welcome to our wedding. שורה קצרה שפותחת את השלט." },
  { n: 2, title: "השמות", text: "השורה הגדולה בשלט. אם רק דבר אחד ייקרא מרחוק, זה צריך להיות הוא." },
  { n: 3, title: "התאריך", text: "קטן יותר מהשמות, בפורמט אחד וברור, למשל 02.11.2026." },
  { n: 4, title: "שורת סיום", text: "האשטאג של האירוע או משפט קצר. אפשר גם לוותר עליה." },
];

const materials = [
  { name: "קאפה או קרטון מודפס", fit: "שלט מאויר בצבעים של האירוע, וגם הכוונה פשוטה.", watch: "צריך כן יציב, ובחוץ רוח חזקה עלולה להפיל אותו." },
  { name: "עץ", fit: "אירוע כפרי, בגן או בחווה.", watch: "כבד יחסית, והכיתוב צריך להיות כהה מספיק כדי לבלוט על הסיבים." },
  { name: "פרספקס שקוף", fit: "עיצוב מינימליסטי ומודרני.", watch: "רואים דרכו את מה שמאחוריו, ועל רקע עמוס הכיתוב נבלע." },
  { name: "ניאון", fit: "מסיבות ואירועי ערב בתאורה עמומה.", watch: "צריך שקע חשמל קרוב, ובאור יום הוא מאבד את רוב האפקט." },
  { name: "מראה", fit: "כשרוצים שהשלט יהיה גם פינת הצילום של הכניסה.", watch: "כדאי לבחור מקום שאין בו שמש ישירה על הזכוכית.", ours: true },
];

const printed = [
  {
    src: "/signs/wedding-reception-sign-pink-orange.jpg",
    alt: "שלט קבלת פנים מודפס על כן לבן בחתונה בגן: רקע ורוד עם פסים כתומים, הכיתוב NOA & DAN Wedding Reception, איורי פרוסות הדר, כוס קוקטייל וכדור דיסקו, ליד בר עץ ופרחים כתומים",
    caption: "ורוד וכתום עם איורי הדר וכדור דיסקו. השמות באותיות דפוס והמילה Wedding בכתב יד, כך שכל שורה נקראת אחרת.",
  },
  {
    src: "/signs/bachelorette-party-sign-easel.jpg",
    alt: "שלט מודפס על כן למסיבת רווקות בחצר: רקע ורוד עם פסים כתומים והכיתוב MEITAR Bachelorette Party, ליד שולחן כיבוד עם פרחים כתומים",
    caption: "אותו עיצוב עם נוסח אחר, למסיבת רווקות בחצר. כך נשמרת שפה עיצובית אחת מהרווקות ועד החתונה.",
  },
  {
    src: "/signs/wedding-welcome-sign-line-illustrations.jpg",
    alt: "שלט קבלת פנים לבן על כן עץ עם סרט לבן: איורי קו בשחור של ברבורים, כדור דיסקו, טבעת ועוגה, והכיתוב Welcome to the wedding of Zohar & Tali, 30th May 2026",
    caption: "שחור לבן עם איורי קו. הברכה קטנה, השמות בגדול, והתאריך כתוב במילים כדי שלא יהיה בלבול בין היום לחודש.",
  },
];

const wordings: { event: string; lines: { t: string; cls: string }[]; note: string }[] = [
  {
    event: "חתונה",
    lines: [{ t: "Welcome to our wedding", cls: "w-sm" }, { t: "Noa & Itay", cls: "w-script" }, { t: "02.11.2026", cls: "w-date" }],
    note: "כשרוב האורחים דוברי עברית, אפשר לפתוח ב\"ברוכים הבאים לחתונה שלנו\" ולהשאיר את השמות באנגלית.",
  },
  {
    event: "בר מצווה",
    lines: [{ t: "Welcome to", cls: "w-sm" }, { t: "Ido's Bar Mitzvah", cls: "w-script" }, { t: "14.03.2027", cls: "w-date" }],
    note: "השם של חתן השמחה הוא השורה הגדולה, ושמות ההורים לא חייבים להופיע. עוד רעיונות יש בעמוד על [מראת קבלת פנים לבר מצווה](/welcome-mirror-bar-mitzvah).",
  },
  {
    event: "ברית ובריתה",
    lines: [{ t: "ברוכים הבאים", cls: "w-he-sm" }, { t: "לבריתה של מאיה", cls: "w-he" }],
    note: "כשהשם נחשף רק בטקס, כותבים \"ברוכים הבאים לברית\" ושומרים את השם להפתעה. כך עובדת גם [מראה לברית ולבריתה](/welcome-mirror-brit).",
  },
  {
    event: "יום הולדת",
    lines: [{ t: "Welcome to", cls: "w-sm" }, { t: "Dana's 40th", cls: "w-script" }],
    note: "את הגיל כותבים רק אם בעלת השמחה שמחה שהוא יופיע בתמונות של כולם.",
  },
  {
    event: "אירוע חברה",
    lines: [{ t: "WELCOME", cls: "w-caps" }, { t: "שם הכנס", cls: "w-he" }, { t: "שם החברה", cls: "w-he-sm" }],
    note: "כדאי לכתוב את שם האירוע בדיוק כמו בהזמנה, כדי שהמשתתפים יזהו מיד שהגיעו לאולם הנכון.",
  },
];

const mistakes = [
  { title: "איות השמות באנגלית", text: "שמות כמו איתי או שיר אפשר לאיית בכמה דרכים: Itay ו-Itai, Shir ו-Sheer. כדאי להעתיק את האיות מההזמנה או מהפרופיל של בני הזוג ברשתות, ולא לנחש." },
  { title: "תאריך שנקרא אחרת בחו\"ל", text: "בישראל 02.11 הוא 2 בנובמבר, אבל אורחים מארצות הברית יקראו אותו כ-11 בפברואר. כשמגיעים אורחים משם, אפשר לכתוב את החודש במילים: November 2, 2026." },
  { title: "כתב מסולסל בשורה ארוכה", text: "כתב יד רומנטי נראה נהדר בשמות, אבל משפט שלם בכתב כזה קשה לקריאה, במיוחד לאורחים מבוגרים. את השורות הארוכות עדיף לכתוב בכתב נקי." },
  { title: "יותר מדי מידע", text: "שעות, תפריט ומקום חניה לא צריכים להופיע על השלט. את המידע המעשי עדיף להעביר בהזמנה או בהודעה לאורחים, ולהשאיר את השלט לברכה." },
  { title: "שלט מאחורי דלת", text: "שלט שעומד בצד שאליו הדלת נפתחת נעלם מאחוריה בכל פעם שמישהו נכנס. כשמבקרים במקום לפני האירוע, כדאי לבדוק לאיזה כיוון הדלתות נפתחות." },
];

const faqs = [
  { q: "מה ההבדל בין שלט קבלת פנים לשלט הכוונה?", a: "שלט קבלת פנים מברך את האורחים ומאשר שהגיעו לאירוע הנכון. שלט הכוונה מראה לאן ללכת: לחופה, לחניה או לשולחנות. באירוע גדול לפעמים צריך את שניהם." },
  { q: "השלט צריך להתאים להזמנה?", a: "עדיף שכן. כשהשלט משתמש באותו סגנון כתב ובאותם צבעים כמו ההזמנה, האורחים מזהים מיד שזה האירוע שלכם, והכניסה נראית חלק מהעיצוב." },
  { q: "אפשר לשלב עברית ואנגלית על אותו שלט?", a: "כן. הכי טוב לבחור שפה אחת לשורה הגדולה, למשל השמות באנגלית, ושפה שנייה לשורות הקטנות. כשכל שורה בשפה אחרת, השלט נראה עמוס." },
  { q: "באיזה גובה השלט צריך לעמוד?", a: "בגובה העיניים של אדם עומד, כך שקוראים אותו בלי להרים או להוריד את הראש. מראה עומדת בגובה אדם כבר בנויה כך, ושלט קאפה צריך כן שירים אותו." },
];

/** אינפוגרפיקה: מבנה שלט קבלת פנים, לפי סדר הקריאה מלמעלה למטה */
function SignAnatomy() {
  return (
    <svg className="anatomy-svg" viewBox="0 0 320 440" role="img" aria-labelledby="anat-t anat-d">
      <title id="anat-t">מבנה של שלט קבלת פנים</title>
      <desc id="anat-d">שלט בתוך מסגרת מקושתת, ועליו ארבע שורות לפי סדר הקריאה: ברכה פותחת קטנה, השמות בגודל הגדול ביותר, התאריך קטן יותר, ושורת סיום אופציונלית בתחתית. ליד כל שורה מספר שמפנה להסבר.</desc>
      <defs>
        <linearGradient id="an-glass" x1="0" y1="0" x2=".4" y2="1">
          <stop offset="0" stopColor="#eef2ee" />
          <stop offset=".6" stopColor="#f7f4ef" />
          <stop offset="1" stopColor="#f6e6e8" />
        </linearGradient>
        <linearGradient id="an-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ead7b4" />
          <stop offset="1" stopColor="#b8925c" />
        </linearGradient>
      </defs>
      <path d="M40 420 V150 A120 120 0 0 1 280 150 V420 Z" fill="#fff" stroke="url(#an-gold)" strokeWidth="5" />
      <path d="M56 406 V152 A104 104 0 0 1 264 152 V406 Z" fill="url(#an-glass)" />
      <path d="M90 90 L120 70 L150 400 L118 400 Z" fill="#fff" opacity=".45" />
      <g textAnchor="middle" fill="#8e6a3e" direction="ltr">
        <text x="160" y="150" className="an-sm">WELCOME</text>
        <text x="160" y="222" className="an-script">Noa &amp; Itay</text>
        <text x="160" y="272" className="an-date">02.11.2026</text>
        <line x1="120" y1="318" x2="200" y2="318" stroke="#c9a97b" strokeWidth="1" />
        <text x="160" y="352" className="an-foot">#NoaAndItay</text>
      </g>
      {[[150, 1], [218, 2], [268, 3], [348, 4]].map(([y, n]) => (
        <g key={n} transform={`translate(292 ${y - 6})`}>
          <circle r="13" fill="#a65e6c" />
          <text y="5" textAnchor="middle" fill="#fff" className="an-num">{n}</text>
        </g>
      ))}
    </svg>
  );
}

export default function EventWelcomeSignPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      inLanguage: "he-IL",
      url: absoluteUrl(PATH),
      mainEntityOfPage: absoluteUrl(PATH),
      image: absoluteUrl("/instagram/vintage-welcome-mirror-gold-lettering.jpg"),
      datePublished: "2026-11-21",
      dateModified: "2026-11-21",
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@id": `${site.url}/#business` },
      about: "שלט קבלת פנים לאירועים",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: TITLE, item: absoluteUrl(PATH) },
      ],
    },
    faqSchema(faqs),
  ];

  return (
    <>
      <section className="ws-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="פירורי לחם"><ol><li><Link href="/">דף הבית</Link></li><li aria-current="page">{TITLE}</li></ol></nav>
          <div className="ws-hero-grid">
            <div>
              <span className="eyebrow">מדריך לשלט הכניסה</span>
              <h1>שלט קבלת פנים לאירועים: ניסוח, עיצוב והצבה</h1>
              <Flourish />
              <p className="lede ws-snippet">{SNIPPET}</p>
              <div className="hero-actions">
                <Link href="/questionnaire" className="btn btn-rose">לשאלון ההזמנה</Link>
                <Link href="/design-your-mirror" className="btn btn-line">לנסות נוסח על המראה</Link>
              </div>
            </div>
            <div className="ws-hero-art">
              <figure className="ws-photo">
                <Image src="/instagram/vintage-welcome-mirror-gold-lettering.jpg" alt="שלט קבלת פנים על מראת וינטג' עם מסגרת שמנת מגולפת וכיתוב זהב: Tal & Itay, התאריך 02.11.2026 ו-Welcome to our wedding" width={1296} height={1536} priority sizes="(max-width:900px) 80vw, 38vw" />
              </figure>
              <figure className="ws-photo-mini" aria-hidden="true">
                <Image src="/instagram/oval-welcome-mirror-garden-wedding.jpg" alt="" width={1136} height={1408} sizes="170px" />
              </figure>
              <span className="ws-note script">Welcome</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section ws-intro">
        <div className="wrap ws-narrow">
          <h2>התפקיד של השלט בכניסה</h2>
          <p>האורחים מגיעים בגלים. חלק מכירים את המקום, וחלק נכנסים עם הטלפון ביד ובודקים בווייז שהגיעו לאולם הנכון. השלט בכניסה עונה להם עוד לפני שמישהו צריך לשאול: כן, זו החתונה של נועה ואיתי.</p>
          <p>יש לו גם תפקיד שני, פחות מדובר. הוא קובע את הטון. כיתוב עדין בכתב יד על רקע בהיר משדר משהו אחר מאשר שלט מודפס בצבעים חזקים, והאורחים קולטים את זה לפני שראו את העיצוב בפנים.</p>
          <p className="ws-pull">ובהרבה אירועים הוא הופך לנקודת הצילום הראשונה של הערב, בתנאי שיש לו רקע יפה ומקום פנוי לעמוד מולו.</p>
        </div>
      </section>

      <section className="section band-white" aria-labelledby="anat-h">
        <div className="wrap">
          <div className="head center">
            <span className="kicker">anatomy of a sign</span>
            <h2 id="anat-h">איך בנוי שלט שקוראים מרחוק</h2>
            <p>לשלט טוב יש היררכיה. כשכל השורות באותו גודל, העין לא יודעת מאיפה להתחיל והשלט נקרא כמו פסקה.</p>
          </div>
          <div className="anatomy">
            <figure className="anatomy-fig"><SignAnatomy /></figure>
            <ol className="anatomy-list">
              {layers.map((l) => (
                <li key={l.n}>
                  <span className="an-badge" aria-hidden="true">{l.n}</span>
                  <div><h3>{l.title}</h3><p>{l.text}</p></div>
                </li>
              ))}
              <li className="anatomy-rules">
                <p>לכל היותר שני סוגי כתב בשלט אחד, ניגודיות ברורה בין הכיתוב לרקע, ורווח נדיב בין השורות. שלושת אלה עושים יותר מכל קישוט.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="mat-h">
        <div className="wrap">
          <div className="head center">
            <span className="kicker">materials</span>
            <h2 id="mat-h">מאיזה חומר לעשות את השלט</h2>
            <p>החומר משפיע על המראה, על התקציב ועל השאלה אם האורחים יצטלמו איתו.</p>
          </div>
          <ul className="materials">
            {materials.map((m) => (
              <li key={m.name} className={m.ours ? "is-ours" : undefined}>
                {m.ours && <span className="mat-tag">מה שאנחנו עושים</span>}
                <h3>{m.name}</h3>
                <dl>
                  <dt>מתאים ל</dt><dd>{m.fit}</dd>
                  <dt>לשים לב</dt><dd>{m.watch}</dd>
                </dl>
              </li>
            ))}
          </ul>
          <ul className="printed" aria-label="דוגמאות לשלטים מודפסים על כן">
            {printed.map((s) => (
              <li key={s.src}>
                <figure>
                  <Image src={s.src} alt={s.alt} width={1086} height={1448} sizes="(max-width:720px) 78vw, 30vw" />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="ws-narrow prose ws-after">
            <p>שלט מודפס נותן הכי הרבה חופש בעיצוב: איורים, צבעים וכל סוג כתב. מראה מוסיפה את מה שנייר לא יכול, כי מי שעומד מולה כבר נמצא בתוך התמונה. ההשוואה המלאה בין מראה לקרטון נמצאת בעמוד על {renderInline("[שלט כניסה על מראה](/mirror-welcome-sign)")}.</p>
          </div>
        </div>
      </section>

      <section className="section band-blush" aria-labelledby="word-h">
        <div className="wrap">
          <div className="head center">
            <span className="kicker">wording</span>
            <h2 id="word-h">נוסחים לפי סוג האירוע</h2>
            <p>הנוסח תלוי במי שמקבל את האורחים. כמה דוגמאות שעובדות, וההערה שחשוב לזכור בכל אחת.</p>
          </div>
          <ul className="wordings">
            {wordings.map((w) => (
              <li key={w.event}>
                <div className="w-sign" aria-label={`דוגמת נוסח: ${w.lines.map((l) => l.t).join(" ")}`}>
                  {w.lines.map((l) => <span key={l.t} className={l.cls} dir="auto">{l.t}</span>)}
                </div>
                <h3>{w.event}</h3>
                <p>{renderInline(w.note)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="mis-h">
        <div className="wrap ws-narrow">
          <h2 id="mis-h">טעויות שכדאי לתפוס לפני שהשלט מוכן</h2>
          <ol className="mistakes">
            {mistakes.map((m) => (
              <li key={m.title}><h3>{m.title}</h3><p>{m.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band-white" aria-labelledby="ours-h">
        <div className="wrap ws-ours">
          <div className="ws-ours-photos" aria-hidden="true">
            <Image src="/instagram/vintage-welcome-mirror-bride.jpg" alt="" width={1296} height={1728} sizes="(max-width:900px) 45vw, 22vw" />
            <Image src="/instagram/hand-painted-floral-mirror.jpg" alt="" width={1296} height={1712} sizes="(max-width:900px) 45vw, 22vw" />
          </div>
          <div className="prose">
            <h2 id="ours-h">שלט קבלת פנים על מראה, מהעיצוב ועד האיסוף</h2>
            <p>אצלנו השלט כתוב על מראה עומדת, בשלושה דגמים: המראה האובלית עם מסגרת עץ לבנה, מראת וינטג&apos; מלבנית עם עיטורים במסגרת, ומראה עם ציורי פרחים בעבודת יד. את הכיתוב בוחרים בסגנון קלאסי, בכתב יד רומנטי, מודרני ונקי, או בעברית.</p>
            <p>ב{renderInline("[עמוד העיצוב האישי](/design-your-mirror)")} כותבים את הנוסח ורואים מיד איך הוא נראה על המראה. לפני האירוע נשלח לכם הדמיה לאישור, וזה גם הרגע לתפוס איות שגוי. ביום עצמו אנחנו מביאים את המראה, מציבים אותה לפני שהאורחים מגיעים ואוספים אותה בסוף. המראות להשכרה בלבד.</p>
            <div className="hero-actions">
              <Link href="/questionnaire" className="btn btn-rose">לשאלון ההזמנה</Link>
              <a href={whatsappLink("היי, אשמח לשמוע על שלט קבלת פנים על מראה")} className="btn btn-line" target="_blank" rel="noopener"><IconWhatsapp />ווטסאפ</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section ws-close">
        <div className="wrap ws-narrow">
          <h2>הבדיקה האחרונה לפני שסוגרים נוסח</h2>
          <p>את הנוסח של שלט קבלת פנים הכי קל לבדוק בקול רם. אם אפשר להקריא את כל השלט בנשימה אחת, הוא קצר מספיק. ואם יש שורה שאתם עדיין מתלבטים לגביה, כנראה שאפשר לוותר עליה.</p>
        </div>
      </section>

      <section className="section band-white" aria-labelledby="faq-h">
        <div className="wrap faq-layout">
          <div className="head" style={{ marginBottom: 0 }}>
            <span className="kicker">questions</span>
            <h2 id="faq-h">שאלות על שלט קבלת פנים</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand text="את הנוסח שבחרתם נכתוב על מראה ונביא אותה לכניסה." />
      <JsonLd data={schema} />
    </>
  );
}

