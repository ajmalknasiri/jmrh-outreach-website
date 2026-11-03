import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { site } from "@/config/site";

const quick: { title: string; text: string; href: string; icon: IconName; cta: string }[] = [
  {
    title: "Emergency Shelter",
    text: "Shelters and hotlines that can help you find a place to stay.",
    href: "/resources?category=emergency-shelter",
    icon: "shelter",
    cta: "Find shelter",
  },
  {
    title: "Free Food",
    text: "Free meals, groceries, and food programs across the Bay Area.",
    href: "/resources?category=food",
    icon: "food",
    cta: "Find food",
  },
  {
    title: "Medical Care",
    text: "Low- and no-cost clinics for people experiencing homelessness.",
    href: "/resources?category=medical",
    icon: "medical",
    cta: "Find medical care",
  },
  {
    title: "Mental Health and Wellness",
    text: "Wellness centers, peer support, and behavioral health services.",
    href: "/resources?category=mental-health",
    icon: "heart",
    cta: "Find support",
  },
  {
    title: "Showers and Laundry",
    text: "Places to shower and wash clothes, including mobile services.",
    href: "/resources?category=showers-laundry",
    icon: "shower",
    cta: "Find showers & laundry",
  },
  {
    title: "Other Community Resources",
    text: "Housing help, basic necessities, mail services, and referrals.",
    href: "/resources?category=general",
    icon: "help",
    cta: "Find other help",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div>
            <span className="eyebrow">{site.name}</span>
            <h1 id="hero-title">
              Connecting Our Community to <span>Care, Resources, and Hope.</span>
            </h1>
            <p>
              JMRH 29:11 Outreach works to help individuals experiencing homelessness and housing instability connect
              with essential resources, practical health information, and community support.
            </p>
            <div className="btn-row" style={{ marginTop: "1.75rem" }}>
              <Link href="/resources" className="btn btn--primary">
                <Icon name="search" size={20} /> Find Free Resources
              </Link>
              <Link href="/about" className="btn btn--ghost-light">
                Learn About Our Mission
              </Link>
            </div>
          </div>
          {/* PHOTO PLACEHOLDER: replace with an organization-approved outreach photo (with consent from anyone pictured). */}
          <div className="hero__media" role="img" aria-label="Photo placeholder">
            <div>
              <strong>Photo coming soon</strong>
              Space reserved for an organization-approved community outreach photo.
            </div>
          </div>
        </div>
        <div className="hero-help-strip">
          <div className="container">
            <span>Need help now?</span>
            <a href="tel:211">Call 211 for local services</a>
            <a href="tel:911">Call 911 in an emergency</a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="quick-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Find help quickly</span>
            <h2 id="quick-title">What do you need today?</h2>
            <p className="lead">Choose a type of help to see free and low-cost services in San Jose, San Francisco, Hayward, Fremont, Palo Alto, and nearby.</p>
          </div>
          <div className="grid grid--3">
            {quick.map((c) => (
              <div key={c.title} className="card quick-card">
                <div className="icon-badge">
                  <Icon name={c.icon} size={28} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <Link href={c.href} className="btn btn--outline btn--sm">
                  {c.cta} <Icon name="arrow" size={18} />
                </Link>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/resources" className="btn btn--primary">
              See all resources
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="wound-title">
        <div className="container split">
          <div>
            <span className="eyebrow">Health education</span>
            <h2 id="wound-title">Practical Wound Care: Know the Basics.</h2>
            <p className="lead">
              Learn how to clean and cover minor wounds, recognize warning signs, and identify when professional medical
              attention is needed.
            </p>
            <Link href="/wound-care" className="btn btn--primary" style={{ marginTop: "0.75rem" }}>
              View Wound-Care Guide
            </Link>
          </div>
          <div className="feature-panel" aria-hidden="true">
            <ol>
              <li>Clean your hands</li>
              <li>Rinse the wound</li>
              <li>Use gloves when available</li>
              <li>Cover the wound</li>
              <li>Change the bandage</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-title">
        <div className="container split">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 id="about-title">A grassroots effort to make help easier to find</h2>
          </div>
          <div>
            <p className="lead">
              JMRH 29:11 Outreach is a grassroots community organization working to make essential resources easier to
              find and access — and to make sure people are treated with dignity along the way.
            </p>
            <Link href="/about" className="btn btn--outline">
              About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--gray" aria-labelledby="involved-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Get involved</span>
            <h2 id="involved-title">Help us reach more neighbors</h2>
            <p className="lead">
              Volunteer your time, donate supplies, support outreach, or partner with us to keep resource information
              accurate and accessible.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/get-involved#volunteer" className="btn btn--primary">
              Volunteer With Us
            </Link>
            <Link href="/get-involved#donate" className="btn btn--dark">
              Support Our Mission
            </Link>
            <Link href="/get-involved#partner" className="btn btn--outline">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-title">
        <div className="container split">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 id="contact-title">Questions? We’d like to hear from you.</h2>
            <p className="lead">
              Send us a message through the website or email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/contact" className="btn btn--dark">
              <Icon name="mail" size={20} /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
