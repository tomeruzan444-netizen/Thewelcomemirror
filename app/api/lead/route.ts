import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { letterings, models } from "@/lib/designs";

/**
 * קבלת לידים מהשאלון ושליחתם במייל דרך Resend.
 * משתני סביבה (ב-Vercel, לא בקוד):
 *   RESEND_API_KEY  - חובה. מפתח API של Resend.
 *   LEAD_TO_EMAIL   - לא חובה. ברירת מחדל: site.email
 *   LEAD_FROM_EMAIL - לא חובה. ברירת מחדל: onboarding@resend.dev
 *                     (אחרי אימות הדומיין ב-Resend: leads@thewelcomemirror.co.il)
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  name: string; phone: string; location: string; date: string;
  design: string; lettering: string; notes: string; eventType: string;
  company: string; // מלכודת לבוטים - שדה נסתר שבני אדם לא ממלאים
  t: number; // זמן פתיחת השאלון (ms)
};

const LIMITS: Record<string, number> = { name: 80, phone: 20, location: 150, date: 10, design: 20, lettering: 20, notes: 600, eventType: 60, company: 200 };

// הגבלת קצב בסיסית לכל IP (בזיכרון של המופע)
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const cleanPhone = (v: string) => v.replace(/[\s\-()]/g, "").replace(/^\+972/, "0");
const fmtDate = (iso: string) => { const [y, m, d] = iso.split("-"); return `${d}.${m}.${y}`; };

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // חלק מהדפדפנים לא שולחים origin בבקשות same-origin
  try {
    const o = new URL(origin).host;
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return o === host || o.endsWith(".vercel.app") || o.endsWith("thewelcomemirror.co.il") || o.startsWith("localhost");
  } catch { return false; }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: Partial<Lead>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }

  const d = {} as Record<keyof Lead, string>;
  for (const k of Object.keys(LIMITS) as (keyof Lead)[]) {
    const v = body[k];
    d[k] = typeof v === "string" ? v.trim().slice(0, LIMITS[k]) : "";
  }

  // בוט: מילא את השדה הנסתר או שלח תוך פחות מ-3 שניות. מחזירים הצלחה בלי לשלוח.
  const elapsed = Date.now() - Number(body.t ?? 0);
  if (d.company || !(elapsed > 3000)) return NextResponse.json({ ok: true });

  const errors: string[] = [];
  if (d.name.split(/\s+/).filter(Boolean).length < 2) errors.push("name");
  if (!/^0(5\d|7\d|[2-489])\d{7}$/.test(cleanPhone(d.phone))) errors.push("phone");
  if (d.location.length < 2) errors.push("location");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) errors.push("date");
  const design = models.find((m) => m.id === d.design);
  if (!design) errors.push("design");
  if (errors.length) return NextResponse.json({ ok: false, error: "invalid", fields: errors }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const lettering = letterings.find((l) => l.id === d.lettering)?.name ?? "";
  const phone = cleanPhone(d.phone);
  const waPhone = "972" + phone.slice(1);
  const rows: [string, string][] = [
    ["סוג האירוע", d.eventType || "לא צוין"],
    ["שם", d.name],
    ["טלפון", d.phone],
    ["מיקום האירוע", d.location],
    ["תאריך האירוע", fmtDate(d.date)],
    ["מראה", design!.name],
    ...(lettering ? [["סגנון כיתוב", lettering] as [string, string]] : []),
    ...(d.notes ? [["כיתוב מבוקש", d.notes] as [string, string]] : []),
  ];

  const html = `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:16px;color:#3b2a2e;max-width:560px">
  <h2 style="color:#a65e6c;margin:0 0 12px">ליד חדש מהאתר - ${esc(site.name)}</h2>
  <table cellpadding="8" style="border-collapse:collapse;width:100%">
    ${rows.map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee;color:#7a6a6d;white-space:nowrap">${esc(k)}</td><td style="border-bottom:1px solid #eee"><b>${esc(v).replace(/\n/g, "<br>")}</b></td></tr>`).join("")}
  </table>
  <p style="margin-top:18px">
    <a href="tel:${esc(phone)}" style="background:#a65e6c;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">חיוג ללקוח</a>
    &nbsp;
    <a href="https://wa.me/${esc(waPhone)}" style="background:#25d366;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">ווטסאפ ללקוח</a>
  </p>
</div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`,
      to: [process.env.LEAD_TO_EMAIL || site.email],
      subject: `ליד חדש: ${d.name} - ${d.eventType || "אירוע"} ${fmtDate(d.date)}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  const out = (await res.json().catch(() => ({}))) as { id?: string };
  return NextResponse.json({ ok: true, id: out.id });
}
