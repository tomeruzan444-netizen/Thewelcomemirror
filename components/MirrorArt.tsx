import type { MirrorText } from "@/lib/services";

type Props = MirrorText & { animate?: boolean; className?: string };

const OVAL_GLASS = "M150 62 C214 62 236 150 236 232 C236 320 210 404 150 404 C90 404 64 320 64 232 C64 150 86 62 150 62 Z";
// וינטג': מלבן עם מסגרת מעוטרת
const VIN_GLASS = "M72 116 H228 V474 H72 Z";
// עיצוב אישי: קשת עגולה למעלה
const FLO_OUT = "M50 506 L50 176 A100 100 0 0 1 250 176 L250 506 Z";
const FLO_GLASS = "M66 490 L66 178 A84 84 0 0 1 234 178 L234 490 Z";

function Lettering({ l1, l2, date, foot, model, cy, animate }: MirrorText & { cy: number; animate: boolean }) {
  const cls = (i: number, base: string) => (animate ? { className: `${base} ink`, style: { animationDelay: `${0.5 + i * 0.35}s` } } : { className: base });
  const big = l1.length > 7 ? 30 : 38;
  let y = cy - (l2 ? 62 : 30);
  return (
    <g fill="#fff" textAnchor="middle" className="mirror-letters">
      <text x="150" y={y} fontSize={big} {...cls(0, "ml-serif")}>{l1}</text>
      {l2 && (
        <>
          <text x="150" y={(y += 40)} fontSize="30" {...cls(1, "ml-script")}>and</text>
          <text x="150" y={(y += 44)} fontSize={l2.length > 7 ? 30 : 38} {...cls(2, "ml-serif")}>{l2}</text>
        </>
      )}
      <text x="150" y={(y += 38)} fontSize={date.length > 12 ? 15 : 17} letterSpacing="1" {...cls(3, "ml-serif")}>{date}</text>
      {foot && <text x="150" y={cy + (model === "oval" ? 90 : 140)} fontSize={model === "oval" ? 7.5 : 10} letterSpacing={model === "oval" ? 1.4 : 2} {...cls(4, "ml-serif")}>{foot}</text>}
    </g>
  );
}

