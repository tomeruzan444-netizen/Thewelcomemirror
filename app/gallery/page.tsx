import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/Sections";
import { gallery } from "@/lib/gallery";

export const metadata = pageMeta({
  title: "גלריה - מראת קבלת פנים בחתונות ובאירועים",
  description: "תמונות מאירועים ודגמי המראות שלנו: המראה האובלית, מראת הווינטג' והמראה בעיצוב אישי, עם כיתוב אישי לחתונה ולכל אירוע.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="פירורי לחם"><ol><li><Link href="/">דף הבית</Link></li><li aria-current="page">גלריה</li></ol></nav>
          <h1>גלריה</h1>
          <p className="lede">רגעים מול המראה, והדגמים שאפשר לבחור לאירוע שלכם.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="events-h">
        <div className="wrap">
          <div className="head center"><span className="kicker">gallery</span><h2 id="events-h">המראות שלנו באירועים</h2><p>שלושה דגמים, כל אחד עם הכיתוב של בעלי השמחה. <Link href="/design-your-mirror">עצבו את המראה שלכם</Link>.</p></div>
          {gallery.length ? (
            <div className="gallery">
              {gallery.map((g, i) => (
                <figure key={g.src}>
                  <Image src={g.src} alt={g.alt} width={g.width ?? 900} height={g.height ?? 1200} sizes="(max-width:760px) 50vw, 33vw" priority={i === 0} />
                  {g.caption && <figcaption>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <div className="empty-gallery">
              <h3>התמונות מהאירועים בדרך</h3>
              <p style={{ color: "var(--muted)", marginTop: ".6rem" }}>בינתיים אפשר לראות עוד באינסטגרם שלנו, @thewelcome.mirror.</p>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
