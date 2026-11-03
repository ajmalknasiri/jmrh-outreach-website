import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using the ${site.name} website and resource directory.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Terms of Use</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="placeholder" style={{ marginBottom: "2rem" }}>
            <strong>Draft — review before publishing.</strong> Have these terms reviewed by the organization (and ideally a
            qualified advisor) and add an effective date before launch.
          </div>

          <h2>About the resource directory</h2>
          <p>
            The directory is provided as a free community service. We work to keep it accurate, but services, hours,
            eligibility, and contact details change often. Listings are not guaranteed to be current or complete, and a
            listing does not mean that {site.name} operates, endorses, or partners with that organization.
          </p>
          <p>
            <strong>Always contact a provider to confirm details before you go.</strong> If you find something out of
            date, please <Link href="/contact?topic=resource-update">let us know</Link>.
          </p>

          <h2>Health information</h2>
          <p>
            Health content on this website, including the <Link href="/wound-care">wound-care guide</Link>, is general
            educational information. It is not medical advice and is not a substitute for professional medical
            evaluation or treatment. In an emergency, call 911.
          </p>

          <h2>Using this website</h2>
          <ul>
            <li>Please don’t misuse the contact form (for example, spam or abusive messages).</li>
            <li>Links to other websites are provided for convenience. We are not responsible for their content.</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
