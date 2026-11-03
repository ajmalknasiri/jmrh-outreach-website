import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles information on this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="placeholder" style={{ marginBottom: "2rem" }}>
            <strong>Draft — review before publishing.</strong> This draft describes how the website is built. Have it
            reviewed by the organization (and ideally a qualified advisor) and add an effective date before launch.
          </div>

          <p>
            {site.name} respects your privacy. This website is designed so you can find resources without creating an
            account, sharing your location, or giving us personal information.
          </p>

          <h2>Searching for resources</h2>
          <ul>
            <li>You don’t need an account to use the resource directory.</li>
            <li>We do not ask for, track, or store your location.</li>
            <li>Searches and filters are processed only to show you results. We do not tie them to your identity.</li>
          </ul>

          <h2>Information you choose to send us</h2>
          <p>
            If you use our contact form or message button, we receive what you type: an optional name, how you’d like us
            to reply (email or phone, if you choose), the topic, and your message. We use this only to read and respond
            to your message and to review resource suggestions.
          </p>
          <ul>
            <li>Messages are delivered to our team’s email inbox. They are never shown publicly on this website.</li>
            <li>Please do not send medical details or other sensitive personal information through the form.</li>
            <li>We do not sell or rent personal information.</li>
          </ul>

          <h2>Service providers</h2>
          <p>
            We use a small number of service providers to run this website — for example, website hosting and an email
            delivery service that passes form messages to our inbox. They process information only to provide those
            services.
          </p>
          <div className="placeholder">
            <strong>To complete:</strong> list the hosting provider and email delivery provider actually used, and any
            analytics tool (if one is added).
          </div>

          <h2>Links to other websites</h2>
          <p>
            The directory links to other organizations’ websites and to map services for directions. Those sites have
            their own privacy practices.
          </p>

          <h2>Corrections and questions</h2>
          <p>
            To ask a question about privacy, or to request that we delete a message you sent, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
