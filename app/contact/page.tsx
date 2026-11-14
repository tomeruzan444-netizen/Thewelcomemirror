import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { QuizSection } from "@/components/Sections";
import { site, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "צור קשר",
  description: `יצירת קשר עם ${site.name} להשכרת מראת קבלת פנים לחתונה או לאירוע. טלפון, ווטסאפ, מייל ושאלון הזמנה קצר.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="פירורי לחם"><ol><li><Link href="/">דף הבית</Link></li><li aria-current="page">צור קשר</li></ol></nav>
          <h1>בואו נדבר על האירוע שלכם</h1>
          <p className="lede">התקשרו, שלחו <a href={whatsappLink()} target="_blank" rel="noopener">ווטסאפ</a>, או מלאו את השאלון הקצר כאן למטה. {site.hours}.</p>
        </div>
      </section>
      <QuizSection />
    </>
  );
}
