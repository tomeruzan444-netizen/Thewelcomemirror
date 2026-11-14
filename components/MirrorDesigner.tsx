"use client";
import Link from "next/link";
import { useId, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { IconWhatsapp } from "./Icons";

type Style = "classic" | "romantic" | "modern";
type Ink = "white" | "gold" | "rose";

type Design = { top: string; name1: string; name2: string; date: string; bottom: string; style: Style; ink: Ink };

const DEFAULTS: Design = { top: "Welcome", name1: "Noa", name2: "Itay", date: "12.06.2027", bottom: "Celebrate with us", style: "classic", ink: "white" };

const STYLES: { id: Style; name: string }[] = [
  { id: "classic", name: "קלאסי" },
  { id: "romantic", name: "כתב יד רומנטי" },
  { id: "modern", name: "מודרני" },
];

const INKS: { id: Ink; name: string; color: string }[] = [
  { id: "white", name: "לבן", color: "#ffffff" },
  { id: "gold", name: "זהב", color: "#c9a26b" },
  { id: "rose", name: "ורוד עתיק", color: "#b46f7d" },
];

const hasHebrew = (t: string) => /[֐-׿]/.test(t);

/** מקטין את הגופן כשהטקסט ארוך, כדי שיישאר בתוך הזכוכית */
function fit(text: string, base: number, perChar: number, max = 220) {
  if (!text) return base;
  return Math.max(10, Math.min(base, max / (text.length * perChar)));
}

function Line({ text, y, size, family, spacing = 0, upper = false, color }: { text: string; y: number; size: number; family: "serif" | "script" | "sans"; spacing?: number; upper?: boolean; color: string }) {
  if (!text.trim()) return null;
  const heb = hasHebrew(text);
  // כתב יד לטיני לא תומך בעברית, אז בעברית חוזרים לגופן הכותרות
  const fam = heb && family === "script" ? "serif" : family;
  return (
    <text
      x="160"
      y={y}
      fontSize={size}
      letterSpacing={heb ? 0 : spacing}
      fill={color}
      textAnchor="middle"
      direction={heb ? "rtl" : "ltr"}
      className={`md-${fam}`}
    >
      {upper && !heb ? text.toUpperCase() : text}
    </text>
  );
}

function Preview({ d }: { d: Design }) {
  const color = INKS.find((i) => i.id === d.ink)!.color;
  const nameFam = d.style === "romantic" ? "script" : d.style === "modern" ? "sans" : "serif";
  const namePer = nameFam === "script" ? 0.42 : nameFam === "sans" ? 0.68 : 0.55;
  const nameBase = nameFam === "script" ? 50 : nameFam === "sans" ? 30 : 40;
  const two = d.name1.trim() && d.name2.trim();
  const single = (d.name1.trim() || d.name2.trim());
  const label = [d.top, d.name1, d.name2, d.date, d.bottom].filter((t) => t.trim()).join(", ");
  return (
    <svg viewBox="0 0 320 500" className="md-svg" role="img" aria-label={`הדמיה של המראה עם הכיתוב: ${label || "ללא כיתוב"}`}>
      <defs>
        <linearGradient id="md-glass" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#b9cbc5" />
          <stop offset=".5" stopColor="#c9d3cd" />
          <stop offset="1" stopColor="#dccbcc" />
        </linearGradient>
        <linearGradient id="md-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="md-shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#7d5a62" floodOpacity=".18" />
        </filter>
        <clipPath id="md-clip"><rect x="40" y="40" width="240" height="400" /></clipPath>
      </defs>
      <g filter="url(#md-shadow)">
        <rect x="20" y="20" width="280" height="440" rx="6" fill="#fff" stroke="#eadfd8" />
        <rect x="30" y="30" width="260" height="420" rx="3" fill="none" stroke="#efe5dc" strokeWidth="1.5" />
        <rect x="40" y="40" width="240" height="400" fill="url(#md-glass)" />
        <g clipPath="url(#md-clip)">
          <rect x="-40" y="20" width="70" height="460" fill="url(#md-sheen)" transform="skewX(-16)" />
        </g>
        <path d="M44 460 L40 480 H74 L70 460 Z M250 460 L246 480 H280 L276 460 Z" fill="#fff" stroke="#eadfd8" />
      </g>
      <g className="md-letters">
        <Line text={d.top} y={128} size={fit(d.top, 46, 0.42)} family="script" color={color} />
        {two ? (
          <>
            <Line text={d.name1} y={208} size={fit(d.name1, nameBase, namePer)} family={nameFam} spacing={nameFam === "sans" ? 3 : 0} upper={nameFam === "sans"} color={color} />
            <Line text="&" y={248} size={nameFam === "sans" ? 18 : 26} family="script" color={color} />
            <Line text={d.name2} y={292} size={fit(d.name2, nameBase, namePer)} family={nameFam} spacing={nameFam === "sans" ? 3 : 0} upper={nameFam === "sans"} color={color} />
          </>
        ) : (
          single && <Line text={single} y={250} size={fit(single, nameBase + 4, namePer)} family={nameFam} spacing={nameFam === "sans" ? 3 : 0} upper={nameFam === "sans"} color={color} />
        )}
        <Line text={d.date} y={338} size={fit(d.date, 17, 0.62)} family="serif" spacing={1.5} color={color} />
        <Line text={d.bottom} y={398} size={hasHebrew(d.bottom) ? fit(d.bottom, 15, 0.6, 200) : fit(d.bottom, 11, 0.75, 200)} family="serif" spacing={2.4} upper color={color} />
      </g>
    </svg>
  );
}

export default function MirrorDesigner() {
  const uid = useId();
  const [d, setD] = useState<Design>(DEFAULTS);
  const set = (k: keyof Design) => (e: React.ChangeEvent<HTMLInputElement>) => setD((x) => ({ ...x, [k]: e.target.value }));

  const styleName = STYLES.find((s) => s.id === d.style)!.name;
  const inkName = INKS.find((i) => i.id === d.ink)!.name;
  const message = [
    `היי ${site.name}, עיצבתי מראה באתר ואשמח לבדוק זמינות להשכרה:`,
    d.top.trim() && `למעלה: ${d.top.trim()}`,
    (d.name1.trim() || d.name2.trim()) && `שמות: ${[d.name1.trim(), d.name2.trim()].filter(Boolean).join(" & ")}`,
    d.date.trim() && `תאריך: ${d.date.trim()}`,
    d.bottom.trim() && `למטה: ${d.bottom.trim()}`,
    `סגנון כתב: ${styleName}`,
    `צבע כיתוב: ${inkName}`,
  ].filter(Boolean).join("\n");

  const fields: { k: keyof Design; label: string; hint?: string; ph: string }[] = [
    { k: "top", label: "שורה עליונה", ph: "Welcome" },
    { k: "name1", label: "שם ראשון", ph: "Noa" },
    { k: "name2", label: "שם שני", hint: "השאירו ריק אם יש שם אחד", ph: "Itay" },
    { k: "date", label: "תאריך", ph: "12.06.2027" },
    { k: "bottom", label: "שורה תחתונה", ph: "Celebrate with us" },
  ];

  return (
    <div className="designer">
      <div className="designer-form">
        <div className="fields">
          {fields.map((f) => (
            <div className="field" key={f.k}>
              <label htmlFor={`${uid}-${f.k}`}>{f.label}</label>
              <input
                id={`${uid}-${f.k}`}
                value={d[f.k] as string}
                onChange={set(f.k)}
                placeholder={f.ph}
                maxLength={f.k === "bottom" ? 32 : 22}
                dir="auto"
                aria-describedby={f.hint ? `${uid}-${f.k}-h` : undefined}
              />
              {f.hint && <span className="field-hint" id={`${uid}-${f.k}-h`}>{f.hint}</span>}
            </div>
          ))}
        </div>

        <fieldset className="designer-group">
          <legend>סגנון הכתב לשמות</legend>
          <div className="chips">
            {STYLES.map((s) => (
              <label key={s.id} className="chip">
                <input type="radio" name={`${uid}-style`} checked={d.style === s.id} onChange={() => setD((x) => ({ ...x, style: s.id }))} />
                <span>{s.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="designer-group">
          <legend>צבע הכיתוב</legend>
          <div className="chips">
            {INKS.map((i) => (
              <label key={i.id} className="chip">
                <input type="radio" name={`${uid}-ink`} checked={d.ink === i.id} onChange={() => setD((x) => ({ ...x, ink: i.id }))} />
                <span><span className="swatch" style={{ background: i.color }} aria-hidden="true" />{i.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="designer-actions">
          <a className="btn btn-rose" href={whatsappLink(message)} target="_blank" rel="noopener"><IconWhatsapp />שליחת העיצוב בווטסאפ</a>
          <Link className="btn btn-line" href="/questionnaire">לשאלון ההזמנה</Link>
        </div>
        <button type="button" className="quiz-back" onClick={() => setD(DEFAULTS)}>חזרה לדוגמה</button>
      </div>

      <div className="designer-preview">
        <Preview d={d} />
        <p className="designer-note">ההדמיה להמחשה בלבד. לפני האירוע נשלח לכם הדמיה מדויקת לאישור.</p>
      </div>
    </div>
  );
}
