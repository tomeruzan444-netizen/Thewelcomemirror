import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * קישורים פנימיים בתוך טקסט התוכן, בכתיב [טקסט העוגן](/כתובת-העמוד).
 * renderInline מציג אותם כקישורים אמיתיים, stripInline מחזיר טקסט נקי
 * (לנתונים המובנים של גוגל, ל-llms.txt ולכל מקום שצריך טקסט בלבד).
 */
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function renderInline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    out.push(<Link key={i} href={m[2]}>{m[1]}</Link>);
    last = i + m[0].length;
  }
  if (last === 0) return text;
  if (last < text.length) out.push(text.slice(last));
  return out.map((n, k) => <Fragment key={k}>{n}</Fragment>);
}

export function stripInline(text: string): string {
  return text.replace(LINK, "$1");
}
