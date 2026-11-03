import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  directionsHref,
  formatPhone,
  fullAddress,
  getActiveResources,
  getResource,
  regionLabel,
  telHref,
} from "@/lib/resources";
import { CategoryTags, LocationBadge } from "@/components/ResourceCard";
import { Icon } from "@/components/Icon";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return getActiveResources().map((r) => ({ id: r.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const r = getResource(id);
  if (!r) return {};
  const where = r.address.city ?? regionLabel(r.region);
  return {
    title: `${r.name} — ${where}`,
    description: r.description,
    alternates: { canonical: `/resources/${r.id}` },
  };
}

export default async function ResourceDetail({ params }: { params: Params }) {
  const { id } = await params;
  const r = getResource(id);
  if (!r) notFound();
  const directions = directionsHref(r);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link href="/resources" className="back-link">
            <Icon name="back" size={20} /> Back to all resources
          </Link>
          <div style={{ marginTop: "0.75rem", display: "grid", gap: "0.75rem" }}>
            <LocationBadge r={r} />
            <h1 style={{ maxWidth: "26ch", margin: 0 }}>{r.name}</h1>
            <CategoryTags r={r} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container detail">
          <div className="stack">
            <h2 style={{ fontSize: "1.4rem" }}>About this service</h2>
            <p style={{ fontSize: "1.1rem" }}>{r.description}</p>

            {r.availabilityNotes && (
              <div className="notice">
                <Icon name="info" />
                <p>
                  <strong>Service notes:</strong> {r.availabilityNotes}
                </p>
              </div>
            )}

            {r.locationType === "mobile" && (
              <div className="notice notice--red">
                <Icon name="rotate" />
                <p>This is a mobile service. Locations and schedules change, so check the current schedule before you go.</p>
              </div>
            )}

            <div className="notice notice--red">
              <Icon name="alert" />
              <p>
                <strong>Call ahead</strong> to confirm current hours, eligibility, availability, and intake requirements.
                We can’t confirm whether this service is open right now.
              </p>
            </div>
          </div>

          <aside className="card detail-box" aria-label="Contact and location">
            <dl>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a className="phone-big" href={telHref(r.phone)}>
                    {formatPhone(r.phone)}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{r.locationType === "fixed" ? "Address" : "Location"}</dt>
                <dd>{r.locationType === "fixed" ? fullAddress(r) : r.address.street}</dd>
              </div>
              <div>
                <dt>Area</dt>
                <dd>{regionLabel(r.region)}</dd>
              </div>
              {r.website && (
                <div>
                  <dt>Website</dt>
                  <dd>
                    <a href={r.website} target="_blank" rel="noopener noreferrer">
                      {r.website.replace(/^https?:\/\//, "")}
                      <span className="sr-only"> (opens new tab)</span>
                    </a>
                  </dd>
                </div>
              )}
              {r.lastVerified && (
                <div>
                  <dt>Last checked by our team</dt>
                  <dd>
                    {new Date(r.lastVerified + "T12:00:00").toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              )}
            </dl>
            <div className="stack" style={{ marginTop: "1.5rem" }}>
              <a className="btn btn--primary btn--block" href={telHref(r.phone)}>
                <Icon name="phone" size={20} /> Call {formatPhone(r.phone)}
              </a>
              {directions && (
                <a className="btn btn--outline btn--block" href={directions} target="_blank" rel="noopener noreferrer">
                  <Icon name="directions" size={20} /> Get Directions<span className="sr-only"> (opens map)</span>
                </a>
              )}
            </div>
          </aside>
        </div>

        <div className="container" style={{ marginTop: "2.5rem" }}>
          <p className="muted">
            Is something here out of date?{" "}
            <Link href="/contact?topic=resource-update">Let us know</Link> and we’ll review it.
          </p>
        </div>
      </section>
    </>
  );
}
