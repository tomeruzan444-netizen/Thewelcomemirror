import { pageMeta } from "@/lib/seo";
import { QuizSection } from "@/components/Sections";

export const metadata = pageMeta({
  title: "שאלון הזמנה למראת קבלת פנים",
  description: "שאלון הזמנה קצר: שם, טלפון, מיקום ותאריך החתונה, ובחירת דגם המראה וסגנון הכיתוב. נחזור אליכם עם בדיקת זמינות והצעה.",
  path: "/questionnaire",
});

export default function QuestionnairePage() {
  return <QuizSection title="שאלון הזמנה" h1 />;
}
