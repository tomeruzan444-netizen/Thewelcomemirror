import { site } from "@/lib/site";

export const metadata = { title: "מדיניות פרטיות", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><h1>מדיניות פרטיות</h1></div></section>
      <section className="section legal"><div className="wrap measure">
        <p>הפרטים שאתם ממלאים בשאלון ההזמנה (שם, טלפון, מיקום ותאריך האירוע ובחירת המראה) נשלחים אלינו ישירות בווטסאפ או במייל, לפי בחירתכם, ומשמשים רק לצורך מענה לפנייה ותיאום האירוע.</p>
        <h2>תמונות מאירועים</h2>
        <p>לא נפרסם תמונות מאירוע באתר או ברשתות ללא אישור בעלי האירוע.</p>
        <h2>יצירת קשר</h2>
        <p>לכל שאלה בנושא פרטיות: {site.email}.</p>
      </div></section>
    </>
  );
}
