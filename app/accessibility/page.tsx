import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "הצהרת נגישות", description: `הצהרת הנגישות של ${site.name}: התאמות הנגישות באתר, תקן WCAG 2.1 ברמה AA ודרכי פנייה בנושא נגישות.`, path: "/accessibility" });

export default function A11y() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><h1>הצהרת נגישות</h1></div></section>
      <section className="section legal"><div className="wrap measure">
        <p>ב-{site.name} אנחנו רואים חשיבות בהנגשת האתר לכלל הגולשים, כולל אנשים עם מוגבלות. האתר נבנה בהתאם להנחיות WCAG 2.1 ברמה AA, ככל שניתן.</p>
        <h2>מה עשינו באתר</h2>
        <ul>
          <li>ניווט מלא באמצעות מקלדת, כולל קישור לדילוג לתוכן הראשי.</li>
          <li>סימון מיקוד ברור לרכיבים אינטראקטיביים.</li>
          <li>ניגודיות צבעים מספקת וגופנים קריאים.</li>
          <li>מבנה כותרות היררכי ותגיות סמנטיות.</li>
          <li>כיבוד הגדרת המערכת להפחתת תנועה ואנימציות.</li>
          <li>טפסים עם תוויות והודעות שגיאה ברורות.</li>
        </ul>
        <h2>נתקלתם בבעיה?</h2>
        <p>אם מצאתם רכיב שאינו נגיש, נשמח לשמוע ולתקן. פנו אלינו בטלפון {site.phoneDisplay} או במייל {site.email}.</p>
        <p>עדכון אחרון: נובמבר 2026.</p>
      </div></section>
    </>
  );
}
