/**
 * תמונות לגלריה. שימו את הקבצים ב-public/gallery/ והוסיפו כאן שורה לכל תמונה.
 * דוגמה: { src: "/gallery/wedding-1.jpg", alt: "אורחים מצטלמים מול מראת הסלפי בחתונה", caption: "חתונה בגן אירועים" },
 */
export type GalleryItem = { src: string; alt: string; caption?: string; width?: number; height?: number };

export const gallery: GalleryItem[] = [
  { src: "/mirrors/oval.jpg", alt: "מראת קבלת פנים אובלית עם השמות Meitar and Tomer והתאריך 09.10.2026 בכניסה לחתונה בגן", caption: "המראה האובלית, חתונה בגן אירועים", width: 1122, height: 1402 },
  { src: "/mirrors/vintage.jpg", alt: "מראת וינטג' עם כיתוב זהב Tal & Itay ו-Welcome to our wedding ליד עציץ זית", caption: "מראת וינטג' עם כיתוב זהב", width: 843, height: 1264 },
  { src: "/mirrors/floral.jpg", alt: "מראה עם ציורי פרחים בעבודת יד בכניסה לאולם, לצד נרות וגבסנית", caption: "מראה בעיצוב אישי, אירוע ערב", width: 1206, height: 1600 },
];
