import type { Metadata, Viewport } from "next";
import { Assistant, Bellefair, Frank_Ruhl_Libre, Great_Vibes } from "next/font/google";
import "./globals.css";
import { site, absoluteUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/services";

const display = Bellefair({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const title = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: "300",
  variable: "--font-title",
  display: "swap",
});

const body = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `מראת קבלת פנים לחתונה ולאירועים עם השמות שלכם | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "מראת קבלת פנים לחתונה ולאירועים: מראה לבנה מעוצבת עם השמות שלכם, התאריך וברכת Welcome. להשכרה, כולל הבאה, הצבה, איסוף ועיצוב כיתוב אישי.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large" } as Metadata["robots"],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#faf5ee",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      alternateName: site.nameHe,
      description: "מראות קבלת פנים מעוצבות לחתונות ולאירועים, עם כיתוב אישי, להשכרה.",
      url: site.url,
      sameAs: [site.instagramUrl],
      telephone: site.phoneIntl,
      email: site.email,
      image: absoluteUrl("/opengraph-image"),
      areaServed: { "@type": "Country", name: "Israel" },
      address: { "@type": "PostalAddress", addressCountry: "IL" },
      priceRange: "₪₪",
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "13:00" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "מראות קבלת פנים מעוצבות לאירועים",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/${s.slug}`) },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "he-IL",
      publisher: { "@id": `${site.url}/#business` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${display.variable} ${title.variable} ${body.variable} ${script.variable}`}>
      <body>
        <a className="skip" href="#main">דילוג לתוכן הראשי</a>
        <Header events={services.map(({ slug, title, accent }) => ({ slug, title, accent }))} />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <JsonLd data={orgSchema} />
      </body>
    </html>
  );
}
