import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { site } from "@/config/site";
import { isTopic, type TopicId } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Send a message to JMRH 29:11 Outreach about volunteering, donations, partnerships, or resource updates.",
  alternates: { canonical: "/contact" },
};

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const t = Array.isArray(sp.topic) ? sp.topic[0] : sp.topic;
  const topic: TopicId = isTopic(t) ? t : "general";

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact us</span>
          <h1>Send us a message</h1>
          <p className="lead">
            Questions, ideas, volunteering, donations, partnerships, or resource updates — we’d like to hear from you.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container detail">
          <div className="card">
            <ContactForm key={topic} defaultTopic={topic} source={`contact-page:${topic}`} />
          </div>

          <aside className="stack" aria-label="Other ways to reach us">
            <div className="card">
              <h2 style={{ fontSize: "1.25rem" }}>Email us directly</h2>
              <p style={{ margin: 0 }}>
                <a href={`mailto:${site.email}`} style={{ fontWeight: 700, wordBreak: "break-all" }}>
                  {site.email}
                </a>
              </p>
            </div>
            <div className="notice notice--red">
              <Icon name="alert" />
              <p>
                <strong>Need help right now?</strong> This form isn’t monitored around the clock. For local services,
                call <a href="tel:211">211</a> or browse <Link href="/resources">Find Resources</Link>. In an
                emergency, call <a href="tel:911">911</a>.
              </p>
            </div>
            <div className="notice">
              <Icon name="info" />
              <p>
                We only use what you send to reply to you. Please don’t include medical details or other private
                information. See our <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
