"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { instagramPostUrl, type InstagramPost } from "@/lib/instagram";

const fmtDate = (iso: string) => iso.split("-").reverse().join(".");

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * קרוסלת פוסטים מהאינסטגרם. כל התמונות והטקסטים מתרנדרים בשרת (גלויים לגוגל).
 * הזזה: החלקה באצבע במובייל, גרירה בעכבר, חצים בצדדים ובתחתית, מקשי החצים ונקודות.
 * החצים מסתובבים: מהפוסט האחרון ממשיכים לראשון ולהפך.
 */
export default function InstagramCarousel({ posts, labelledBy }: { posts: InstagramPost[]; labelledBy: string }) {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const items = el.children as HTMLCollectionOf<HTMLElement>;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft); // ב-RTL scrollLeft שלילי
    const step = items.length > 1 ? Math.abs(items[1].offsetLeft - items[0].offsetLeft) : 1;
    const end = pos > max - 8;
    setAtEnd(end);
    setActive(end ? items.length - 1 : Math.round(pos / step));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => { el.removeEventListener("scroll", measure); window.removeEventListener("resize", measure); };
  }, [measure]);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = posts.length;
    const idx = ((i % n) + n) % n;
    const item = el.children[idx] as HTMLElement;
    const rtl = getComputedStyle(el).direction === "rtl";
    const left = rtl ? item.offsetLeft + item.offsetWidth - el.clientWidth : item.offsetLeft;
    el.scrollTo({ left, behavior: "smooth" });
  };
  const next = () => goTo(atEnd ? 0 : active + 1);
  const prev = () => goTo(active === 0 ? posts.length - 1 : active - 1);

  // גרירה בעכבר (במגע הדפדפן מטפל בהחלקה בעצמו)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !track.current) return;
    drag.current = { down: true, moved: false, x: e.clientX, left: track.current.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current, el = track.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      el.classList.add("dragging");
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current, el = track.current;
    if (!d.down || !el) return;
    d.down = false;
    if (!d.moved) return;
    el.classList.remove("dragging");
    // נצמדים לפוסט הקרוב אחרי שחרור
    const items = el.children as HTMLCollectionOf<HTMLElement>;
    const step = items.length > 1 ? Math.abs(items[1].offsetLeft - items[0].offsetLeft) : 1;
    goTo(Math.round(Math.abs(el.scrollLeft) / step));
  };
  // לחיצה שהגיעה בסוף גרירה לא פותחת את הקישור
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; }
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); next(); } // RTL: שמאלה = הבא
    if (e.key === "ArrowRight") { e.preventDefault(); prev(); }
  };

  return (
    <div className="ig-carousel" role="region" aria-roledescription="קרוסלה" aria-labelledby={labelledBy} onKeyDown={onKeyDown}>
      <div className="ig-stage">
        <ul
          className="ig-track"
          ref={track}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
        >
          {posts.map((p, i) => (
            <li key={p.id} className="ig-card" aria-label={`פוסט ${i + 1} מתוך ${posts.length}`}>
              <figure>
                <a className="ig-photo" href={instagramPostUrl(p.id)} target="_blank" rel="noopener" aria-label={`לפוסט באינסטגרם: ${p.caption}`}>
                  <Image src={p.image} alt={p.alt} width={p.width} height={p.height} draggable={false} sizes="(max-width:640px) 82vw, (max-width:1100px) 42vw, 360px" />
                </a>
                <figcaption>
                  {p.model && <span className="ig-model">{p.model}</span>}
                  <p className="ig-caption">{p.caption}</p>
                  <p className="ig-meta">
                    <time dateTime={p.date}>{fmtDate(p.date)}</time>
                    {p.location && <> · {p.location}</>}
                    {p.credit && <> · צילום: <a href={`https://www.instagram.com/${p.credit}/`} target="_blank" rel="noopener">@{p.credit}</a></>}
                  </p>
                  <a className="ig-link" href={instagramPostUrl(p.id)} target="_blank" rel="noopener">לפוסט באינסטגרם</a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <button type="button" className="ig-arrow ig-side ig-side-prev" onClick={prev} aria-label="לפוסט הקודם"><Chevron dir="right" /></button>
        <button type="button" className="ig-arrow ig-side ig-side-next" onClick={next} aria-label="לפוסט הבא"><Chevron dir="left" /></button>
      </div>
      <div className="ig-controls">
        <button type="button" className="ig-arrow ig-bottom" onClick={prev} aria-label="לפוסט הקודם"><Chevron dir="right" /></button>
        <div className="ig-dots">
          {posts.map((p, i) => (
            <button key={p.id} type="button" className={i === active ? "on" : undefined} onClick={() => goTo(i)} aria-label={`לפוסט ${i + 1}`} aria-current={i === active ? "true" : undefined} />
          ))}
        </div>
        <button type="button" className="ig-arrow ig-bottom" onClick={next} aria-label="לפוסט הבא"><Chevron dir="left" /></button>
      </div>
    </div>
  );
}