function Glass({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stopColor="#b9cbc5" />
        <stop offset=".45" stopColor="#c9d3cd" />
        <stop offset="1" stopColor="#dccbcc" />
      </linearGradient>
      <linearGradient id={`s-${id}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <filter id={`sh-${id}`} x="-30%" y="-10%" width="160%" height="130%">
        <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#7d5a62" floodOpacity=".18" />
      </filter>
    </defs>
  );
}

function Spindle({ x }: { x: number }) {
  // עמוד מגולף עם כדור בראשו
  return (
    <g fill="#fff" stroke="#eadfd8" strokeWidth="1">
      <circle cx={x} cy="40" r="7" />
      <path d={`M${x - 5} 48 h10 l-2 10 h-6 z`} />
      <rect x={x - 6} y="58" width="12" height="160" rx="5" />
      <ellipse cx={x} cy="228" rx="9" ry="12" />
      <rect x={x - 6} y="238" width="12" height="230" rx="5" />
      <ellipse cx={x} cy="476" rx="8" ry="10" />
      <rect x={x - 5} y="484" width="10" height="20" rx="3" />
    </g>
  );
}


function Scroll({ flip = false }: { flip?: boolean }) {
  // עיטור וינטג' בפינה
  return (
    <g transform={flip ? "scale(-1 1)" : undefined} fill="none" stroke="#d8c1a3" strokeWidth="1.5" strokeLinecap="round">
      <path d="M0 0 C10 -2 16 6 12 14 C9 20 1 18 2 12 C3 8 8 8 8 12" />
      <path d="M0 0 C-2 10 6 16 14 12 C20 9 18 1 12 2 C8 3 8 8 12 8" />
      <circle cx="0" cy="0" r="3.2" fill="#fff" />
    </g>
  );
}

function Flower({ x, y, r, c, rot = 0 }: { x: number; y: number; r: number; c: string; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy={-r * 0.62} rx={r * 0.42} ry={r * 0.62} fill={c} opacity=".92" transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.26} fill="#f6d9a8" />
    </g>
  );
}

function Leaf({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return <path d="M0 0 C6 -8 18 -8 24 0 C18 8 6 8 0 0 Z" fill="#a9bfa2" opacity=".9" transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} />;
}

function Bouquet({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  // ציור פרחים בעבודת יד על הזכוכית
  return (
    <g transform={`translate(${x} ${y})${flip ? " scale(-1 -1)" : ""}`}>
      <Leaf x={6} y={30} rot={-20} s={1.1} />
      <Leaf x={34} y={6} rot={-75} />
      <Leaf x={44} y={36} rot={10} s={.8} />
      <Leaf x={14} y={54} rot={-60} s={.8} />
      <Flower x={18} y={20} r={15} c="#f3b9c3" rot={10} />
      <Flower x={44} y={22} r={10} c="#fff3ee" rot={30} />
      <Flower x={22} y={46} r={9} c="#e9a0ae" rot={-15} />
      <circle cx="58" cy="8" r="3" fill="#f3b9c3" />
      <circle cx="60" cy="40" r="2.4" fill="#e9a0ae" />
      <circle cx="6" cy="62" r="2.4" fill="#f3b9c3" />
    </g>
  );
}

export default function MirrorArt({ l1, l2, date, foot, model, animate = true, className }: Props) {
  const id = `${model}-${l1.replace(/\W/g, "")}`;
  return (
    <svg viewBox="0 0 300 540" className={`mirror-svg ${className ?? ""}`} role="img" aria-label={`איור של מראה עם הכיתוב ${[l1, l2, date].filter(Boolean).join(" ")}`} direction="ltr">
      <Glass id={id} />
      {model === "oval" ? (
        <g filter={`url(#sh-${id})`}>
          <Spindle x={42} />
          <Spindle x={258} />
          <rect x="42" y="226" width="16" height="10" fill="#fff" />
          <rect x="242" y="226" width="16" height="10" fill="#fff" />
          <path d="M18 508 Q42 494 66 508 L66 516 H18 Z M234 508 Q258 494 282 508 L282 516 H234 Z" fill="#fff" stroke="#eadfd8" />
          <path d={OVAL_GLASS} transform="translate(150 233) scale(1.09 1.07) translate(-150 -233)" fill="#fff" stroke="#eadfd8" />
          <path d={OVAL_GLASS} fill={`url(#g-${id})`} />
          <clipPath id={`c-${id}`}><path d={OVAL_GLASS} /></clipPath>
          <g clipPath={`url(#c-${id})`}>
            <rect className={animate ? "sheen" : undefined} x="-120" y="40" width="90" height="400" fill={`url(#s-${id})`} transform="skewX(-18)" />
          </g>
          <Lettering l1={l1} l2={l2} date={date} foot={foot} model={model} cy={238} animate={animate} />
        </g>
      ) : model === "vintage" ? (
        <g filter={`url(#sh-${id})`}>
          {/* כתר עיטור עליון */}
          <path d="M96 78 C104 52 128 34 150 34 C172 34 196 52 204 78 Z" fill="#fff" stroke="#eadfd8" />
          <g fill="none" stroke="#d8c1a3" strokeWidth="1.5" strokeLinecap="round">
            <path d="M150 42 C142 50 142 60 150 68 C158 60 158 50 150 42 Z" />
            <path d="M144 70 C132 52 112 56 112 68 C112 76 122 76 122 70" />
            <path d="M156 70 C168 52 188 56 188 68 C188 76 178 76 178 70" />
          </g>
          <circle cx="150" cy="30" r="5" fill="#fff" stroke="#d8c1a3" strokeWidth="1.3" />
          <rect x="40" y="74" width="220" height="434" rx="8" fill="#fff" stroke="#eadfd8" />
          <rect x="52" y="88" width="196" height="406" rx="4" fill="none" stroke="#e6d6c6" strokeWidth="1.4" />
          <rect x="62" y="104" width="176" height="382" fill="none" stroke="#dcc7ae" strokeDasharray="1 6" strokeLinecap="round" strokeWidth="2.4" />
          {/* עיטורי צד */}
          <g fill="none" stroke="#d8c1a3" strokeWidth="1.4" strokeLinecap="round">
            <path d="M46 270 C56 280 56 300 46 310 M46 270 C40 280 40 300 46 310" />
            <path d="M254 270 C244 280 244 300 254 310 M254 270 C260 280 260 300 254 310" />
            <path d="M130 500 C140 490 160 490 170 500" />
          </g>
          <path d={VIN_GLASS} fill={`url(#g-${id})`} />
          <clipPath id={`c-${id}`}><path d={VIN_GLASS} /></clipPath>
          <g clipPath={`url(#c-${id})`}>
            <rect className={animate ? "sheen" : undefined} x="-120" y="40" width="90" height="480" fill={`url(#s-${id})`} transform="skewX(-18)" />
          </g>
          <g transform="translate(58 96) scale(1.7)"><Scroll /></g>
          <g transform="translate(242 96) scale(1.7)"><Scroll flip /></g>
          <g transform="translate(58 492) scale(1.7 -1.7)"><Scroll /></g>
          <g transform="translate(242 492) scale(1.7 -1.7)"><Scroll flip /></g>
          <path d="M58 508 L54 524 H84 L80 508 Z M220 508 L216 524 H246 L242 508 Z" fill="#fff" stroke="#eadfd8" />
          <Lettering l1={l1} l2={l2} date={date} foot={foot} model={model} cy={276} animate={animate} />
        </g>
      ) : (
        <g filter={`url(#sh-${id})`}>
          <path d={FLO_OUT} fill="#fff" stroke="#eadfd8" />
          <path d={FLO_GLASS} fill={`url(#g-${id})`} />
          <clipPath id={`c-${id}`}><path d={FLO_GLASS} /></clipPath>
          <g clipPath={`url(#c-${id})`}>
            <rect className={animate ? "sheen" : undefined} x="-120" y="40" width="90" height="480" fill={`url(#s-${id})`} transform="skewX(-18)" />
            <Bouquet x={74} y={112} />
            <Bouquet x={226} y={482} flip />
          </g>
          <rect x="42" y="506" width="216" height="14" rx="3" fill="#fff" stroke="#eadfd8" />
          <Lettering l1={l1} l2={l2} date={date} foot={foot} model={model} cy={286} animate={animate} />
        </g>
      )}
    </svg>
  );
}
