import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "About Us — Our Mission and Community Outreach",
  description:
    "JMRH 29:11 Outreach is a grassroots initiative helping people experiencing homelessness and housing instability access essential resources, practical health education, and community support in the Bay Area.",
  alternates: { canonical: "/about" },
};

/**
 * EDITING THIS PAGE
 * Text inside <Placeholder> boxes is waiting for official, verified content.
 * Replace each <Placeholder>…</Placeholder> with the final text (a <p>…</p>) when it's approved.
 */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="placeholder">
      <strong>Placeholder — to be provided by JMRH 29:11 Outreach:</strong> {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1>Making help easier to find</h1>
          <p className="lead">
            JMRH 29:11 Outreach is a grassroots nonprofit initiative dedicated to helping individuals experiencing
            homelessness and housing instability access essential resources, practical health education, and community
            support. We believe that finding help should be easier, that people deserve to be treated with dignity, and
            that local communities can make a meaningful difference by connecting people with the resources they need.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="mission">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Our mission</span>
            <h2 id="mission">Our Mission</h2>
          </div>
          <div className="stack">
            <p>
              We work to connect people experiencing homelessness and housing instability with the essential resources,
              health information, and community support they need — with dignity and without unnecessary barriers.
            </p>
            <Placeholder>Official mission statement.</Placeholder>
          </div>
        </div>
      </section>

      <section className="section section--gray" aria-labelledby="what">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2 id="what">What We Do</h2>
          </div>
          <div className="grid grid--3">
            <div className="card quick-card">
              <div className="icon-badge">
                <Icon name="search" size={28} />
              </div>
              <h3>Resource access</h3>
              <p>
                We gather information about free and low-cost shelter, meals, medical care, hygiene services, and other
                support into one place that’s easy to search on any phone.
              </p>
            </div>
            <div className="card quick-card">
              <div className="icon-badge">
                <Icon name="bandage" size={28} />
              </div>
              <h3>Practical health education</h3>
              <p>
                We share simple, clear health information — like wound-care basics — and help people recognize when to
                seek professional care.
              </p>
            </div>
            <div className="card quick-card">
              <div className="icon-badge">
                <Icon name="people" size={28} />
              </div>
              <h3>Community connection</h3>
              <p>
                We bring neighbors, volunteers, and local organizations together to support people facing housing
                instability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Why it matters</span>
            <h2 id="why">Why Resource Accessibility Matters</h2>
          </div>
          <div className="stack">
            <p>
              Help often exists, but it can be hard to find. Information is spread across many websites, phone numbers
              change, and hours shift. When someone is tired, stressed, or using an old phone with little data, every
              extra step makes it harder to get help.
            </p>
            <p>
              That’s why we keep things simple: plain language, large buttons, phone numbers you can tap to call, and no
              accounts or location tracking required.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--gray" aria-labelledby="outreach">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">In the community</span>
            <h2 id="outreach">Our Community Outreach</h2>
          </div>
          <div className="stack">
            <p>
              Our work is grounded in practical service and collaboration with the communities we serve, across San Jose,
              San Francisco, Hayward, Castro Valley, Fremont, Palo Alto, Mountain View, and East Palo Alto.
            </p>
            <Placeholder>Description of current outreach activities and where they take place.</Placeholder>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="vision">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Looking ahead</span>
            <h2 id="vision">Our Vision for the Future</h2>
          </div>
          <div className="stack">
            <p>
              We’re working toward a dedicated mobile resource app that helps people find shelters, food, medical
              services, mental health support, and emergency contacts — including information that can be saved for use
              without an internet connection.
            </p>
            <p>
              We also hope to keep growing the directory with help from community partners, so the information stays
              accurate and useful.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--gray" aria-labelledby="story">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our story</span>
            <h2 id="story">Our Story and Team</h2>
          </div>
          <div className="grid grid--2">
            <Placeholder>Founding story.</Placeholder>
            <Placeholder>Leadership biographies.</Placeholder>
            <Placeholder>Verified organizational details (for example, legal name and registration status).</Placeholder>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split">
          <h2 style={{ margin: 0 }}>Want to be part of this work?</h2>
          <div className="btn-row">
            <Link href="/get-involved" className="btn btn--primary">
              Get Involved
            </Link>
            <Link href="/resources" className="btn btn--ghost-light">
              Find Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
