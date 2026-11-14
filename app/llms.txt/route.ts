import { homeFaqs, services } from "@/lib/services";
import { topics } from "@/lib/topics";
import { stripInline } from "@/lib/inline";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt - תקציר האתר למנועי AI (ChatGPT, Claude, Perplexity, Gemini) */
export function GET() {
  const lines = [
    `# ${site.name} (${site.nameHe})`,
    "",
    "> השכרת מראות קבלת פנים מעוצבות לחתונות ולאירועים בישראל: מראה לבנה בגובה אדם עם כיתוב אישי (שמות, תאריך וברכת Welcome), כולל הבאה, הצבה בכניסה לאירוע ואיסוף בסוף.",
    "",
    `- אזור שירות: ${site.area}`,
    `- שעות פעילות: ${site.hours}`,
    `- טלפון: ${site.phoneDisplay}`,
    `- מייל: ${site.email}`,
    `- אינסטגרם: ${site.instagramUrl}`,
    "",
    "## עמודים עיקריים",
    `- [דף הבית](${absoluteUrl("/")}): מה זו מראה ממותגת לקבלת פנים, הדגמים, איך זה עובד`,
    `- [כל השירותים](${absoluteUrl("/services")}): מראה לכל סוג אירוע`,
    `- [עיצוב אישי](${absoluteUrl("/design-your-mirror")}): הדמיה אונליין של הכיתוב על המראה`,
    `- [שאלון הזמנה](${absoluteUrl("/questionnaire")}): בדיקת זמינות והזמנה`,
    `- [שאלות נפוצות](${absoluteUrl("/faq")})`,
    `- [גלריה](${absoluteUrl("/gallery")})`,
    `- [צור קשר](${absoluteUrl("/contact")})`,
    "",
    "## לפי סוג אירוע",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/${s.slug}`)}): ${s.metaDescription}`),
    "",
    "## מראות להשכרה",
    ...topics.map((t) => `- [${t.title}](${absoluteUrl(`/${t.slug}`)}): ${t.metaDescription}`),
    "",
    "## שאלות נפוצות",
    ...homeFaqs.flatMap((f) => [`### ${f.q}`, stripInline(f.a), ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
