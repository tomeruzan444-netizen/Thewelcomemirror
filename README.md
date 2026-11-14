# The Welcome Mirror - מראות קבלת פנים להשכרה

Next.js 16 (App Router). כל העמודים נבנים מראש כ-HTML מלא בשרת (SSG) ונטענים ב-React בדפדפן.

## הרצה מקומית
```
npm install
npm run dev     # http://localhost:3000
npm run build   # בנייה לפרודקשן
```

## איפה מעדכנים מה
- `lib/site.ts` - שם העסק, טלפון, ווטסאפ, מייל, שעות, דומיין.
- `lib/services.ts` - 10 עמודי סוגי האירועים (תוכן, FAQ, מטא).
- `lib/topics.ts` - עמודי ביטויי המוצר (מראה עם שמות, מראת כניסה לחתונה וכו').
- `components/MirrorDesigner.tsx` - כלי העיצוב האישי עם ההדמיה.
- `lib/designs.ts` - סגנונות העיצוב בשאלון. תמונה אמיתית: לשים ב-`public/designs/` ולמלא `image`.
- `lib/gallery.ts` - תמונות הגלריה. קבצים ב-`public/gallery/`.
- `components/Questionnaire.tsx` - השאלון (נשלח לווטסאפ).

## דומיין
אחרי חיבור הדומיין ב-Vercel, להגדיר משתנה סביבה `NEXT_PUBLIC_SITE_URL=https://your-domain.co.il`
(או לעדכן ב-`lib/site.ts`) - זה מעדכן canonical, sitemap ו-schema.
