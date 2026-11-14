/**
 * פרטי העסק - כל הפרטים הזמניים מרוכזים כאן.
 * כשיהיו שם, טלפון ודומיין סופיים - מעדכנים רק בקובץ הזה.
 */
export const site = {
  name: "The Welcome Mirror",
  nameHe: "דה וולקאם מירור",
  tagline: "Your day. Your names. Your mirror.",
  instagramUrl: "https://www.instagram.com/thewelcome.mirror",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://thewelcomemirror.vercel.app").replace(/\/$/, ""),
  /**
   * false = האתר חסום למנועי חיפוש ולמנועי AI (noindex + robots.txt חוסם).
   * כשהאתר מוכן לעלייה - לשנות ל-true, וזה פותח הכל.
   */
  allowIndexing: false,
  phoneDisplay: "054-452-0410",
  phoneIntl: "+972544520410",
  whatsapp: "972544520410",
  email: "meitar.mayo@gmail.com",
  area: "פריסה ארצית - מהצפון ועד הדרום",
  hours: "א׳-ה׳ 09:00-20:00, ו׳ 09:00-13:00",
  facebook: "",
  locale: "he_IL",
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}
