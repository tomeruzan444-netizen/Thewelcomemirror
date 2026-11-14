import Link from "next/link";
import MirrorDesigner from "@/components/MirrorDesigner";
import { CtaBand, Flourish } from "@/components/Sections";

export const metadata = {
  title: "עצבו את מראת קבלת הפנים שלכם - הדמיה אונליין",
  description: "כתבו את הברכה, השמות, התאריך והשורה התחתונה, ותראו מיד הדמיה של מראת קבלת הפנים שלכם. בוחרים סגנון כתב וצבע, ושולחים לנו את העיצוב להשכרה לאירוע.",
  alternates: { canonical: "/design-your-mirror" },
};

export default function DesignPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="פירורי לחם"><ol><li><Link href="/">דף הבית</Link></li><li aria-current="page">עיצוב אישי</li></ol></nav>
          <h1>עצבו את המראה שלכם</h1>
          <Flourish />
          <p className="lede">כתבו מה תרצו שיופיע על המראה, ותראו מיד איך זה ייראה. כשהעיצוב מוכן, שלחו לנו אותו ונחזור אליכם עם בדיקת זמינות להשכרה.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <MirrorDesigner />
        </div>
      </section>
      <CtaBand text="אהבתם את העיצוב? בואו נשמור לכם מראה לתאריך." />
    </>
  );
}
