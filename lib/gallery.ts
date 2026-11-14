/**
 * תמונות לגלריה. שימו את הקבצים ב-public/gallery/ והוסיפו כאן שורה לכל תמונה.
 * דוגמה: { src: "/gallery/wedding-1.jpg", alt: "אורחים מצטלמים מול מראת הסלפי בחתונה", caption: "חתונה בגן אירועים" },
 */
export type GalleryItem = { src: string; alt: string; caption?: string; width?: number; height?: number };

export const gallery: GalleryItem[] = [];
