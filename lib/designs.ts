/**
 * דגמי המראות שמוצגים באתר ובשאלון.
 * כשיהיו תמונות אמיתיות: שימו את הקובץ ב-public/mirrors/ ומלאו את השדה image,
 * למשל image: "/mirrors/oval.jpg". כל עוד אין תמונה, יוצג איור של הדגם.
 */
export type MirrorModel = {
  id: string;
  name: string;
  text: string;
  shape: "oval" | "vintage" | "floral" | "none";
  image?: string;
};

export const models: MirrorModel[] = [
  { id: "oval", name: "המראה האובלית", text: "מראה עומדת עם מסגרת עץ לבנה ועמודים מגולפים. קלאסית ורומנטית.", shape: "oval" },
  { id: "vintage", name: "מראת וינטג'", text: "מראה מלבנית עם עיטורי וינטג' במסגרת. אלגנטית, עם נגיעה של פעם.", shape: "vintage" },
  { id: "floral", name: "מראה בעיצוב אישי", text: "מראה עם ציורי פרחים בעבודת יד, בעיצוב שמותאם לאירוע שלכם.", shape: "floral" },
  { id: "advice", name: "נשמח להמלצה", text: "לא בטוחים? נעזור לבחור את המראה שמתאימה למקום ולאווירה.", shape: "none" },
];

export const letterings = [
  { id: "classic", name: "קלאסי", sample: "Noa & Itay" },
  { id: "script", name: "כתב יד רומנטי", sample: "Noa & Itay" },
  { id: "modern", name: "מודרני ונקי", sample: "NOA & ITAY" },
  { id: "hebrew", name: "עברית", sample: "נועה ואיתי" },
];
