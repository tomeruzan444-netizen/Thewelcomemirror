import InstagramCarousel from "./InstagramCarousel";
import JsonLd from "./JsonLd";
import { IconInstagram } from "./Icons";
import { instagramPosts, instagramPostUrl } from "@/lib/instagram";
import { absoluteUrl, site } from "@/lib/site";

/** סכמת ImageObject לכל פוסט: גוגל מקבל את התמונה, הכיתוב, התאריך והקישור לפוסט המקורי */
export function instagramSchema(pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `פוסטים מהאינסטגרם של ${site.name}`,
    url: absoluteUrl(pagePath),
    itemListElement: instagramPosts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ImageObject",
        contentUrl: absoluteUrl(p.image),
        url: instagramPostUrl(p.id),
        width: p.width,
        height: p.height,
        name: p.model ?? site.name,
        caption: p.caption,
        description: p.alt,
        datePublished: p.date,
        ...(p.location ? { contentLocation: { "@type": "Place", name: p.location } } : {}),
        creditText: p.credit ? `@${p.credit}` : site.name,
        creator: p.credit
          ? { "@type": "Person", name: `@${p.credit}`, url: `https://www.instagram.com/${p.credit}/` }
          : { "@type": "Organization", name: site.name, url: site.url },
        copyrightNotice: site.name,
        isPartOf: { "@type": "WebPage", url: absoluteUrl(pagePath) },
      },
    })),
  };
}

export default function InstagramSection({ path, band = true }: { path: string; band?: boolean }) {
  return (
    <section className={`section${band ? " band-white" : ""}`} aria-labelledby="ig-h">
      <div className="wrap">
        <div className="head center">
          <span className="kicker">@thewelcome.mirror</span>
          <h2 id="ig-h">מהאינסטגרם שלנו</h2>
          <p>הפוסטים האחרונים מהעמוד שלנו: מראת הווינטג׳ החדשה, המראה האובלית בחתונה בגן בשפיים, ומראה עם פרחים שצוירו ביד.</p>
        </div>
        <InstagramCarousel posts={instagramPosts} labelledBy="ig-h" />
        <p className="ig-follow">
          <a href={site.instagramUrl} target="_blank" rel="noopener" className="btn btn-line"><IconInstagram />לעמוד האינסטגרם שלנו</a>
        </p>
      </div>
      <JsonLd data={instagramSchema(path)} />
    </section>
  );
}
