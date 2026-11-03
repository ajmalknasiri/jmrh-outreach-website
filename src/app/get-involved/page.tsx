import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Get Involved — Volunteer, Donate Supplies, or Partner With Us",
  description:
    "Support JMRH 29:11 Outreach by volunteering, donating wound-care kits and hygiene supplies, partnering with us, or sharing updated resource information.",
  alternates: { canonical: "/get-involved" },
};

function Section({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: IconName;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="card" aria-labelledby={`${id}-title`} style={{ scrollMarginTop: "100px" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
        <div className="icon-badge">
          <Icon name={icon} size={28} />
        </div>
        <h2 id={`${id}-title`} style={{ fontSize: "1.45rem", margin: 0 }}>
          {title}
        </h2>
      </div>
      <div className="stack">{children}</div>
    </section>
  );
}

export default function GetInvolvedPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get involved</span>
          <h1>Help make essential resources easier to reach</h1>
          <p className="lead">There are many ways to support this work — your time, supplies, partnerships, and local knowledge all help.</p>
          <nav aria-label="On this page" className="toc">
            <a className="btn btn--outline btn--sm" href="#volunteer">Volunteer</a>
            <a className="btn btn--outline btn--sm" href="#supplies">Donate Supplies</a>
            <a className="btn btn--outline btn--sm" href="#donate">Financial Support</a>
            <a className="btn btn--outline btn--sm" href="#partner">Partnerships</a>
            <a className="btn btn--outline btn--sm" href="#share">Share a Resource</a>
          </nav>
        </div>
      </section>

      <div className="section">
        <div className="container grid" style={{ gap: "1.5rem" }}>
          <Section id="volunteer" icon="hands" title="Volunteer">
            <p>
              We welcome people interested in outreach, resource distribution, community education, and organizational
              support. Tell us a little about yourself and how you’d like to help, and our team will follow up.
            </p>
            <div>
              <Link href="/contact?topic=volunteer" className="btn btn--primary">
                Volunteer With Us
              </Link>
            </div>
          </Section>

          <Section id="supplies" icon="box" title="Donate Supplies">
            <p>Practical supplies make a real difference. Items that are especially useful include:</p>
            <ul style={{ margin: 0, paddingLeft: "1.3rem" }}>
              <li>Wound-care kits and supplies (see our <Link href="/wound-care#supplies-title">supply checklist</Link>)</li>
              <li>Hygiene supplies</li>
              <li>Other essential items</li>
            </ul>
            <p>Please contact us before dropping anything off so we can coordinate what’s needed and where to bring it.</p>
            <div>
              <Link href="/contact?topic=donate-supplies" className="btn btn--primary">
                Coordinate a Supply Donation
              </Link>
            </div>
          </Section>

          <Section id="donate" icon="heart" title="Financial Contributions">
            {site.donationUrl ? (
              <>
                <p>
                  Financial gifts are handled securely by our donation provider. We never collect card details on this
                  website.
                </p>
                <div>
                  <a href={site.donationUrl} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                    Support Our Mission<span className="sr-only"> (opens donation page in a new tab)</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="notice">
                  <Icon name="info" />
                  <p>
                    <strong>Online giving is coming soon.</strong> In the meantime, please contact us if you’d like to
                    support our work financially.
                  </p>
                </div>
                <div>
                  <Link href="/contact?topic=financial" className="btn btn--dark">
                    Contact Us About Giving
                  </Link>
                </div>
              </>
            )}
          </Section>

          <Section id="partner" icon="handshake" title="Community Partnerships">
            <p>
              We’d like to work with clinics, shelters, nonprofits, faith communities, businesses, and other service
              providers. Partners can collaborate on outreach or send us updated information about their services.
            </p>
            <div>
              <Link href="/contact?topic=partnership" className="btn btn--primary">
                Partner With Us
              </Link>
            </div>
          </Section>

          <Section id="share" icon="search" title="Share or Update a Resource">
            <p>
              Know about a service that should be listed? Notice that a phone number, address, or description is out of
              date? Let us know. Every submission is reviewed by our team before anything appears on the website.
            </p>
            <div>
              <Link href="/contact?topic=resource-update" className="btn btn--primary">
                Suggest or Update a Resource
              </Link>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}
