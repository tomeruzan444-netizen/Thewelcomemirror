import { QuizSection } from "@/components/Sections";

export const metadata = {
  title: "שאלון הזמנה למראת קבלת פנים",
  description: "שאלון הזמנה קצר: שם, טלפון, מיקום ותאריך החתונה, ובחירת דגם המראה וסגנון הכיתוב. נחזור אליכם עם בדיקת זמינות והצעה.",
  alternates: { canonical: "/questionnaire" },
};

export default function QuestionnairePage() {
  return <QuizSection title="שאלון הזמנה" h1 />;
}
