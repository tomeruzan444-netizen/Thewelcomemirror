import type { Metadata } from "next";
import { site } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** כותרת מלאה בלי הסיומת "| The Welcome Mirror" */
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

/**
 * מטא-דאטה אחידה לכל עמוד: canonical, Open Graph ו-Twitter,
 * כך שכל עמוד מופיע בגוגל, ברשתות ובמנועי AI עם כותרת, תיאור וכתובת משלו.
 */
export function pageMeta({ title, description, path, absoluteTitle, type = "website" }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/opengraph-image"] },
  };
}
