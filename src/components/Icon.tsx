/**
 * Lightweight inline SVG icons (no icon library, no extra downloads).
 * Icons are decorative by default (aria-hidden); always pair them with text.
 */
const paths: Record<string, React.ReactNode> = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  directions: (
    <>
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
    </>
  ),
  shelter: (
    <>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  food: (
    <>
      <path d="M7 2v8a2 2 0 0 0 2 2v10" />
      <path d="M11 2v8a2 2 0 0 1-2 2" />
      <path d="M17 22V2c-2 1-3 3.5-3 7v4h3" />
    </>
  ),
  medical: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  heart: (
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
  ),
  shower: (
    <>
      <path d="M4 4l2.5 2.5M13.5 6.5 6.5 13.5" />
      <path d="M6.5 6.5a5 5 0 0 1 7 0" />
      <path d="M14 14v.01M18 14v.01M16 17v.01M20 17v.01M18 20v.01M14 20v.01M10 17v.01M12 22v.01" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M10.7 12.3 21 2M17 6l3 3M14 9l2 2" />
    </>
  ),
  bag: (
    <>
      <path d="M6 7h12l1 14H5L6 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" />
      <path d="M16 3.1a4 4 0 0 1 0 7.8M22 21v-1a6 6 0 0 0-4-5.6" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
    </>
  ),
  hands: (
    <>
      <path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10" />
      <path d="M10 9.5V4a1.5 1.5 0 0 1 3 0v6" />
      <path d="M13 9.5V5a1.5 1.5 0 0 1 3 0v6" />
      <path d="M16 10a1.5 1.5 0 0 1 3 0v4a8 8 0 0 1-8 8h-.5a7 7 0 0 1-5.6-2.8L2.7 16a1.5 1.5 0 0 1 2.3-2l2 2V11" />
    </>
  ),
  droplet: <path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.4 0z" />,
  glove: (
    <>
      <path d="M8 22v-4l-3-4V7a1.5 1.5 0 0 1 3 0v4" />
      <path d="M8 11V4a1.5 1.5 0 0 1 3 0v7M11 10V3a1.5 1.5 0 0 1 3 0v8M14 10V5a1.5 1.5 0 0 1 3 0v9l-2 4v4" />
    </>
  ),
  bandage: (
    <>
      <rect x="2" y="8" width="20" height="8" rx="4" transform="rotate(-45 12 12)" />
      <path d="M10 12h.01M12 10h.01M14 12h.01M12 14h.01" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
      <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
      <path d="M21 3v5h-5M3 21v-5h5" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  printer: (
    <>
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  back: <path d="M19 12H5M11 18l-6-6 6-6" />,
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7 .9l.7.7L22 5" />
      <path d="m2 5 4.3 4.3M6 9l-3 3 5 5 1.5 1.5a1 1 0 1 0 3-3" />
    </>
  ),
  box: (
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  rotate: (
    <>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5M12 15V3" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export const categoryIcon: Record<string, IconName> = {
  "emergency-shelter": "shelter",
  food: "food",
  medical: "medical",
  "mental-health": "heart",
  "showers-laundry": "shower",
  housing: "key",
  hygiene: "bag",
  "social-services": "people",
  general: "help",
};
