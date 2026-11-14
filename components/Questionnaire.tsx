"use client";
import { useId, useRef, useState } from "react";
import { letterings, models } from "@/lib/designs";
import MirrorArt from "./MirrorArt";
import { site, whatsappLink } from "@/lib/site";
import { IconWhatsapp } from "./Icons";

type Props = {
  /** "החתונה" כברירת מחדל. בעמודי שירות אחרים אפשר להעביר למשל "האירוע" */
  eventWord?: string;
  eventType?: string;
};

type Data = { name: string; phone: string; location: string; date: string; design: string; lettering: string; notes: string };
type Errors = Partial<Record<keyof Data, string>>;

const STEPS = ["פרטים אישיים", "פרטי האירוע", "המראה והעיצוב", "סיכום"];

function cleanPhone(v: string) { return v.replace(/[\s\-()]/g, "").replace(/^\+972/, "0"); }

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export default function Questionnaire({ eventWord = "החתונה", eventType }: Props) {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [data, setData] = useState<Data>({ name: "", phone: "", location: "", date: "", design: "", lettering: "", notes: "" });
  const headRef = useRef<HTMLHeadingElement>(null);

  const set = (k: keyof Data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const today = new Date().toISOString().slice(0, 10);

  function validate(s: number): Errors {
    const er: Errors = {};
    if (s === 0) {
      if (data.name.trim().split(/\s+/).filter(Boolean).length < 2) er.name = "כתבו שם פרטי ושם משפחה";
      if (!/^0(5\d|7\d|[2-489])\d{7}$/.test(cleanPhone(data.phone))) er.phone = "כתבו מספר טלפון ישראלי תקין, למשל 050-1234567";
    }
    if (s === 1) {
      if (data.location.trim().length < 2) er.location = "כתבו את שם האולם או הגן, והעיר";
      if (!data.date) er.date = `בחרו את תאריך ${eventWord}`;
      else if (data.date < today) er.date = "התאריך שבחרתם כבר עבר";
    }
    if (s === 2 && !data.design) er.design = "בחרו מראה, או \"נשמח להמלצה\"";
    return er;
  }

  function go(next: number) {
    if (next > step) {
      const er = validate(step);
      setErrors(er);
      if (Object.keys(er).length) {
        const first = Object.keys(er)[0];
        document.getElementById(`${uid}-${first}`)?.focus();
        return;
      }
    }
    setStep(next);
    requestAnimationFrame(() => headRef.current?.focus());
  }

  const designName = models.find((d) => d.id === data.design)?.name ?? "";
  const letteringName = letterings.find((l) => l.id === data.lettering)?.name ?? "";

  const message = [
    `היי ${site.name}, מילאתי את שאלון ההזמנה באתר:`,
    eventType ? `סוג האירוע: ${eventType}` : null,
    `שם: ${data.name.trim()}`,
    `טלפון: ${data.phone.trim()}`,
    `מיקום ${eventWord}: ${data.location.trim()}`,
    `תאריך ${eventWord}: ${formatDate(data.date)}`,
    `מראה: ${designName}`,
    letteringName ? `סגנון כיתוב: ${letteringName}` : null,
    data.notes.trim() ? `כיתוב מבוקש: ${data.notes.trim()}` : null,
  ].filter(Boolean).join("\n");

  function send() {
    window.open(whatsappLink(message), "_blank", "noopener");
    setSent(true);
  }

  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(`שאלון הזמנה - ${data.name.trim()}`)}&body=${encodeURIComponent(message)}`;

  if (sent) {
    return (
      <div className="quiz" aria-live="polite">
        <div className="quiz-done">
          <span className="script">Thank you</span>
          <h3>הפרטים מוכנים לשליחה בווטסאפ</h3>
          <p>אם חלון הווטסאפ לא נפתח, אפשר <a href={whatsappLink(message)} target="_blank" rel="noopener">לפתוח אותו מכאן</a> או <a href={mailHref}>לשלוח במייל</a>. נחזור אליכם עם בדיקת זמינות והצעה.</p>
          <button type="button" className="quiz-back" onClick={() => { setSent(false); setStep(3); }}>חזרה לסיכום</button>
        </div>
      </div>
    );
  }

  return (
    <form className="quiz" noValidate onSubmit={(e) => { e.preventDefault(); if (step < 3) go(step + 1); else send(); }} aria-labelledby={`${uid}-h`}>
      <div className="quiz-progress" aria-hidden="true">
        {STEPS.map((s, i) => <span key={s} data-on={i <= step} />)}
      </div>
      <span className="quiz-step-label">שלב {step + 1} מתוך {STEPS.length}</span>
      <h3 id={`${uid}-h`} ref={headRef} tabIndex={-1}>
        {step === 0 && "איך קוראים לכם?"}
        {step === 1 && `ספרו לנו על ${eventWord}`}
        {step === 2 && "איזו מראה אתם אוהבים?"}
        {step === 3 && "הכול נכון?"}
      </h3>

      {step === 0 && (
        <div className="fields">
          <div className="field">
            <label htmlFor={`${uid}-name`}>שם ושם משפחה</label>
            <input id={`${uid}-name`} name="name" autoComplete="name" value={data.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-e` : undefined} required />
            {errors.name && <span className="field-error" id={`${uid}-name-e`}>{errors.name}</span>}
          </div>
          <div className="field">
            <label htmlFor={`${uid}-phone`}>מספר טלפון</label>
            <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" style={{ textAlign: "right" }} value={data.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-e` : undefined} required />
            {errors.phone && <span className="field-error" id={`${uid}-phone-e`}>{errors.phone}</span>}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="fields">
          <div className="field">
            <label htmlFor={`${uid}-location`}>מיקום {eventWord}</label>
            <input id={`${uid}-location`} name="location" value={data.location} onChange={set("location")} aria-invalid={!!errors.location} aria-describedby={`${uid}-location-h${errors.location ? ` ${uid}-location-e` : ""}`} required />
            <span className="field-hint" id={`${uid}-location-h`}>שם האולם או הגן, והעיר</span>
            {errors.location && <span className="field-error" id={`${uid}-location-e`}>{errors.location}</span>}
          </div>
          <div className="field">
            <label htmlFor={`${uid}-date`}>תאריך {eventWord}</label>
            <input id={`${uid}-date`} name="date" type="date" min={today} value={data.date} onChange={set("date")} aria-invalid={!!errors.date} aria-describedby={errors.date ? `${uid}-date-e` : undefined} required />
            {errors.date && <span className="field-error" id={`${uid}-date-e`}>{errors.date}</span>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }} aria-describedby={errors.design ? `${uid}-design-e` : undefined}>
            <legend className="visually-hidden">דגם המראה</legend>
            <div className="pick-grid">
              {models.map((m, i) => (
                <label key={m.id} className="pick">
                  <input type="radio" name="design" value={m.id} id={i === 0 ? `${uid}-design` : undefined} checked={data.design === m.id} onChange={() => { setData((x) => ({ ...x, design: m.id })); setErrors((e) => ({ ...e, design: undefined })); }} />
                  <span className="pick-tile">
                    <span className="pick-visual">
                      {m.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.image} alt="" loading="lazy" />
                      ) : m.shape === "none" ? (
                        <span className="script">?</span>
                      ) : (
                        <MirrorArt l1="Your" l2="Names" date="Your date" foot="WELCOME" model={m.shape} animate={false} />
                      )}
                    </span>
                    <span className="pick-name">{m.name}</span>
                    <span className="pick-text">{m.text}</span>
                  </span>
                </label>
              ))}
            </div>
            {errors.design && <span className="field-error" id={`${uid}-design-e`}>{errors.design}</span>}
          </fieldset>

          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend><h4>סגנון הכיתוב (לא חובה)</h4></legend>
            <div className="chips">
              {letterings.map((l) => (
                <label key={l.id} className="chip">
                  <input type="radio" name="lettering" value={l.id} checked={data.lettering === l.id} onChange={() => setData((x) => ({ ...x, lettering: l.id }))} />
                  <span><span className={`sample s-${l.id}`} dir={l.id === "hebrew" ? "rtl" : "ltr"}>{l.sample}</span><span>{l.name}</span></span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field" style={{ marginTop: "1.4rem" }}>
            <label htmlFor={`${uid}-notes`}>מה תרצו שייכתב על המראה? (לא חובה)</label>
            <textarea id={`${uid}-notes`} name="notes" value={data.notes} onChange={set("notes")} placeholder="למשל: Noa and Itay, 12.06.2027, Welcome to our wedding" />
          </div>
        </div>
      )}

      {step === 3 && (
        <>
          <ul className="quiz-summary">
            <li><span>שם</span><span>{data.name}</span></li>
            <li><span>טלפון</span><span dir="ltr">{data.phone}</span></li>
            <li><span>מיקום {eventWord}</span><span>{data.location}</span></li>
            <li><span>תאריך {eventWord}</span><span>{formatDate(data.date)}</span></li>
            <li><span>מראה</span><span>{designName}</span></li>
            {letteringName && <li><span>סגנון כיתוב</span><span>{letteringName}</span></li>}
            {data.notes.trim() && <li><span>כיתוב</span><span>{data.notes}</span></li>}
          </ul>
          <p className="quiz-note">בלחיצה על השליחה ייפתח ווטסאפ עם כל הפרטים, ונחזור אליכם עם בדיקת זמינות.</p>
        </>
      )}

      <div className="quiz-nav">
        {step > 0 ? <button type="button" className="quiz-back" onClick={() => go(step - 1)}>חזרה</button> : <span />}
        {step < 3 ? (
          <button type="submit" className="btn btn-rose">המשך</button>
        ) : (
          <button type="submit" className="btn btn-rose"><IconWhatsapp />שליחה בווטסאפ</button>
        )}
      </div>
    </form>
  );
}
