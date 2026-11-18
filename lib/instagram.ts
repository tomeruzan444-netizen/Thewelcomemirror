/**
 * פוסטים מהאינסטגרם, שמוצגים בקרוסלה בעמוד הבית ובגלריה.
 * התמונות שמורות באתר (public/instagram) כדי שגוגל יאנדקס אותן כחלק מהאתר.
 * caption: הטקסט מהפוסט עצמו. alt: תיאור של מה שרואים בתמונה.
 * להוספת פוסט: שומרים את התמונה ב-public/instagram ומוסיפים שורה כאן.
 */
export type InstagramPost = {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  model?: string;
  date: string; // YYYY-MM-DD
  location?: string;
  credit?: string;
};

export const instagramPosts: InstagramPost[] = [
  {
    id: "De2Iq41NJeT",
    image: "/instagram/oval-welcome-mirror-garden-wedding.jpg",
    width: 1136,
    height: 1408,
    alt: "מראת קבלת פנים אובלית עם מסגרת עץ לבנה ועמודים מגולפים, עם הכיתוב Meitar and Tomer, התאריך 09.10.2026 ו-Welcome to our wedding, בכניסה לחתונה בגן",
    caption: "Meet The Welcome Mirror. הפרט הראשון שהאורחים שלכם יפגשו ביום שלכם. מראות Welcome בעיצוב אישי לקבלת הפנים, עם השמות, התאריך והטאץ׳ שלכם.",
    model: "המראה האובלית",
    date: "2026-10-23",
    location: "הגן בשפיים",
  },
  {
    id: "Dfuc3iQtuPi",
    image: "/instagram/vintage-welcome-mirror-bride.jpg",
    width: 1296,
    height: 1728,
    alt: "כלה בשמלה לבנה משתקפת במראת וינטג' עם מסגרת מגולפת, עם כיתוב זהב Tal & Itay, התאריך 02.11.2026 ו-Welcome to our wedding, מול שולחנות החתונה",
    caption: "תכירו את המראה השלישית שלנו! מראה וינטג׳ נסיכותית שמגיעה כמובן בעיצוב אישי.",
    model: "מראת הווינטג'",
    date: "2026-11-14",
  },
  {
    id: "DfudW8BORD4",
    image: "/instagram/vintage-welcome-mirror-gold-lettering.jpg",
    width: 1296,
    height: 1536,
    alt: "תקריב של מראת וינטג' עם מסגרת שמנת מגולפת וכיתוב זהב Tal & Itay, 02.11.2026 ו-Welcome to our wedding, ליד ענפי זית",
    caption: "שלמות! מראת הוינטג׳ שלנו זמינה להזמנות לעונת החתונות הקרובה.",
    model: "מראת הווינטג'",
    date: "2026-11-14",
  },
  {
    id: "DfuW0qstAX2",
    image: "/instagram/hand-painted-floral-mirror.jpg",
    width: 1296,
    height: 1712,
    alt: "מראה בצורה אורגנית עם פרחים ורודים, כתומים ותכלת מצוירים ביד, נשענת על קיר לצד נרות וגבסנית בכניסה לאירוע ערב",
    caption: "לא רק מראה, אלא פינת קסם באירוע שלכם. ניתן להזמין גם עם כיתוב של השמות שלכם!",
    model: "מראה בעיצוב אישי",
    date: "2026-11-14",
  },
  {
    id: "De3yXbftQtz",
    image: "/instagram/bride-reflection-welcome-mirror.jpg",
    width: 1600,
    height: 1072,
    alt: "כלה מחייכת אל ההשתקפות שלה במראת קבלת פנים לבנה עם השמות של בני הזוג, בגן ירוק",
    caption: "מזכרת מושלמת מהיום שלך!",
    date: "2026-10-24",
    location: "הגן בשפיים",
  },
];

export const instagramPostUrl = (id: string) => `https://www.instagram.com/p/${id}/`;
