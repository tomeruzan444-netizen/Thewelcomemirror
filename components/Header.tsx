"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { IconChevron, IconClose, IconMenu, LogoMark } from "./Icons";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${site.name}, לדף הבית`}>
      <LogoMark className="logo-mark" />
      <span className="logo-word">The <i>Welcome</i> Mirror</span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [drop, setDrop] = useState(false);
  const [mobile, setMobile] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setDrop(false); setMobile(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setDrop(false); setMobile(false); } };
    const onClick = (e: MouseEvent) => { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);
  useEffect(() => { document.body.style.overflow = mobile ? "hidden" : ""; }, [mobile]);

  const cur = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Logo />
        <nav className="nav" aria-label="ניווט ראשי">
          <div className="nav-drop" ref={dropRef} data-open={drop}>
            <button type="button" aria-expanded={drop} aria-controls="svc-menu" onClick={() => setDrop((v) => !v)}>
              סוגי אירועים <IconChevron />
            </button>
            {drop && (
              <div className="drop-panel" id="svc-menu">
                {services.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`} aria-current={cur(`/${s.slug}`)}>
                    <span className="drop-dot" style={{ background: s.accent }} />
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/design-your-mirror" aria-current={cur("/design-your-mirror")}>עיצוב אישי</Link>
          <Link href="/services" aria-current={cur("/services")}>כל השירותים</Link>
          <Link href="/gallery" aria-current={cur("/gallery")}>גלריה</Link>
          <Link href="/#faq">שאלות נפוצות</Link>
          <Link href="/contact" aria-current={cur("/contact")}>צור קשר</Link>
        </nav>
        <Link href="/questionnaire" className="btn btn-rose header-cta">לשאלון ההזמנה</Link>
        <button className="burger" type="button" aria-expanded={mobile} aria-controls="mobile-menu" aria-label={mobile ? "סגירת תפריט" : "פתיחת תפריט"} onClick={() => setMobile((v) => !v)}>
          {mobile ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      <div className="mobile-panel" id="mobile-menu" data-open={mobile}>
        <h2>סוגי אירועים</h2>
        {services.map((s) => (
          <Link key={s.slug} href={`/${s.slug}`}>{s.title}</Link>
        ))}
        <h2>עוד באתר</h2>
        <Link href="/design-your-mirror">עצבו את המראה שלכם</Link>
        <Link href="/services">כל השירותים</Link>
        <Link href="/gallery">גלריה</Link>
        <Link href="/#faq">שאלות נפוצות</Link>
        <Link href="/contact">צור קשר</Link>
        <Link href="/questionnaire" className="btn btn-rose">לשאלון ההזמנה</Link>
      </div>
    </header>
  );
}
