"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { instagramPostUrl, type InstagramPost } from "@/lib/instagram";

const fmtDate = (iso: string) => iso.split("-").reverse().join(".");

/**
 * קרוסלת פוסטים מהאינסטגרם. כל התמונות והטקסטים מתרנדרים בשרת (גלויים לגוגל),
 * והחצים והנקודות רק מגלגלים את המסילה. בלי JavaScript אפשר לגלול ידנית.
 */
export default function InstagramCarousel({ posts, labelledBy }: { posts: InstagramPost[]; labelledBy: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const items = el.children as HTMLCollectionOf<HTMLElement>;
      const max = el.scrollWidth - el.clientWidth;
      const pos = Math.abs(el.scrollLeft); // ב-RTL scrollLeft שלילי
      const step = items.length > 1 ? Math.abs(items[1].offsetLeft - items[0].offsetLeft) : 1;
      setEdges({ start: pos < 8, end: pos > max - 8 });
      setActive(pos > max - 8 ? items.length - 1 : Math.round(pos / step));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const item = el?.children[Math.max(0, Math.min(posts.length - 1, i))] as HTMLElement | undefined;
    if (!el || !item) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const offset = rtl
      ? item.offsetLeft + item.offsetWidth - el.clientWidth
      : item.offsetLeft;
    el.scrollTo({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="ig-carousel" role="region" aria-roledescription="קרוסלה" aria-labelledby={labelledBy}>
      <ul className="ig-track" ref={track}>
        {posts.map((p, i) => (
          <li key={p.id} className="ig-card" aria-label={`פוסט ${i + 1} מתוך ${posts.length}`}>
            <figure>
              <a className="ig-photo" href={instagramPostUrl(p.id)} target="_blank" rel="noopener" aria-label={`לפוסט באינסטגרם: ${p.caption}`}>
                <Image src={p.image} alt={p.alt} width={p.width} height={p.height} sizes="(max-width:640px) 82vw, (max-width:1100px) 42vw, 360px" />
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
      <div className="ig-controls">
        <button type="button" className="ig-arrow" onClick={() => goTo(active - 1)} disabled={edges.start} aria-label="לפוסט הקודם">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="ig-dots">
          {posts.map((p, i) => (
            <button key={p.id} type="button" className={i === active ? "on" : undefined} onClick={() => goTo(i)} aria-label={`לפוסט ${i + 1}`} aria-current={i === active ? "true" : undefined} />
          ))}
        </div>
        <button type="button" className="ig-arrow" onClick={() => goTo(active + 1)} disabled={edges.end} aria-label="לפוסט הבא">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
