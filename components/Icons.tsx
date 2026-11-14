type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const IconPhone = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const IconWhatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a5 5 0 0 1-2.4-2.4l1-1-1-2z" /></svg>
);
export const IconMail = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 7 8.5-7" /></svg>
);
export const IconForm = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" /><path d="M9 8h6M9 12h6M9 16h3" /></svg>
);
export const IconInstagram = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></svg>
);
export const IconCheck = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.6} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const IconChevron = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.4} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const IconMenu = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const IconClose = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);

export const LogoMark = (p: P) => (
  <svg viewBox="0 0 24 34" aria-hidden="true" {...p}>
    <ellipse cx="12" cy="14" rx="8.5" ry="12.5" fill="#fff" stroke="#c9a97b" strokeWidth="1.3" />
    <ellipse cx="12" cy="14" rx="6" ry="10" fill="#ecc6cb" />
    <path d="M3 33 L6 25 M21 33 L18 25" stroke="#c9a97b" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
