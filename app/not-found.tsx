import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "60vh", display: "grid", alignItems: "center" }}>
      <div className="wrap">
        <h1>העמוד הזה לא משתקף כאן</h1>
        <p className="lede">אולי הקישור השתנה. אפשר לחזור לדף הבית או לבחור סוג אירוע.</p>
        <div className="hero-actions"><Link href="/" className="btn btn-rose">לדף הבית</Link><Link href="/services" className="btn btn-line">לסוגי האירועים</Link></div>
      </div>
    </section>
  );
}
