import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Web app manifest: אייקון ושם האתר כשמוסיפים אותו למסך הבית באנדרואיד */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Welcome Mirror",
    description: "מראות קבלת פנים מעוצבות לחתונות ולאירועים, עם כיתוב אישי, להשכרה.",
    lang: "he",
    dir: "rtl",
    start_url: "/",
    display: "browser",
    background_color: "#faf5ee",
    theme_color: "#a65e6c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
