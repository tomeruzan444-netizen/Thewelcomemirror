import Link from "next/link";
import { services } from "@/lib/services";
import { topics } from "@/lib/topics";
import { site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <span className="footer-tag">{site.tagline}</span>
            <p>מראות קבלת פנים מעוצבות לחתונות ולאירועים, עם השמות שלכם. להשכרה, {site.area.replace(" - ", ", ")}.</p>
          </div>
          <div>
            <h2>אירועים</h2>
            <ul>{services.map((s) => <li key={s.slug}><Link href={`/${s.slug}`}>{s.title}</Link></li>)}</ul>
          </div>
          <div>
            <h2>מראות להשכרה</h2>
            <ul>{topics.map((t) => <li key={t.slug}><Link href={`/${t.slug}`}>{t.title}</Link></li>)}</ul>
          </div>
          <div>
            <h2>יצירת קשר</h2>
            <ul>
              <li><a href={`tel:${site.phoneIntl}`}>{site.phoneDisplay}</a></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener">ווטסאפ</a></li>
              <li><a href={site.instagramUrl} target="_blank" rel="noopener">אינסטגרם</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Link href="/design-your-mirror">עיצוב אישי של המראה</Link></li>
              <li><Link href="/questionnaire">שאלון הזמנה</Link></li>
              <li><Link href="/faq">שאלות נפוצות</Link></li>
              <li>{site.hours}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}. כל הזכויות שמורות.</span>
          <span><Link href="/accessibility">הצהרת נגישות</Link> | <Link href="/privacy">מדיניות פרטיות</Link></span>
        </div>
      </div>
    </footer>
  );
}
