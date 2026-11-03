/**
 * SITE SETTINGS — edit this file to update organization-wide details.
 * Everything here is used across the header, footer, and contact areas.
 */
export const site = {
  name: "JMRH 29:11 Outreach",
  shortName: "JMRH 29:11",
  email: "JMRH2911Outreach@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  /**
   * LOGO: put the official logo file in /public (e.g. /public/logo.png)
   * and change `src` below. Set `isPlaceholder` to false once the real logo is in.
   */
  logo: {
    src: "/logo-placeholder.svg",
    alt: "JMRH 29:11 Outreach logo",
    width: 48,
    height: 48,
    isPlaceholder: true,
  },

  tagline: "Connecting Our Community to Care, Resources, and Hope.",
  footerMission:
    "A grassroots initiative helping people experiencing homelessness and housing instability find essential resources, practical health education, and community support.",

  /** Social links stay hidden until real accounts exist. Example: { label: "Instagram", href: "https://..." } */
  social: [] as { label: string; href: string }[],

  /**
   * Donations: when a trusted provider (Stripe, PayPal, Givebutter, etc.) is set up,
   * paste its hosted donation page URL here. While empty, the site shows an honest
   * "coming soon" message instead of a donate button.
   */
  donationUrl: "",

  /** Reviewed wound-care PDF. Leave empty to hide the Download PDF button. */
  woundCarePdf: "",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Find Resources" },
  { href: "/wound-care", label: "Wound Care" },
  { href: "/about", label: "About Us" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact Us" },
];
