import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { IconPhone, IconWhatsapp, IconForm } from "./Icons";

export default function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="יצירת קשר מהירה">
      <a href={`tel:${site.phoneIntl}`}><IconPhone />חיוג</a>
      <a href={whatsappLink("היי, אשמח לבדוק זמינות למראת קבלת פנים")} target="_blank" rel="noopener"><IconWhatsapp />ווטסאפ</a>
      <Link href="/questionnaire" className="primary"><IconForm />שאלון</Link>
    </nav>
  );
}
