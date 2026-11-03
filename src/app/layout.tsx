import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingMessage } from "@/components/FloatingMessage";
import { IdentityRedirect } from "@/components/IdentityRedirect";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Free Resources & Community Support in the Bay Area`,
    template: `%s | ${site.name}`,
  },
  description:
    "Find free shelter, meals, medical care, showers, and other resources in San Jose, San Francisco, Hayward, Fremont, and Palo Alto. Plus practical wound-care basics from JMRH 29:11 Outreach.",
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Connecting our community to care, resources, and hope`,
    description:
      "A free, easy-to-use directory of Bay Area shelters, meals, clinics, showers, and support services, plus wound-care basics.",
    locale: "en_US",
  },
  twitter: { card: "summary" },
  icons: { icon: site.logo.src },
};

export const viewport: Viewport = {
  themeColor: "#151515",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingMessage />
        <IdentityRedirect />
      </body>
    </html>
  );
}
