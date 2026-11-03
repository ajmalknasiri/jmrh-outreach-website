import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { PrintButton } from "@/components/PrintButton";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Wound Care Basics — Cleaning, Covering & When to Get Help",
  description:
    "Simple, step-by-step wound-care basics: clean your hands, rinse the wound, use gloves, cover it, and change the bandage. Learn the warning signs that need medical care, plus a printable supply checklist.",
  alternates: { canonical: "/wound-care" },
};

const steps: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Clean Your Hands",
    icon: "hands",
    text: "Wash your hands with soap and warm water, scrubbing for at least 30 seconds. If soap and water are unavailable, use hand sanitizer.",
  },
  {
    title: "Rinse the Wound",
    icon: "droplet",
    text: "Use clean running water or sterile saline to gently rinse away dirt. Clean the surrounding skin with mild soap. Do not scrub the wound or dig out embedded debris.",
  },
  {
    title: "Use Gloves When Available",
    icon: "glove",
    text: "Nitrile gloves are preferred when providing wound care to another person. If gloves are unavailable, thorough handwashing or hand sanitizer can reduce contamination risk. Avoid direct contact with blood and other body fluids, and use appropriate protective equipment whenever possible.",
  },
  {
    title: "Cover the Wound",
    icon: "bandage",
    text: "Gently pat the surrounding skin dry. Cover the wound with a sterile, non-stick dressing or clean bandage. Secure it with medical tape if needed.",
  },
  {
    title: "Change the Bandage",
    icon: "refresh",
    text: "Replace the bandage daily, or sooner if it becomes wet, dirty, or loose. Clean the wound gently each time and use a fresh dressing.",
  },
];

const warningSigns = [
  "Redness, swelling, warmth, pain, or pus increases.",
  "A fever develops or red streaks spread from the wound.",
  "The wound is deep, gaping, caused by a bite or puncture, or contains embedded material.",
  "Bleeding does not stop after 10 minutes of firm, continuous pressure.",
];

const essentials = [
  "2–4 pairs of disposable nitrile gloves",
  "4–6 sterile gauze pads",
  "4–6 sterile non-stick wound dressings",
  "10–15 adhesive bandages in assorted sizes",
  "1 small roll of medical tape",
  "4–6 individually packaged sterile saline wound-wash pods, or another appropriately sized sterile saline container",
  "4–6 single-use hand-cleaning wipes",
  "2 small bars or single-use packets of mild soap",
  "2–4 small sealable disposal bags",
  "Printed wound-care instructions",
];

const additions = [
  "Sterile gauze rolls for securing dressings",
  "Larger non-stick dressings for bigger superficial scrapes",
  "A small, cleanable, waterproof pouch",
  "A card listing nearby free clinics, walk-in services, and wound-care resources",
  "A QR code linking to the JMRH 29:11 Outreach resource app, once a public app link is available",
];

function Checklist({ items, idPrefix }: { items: string[]; idPrefix: string }) {
  return (
    <ul className="checklist">
      {items.map((item, i) => (
        <li key={item}>
          <label htmlFor={`${idPrefix}-${i}`}>
            <input type="checkbox" id={`${idPrefix}-${i}`} />
            <span>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function WoundCarePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow no-print">Health education</span>
          <p className="print-only" style={{ fontWeight: 700 }}>
            {site.name} · {site.email}
          </p>
          <h1 style={{ maxWidth: "24ch" }}>Wound Care Basics: Cleaning, Covering, and Knowing When to Get Help.</h1>
          <p className="lead">Simple steps for caring for minor cuts and scrapes, and the signs that mean it’s time to see a medical professional.</p>
          <div className="btn-row no-print" style={{ marginTop: "1.25rem" }}>
            <PrintButton />
            {site.woundCarePdf && (
              <a className="btn btn--outline" href={site.woundCarePdf} download>
                <Icon name="download" size={20} /> Download PDF
              </a>
            )}
            <a className="btn btn--outline" href="#get-help">
              When to get help
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }} aria-labelledby="emergency-title">
        <div className="container">
          <div className="emergency" role="note">
            <p id="emergency-title">
              <Icon name="alert" size={22} /> For life-threatening injuries or emergencies, call 911.
            </p>
            <a href="tel:911" className="btn btn--primary btn--sm no-print">
              <Icon name="phone" size={18} /> Call 911
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="steps-title">
        <div className="container">
          <h2 id="steps-title">Five steps for minor wounds</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <article className="step-card">
                  <div className="step-card__head">
                    <div className="icon-badge">
                      <Icon name={s.icon} size={28} />
                    </div>
                    <div>
                      <span className="step-num">Step {i + 1}</span>
                      <h3>{s.title}</h3>
                    </div>
                  </div>
                  <p>{s.text}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="get-help" aria-labelledby="help-title">
        <div className="container">
          <div className="warning-box">
            <div className="warning-box__head">
              <Icon name="alert" size={28} />
              <h2 id="help-title">When to Get Medical Help</h2>
            </div>
            <div className="warning-box__body">
              <p style={{ fontWeight: 700 }}>Get a medical evaluation if:</p>
              <ul>
                {warningSigns.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <p>
                <strong>Seek emergency care</strong> for severe bleeding, loss of feeling or movement, or a serious
                injury. Deep wounds and wounds that may need stitches should be evaluated promptly.
              </p>
              <p style={{ marginBottom: 0 }}>
                Ask a healthcare professional about tetanus vaccination if you’re unsure whether your vaccinations are up
                to date.
              </p>
              <p className="no-print" style={{ marginTop: "1rem", marginBottom: 0 }}>
                <Link href="/resources?category=medical" className="btn btn--outline btn--sm">
                  Find free and low-cost medical care
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gray" aria-labelledby="supplies-title">
        <div className="container">
          <h2 id="supplies-title">Wound-Care Supply Checklist</h2>
          <p className="lead no-print">Use this list to build a basic wound-care kit. Check items off as you pack them.</p>
          <div className="grid grid--2" style={{ marginTop: "1.5rem" }}>
            <div className="card">
              <h3>Essential supplies</h3>
              <Checklist items={essentials} idPrefix="ess" />
            </div>
            <div className="card">
              <h3>Useful additions, depending on budget</h3>
              <Checklist items={additions} idPrefix="add" />
            </div>
          </div>
          <div className="btn-row no-print" style={{ marginTop: "1.5rem" }}>
            <PrintButton label="Print guide and checklist" />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div className="container">
          <div className="notice">
            <Icon name="info" />
            <p>
              <strong>Disclaimer:</strong> This guide provides general educational information and is not a substitute
              for professional medical evaluation or treatment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
