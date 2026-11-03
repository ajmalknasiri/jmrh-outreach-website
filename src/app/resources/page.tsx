import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORIES,
  REGIONS,
  categoryLabel,
  filterResources,
  getActiveResources,
  isCategory,
  isRegion,
  regionLabel,
} from "@/lib/resources";
import { ResourceCard } from "@/components/ResourceCard";
import { AutoSubmit } from "@/components/AutoSubmit";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Find Free Resources — Shelter, Meals, Medical Care & More",
  description:
    "Search free and low-cost shelters, meals, clinics, showers, laundry, and support services in San Jose, San Francisco, Hayward, Castro Valley, Fremont, Palo Alto, Mountain View, and East Palo Alto.",
  alternates: { canonical: "/resources" },
};

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function ResourcesPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const q = one(sp.q).slice(0, 100);
  const region = isRegion(one(sp.region)) ? (one(sp.region) as (typeof REGIONS)[number]["id"]) : undefined;
  const category = isCategory(one(sp.category)) ? (one(sp.category) as (typeof CATEGORIES)[number]["id"]) : undefined;

  const all = getActiveResources();
  const results = filterResources(all, { q, region, category });
  const filtered = Boolean(q || region || category);

  const summaryParts = [
    category && categoryLabel(category),
    region && `in ${regionLabel(region)}`,
    q && `matching “${q}”`,
  ].filter(Boolean);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Resource directory</span>
          <h1>Find free resources near you</h1>
          <p className="lead">
            Shelter, meals, medical care, showers, and other support across the Bay Area. Tap a phone number to call.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container dir-layout">
          <div className="notice notice--red">
            <Icon name="info" />
            <p>
              <strong>Please call ahead.</strong> Hours, eligibility, and availability change often. This list is not
              complete — for more options, call <a href="tel:211">211</a>. In an emergency, call{" "}
              <a href="tel:911">911</a>.
            </p>
          </div>

          <form id="filters" className="filters" action="/resources" method="get" role="search" aria-label="Filter resources">
            <div className="field field--search">
              <label htmlFor="q">Search</label>
              <div className="input-icon">
                <Icon name="search" size={20} />
                <input
                  id="q"
                  name="q"
                  type="search"
                  className="input"
                  defaultValue={q}
                  placeholder="Try “meals”, “shower”, or a city"
                  autoComplete="off"
                  enterKeyHint="search"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="region">Area</label>
              <select id="region" name="region" className="select" defaultValue={region ?? ""}>
                <option value="">All areas</option>
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="category">Type of help</label>
              <select
                id="category"
                name="category"
                className="select"
                defaultValue={category ?? ""}
              >
                <option value="">All types</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="filters__actions">
              <button type="submit" className="btn btn--primary">
                Search
              </button>
              {filtered && (
                <Link href="/resources" className="btn btn--outline" scroll={false}>
                  Reset filters
                </Link>
              )}
            </div>
          </form>
          <AutoSubmit formId="filters" action="/resources" />

          <div className="results-bar">
            <p role="status" aria-live="polite" aria-atomic="true">
              {results.length} {results.length === 1 ? "resource" : "resources"}
              {filtered && summaryParts.length ? ` — ${summaryParts.join(" ")}` : ""}
            </p>
          </div>

          {results.length > 0 ? (
            <ul className="resource-list">
              {results.map((r) => (
                <li key={r.id}>
                  <ResourceCard r={r} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <h2 style={{ fontSize: "1.4rem" }}>No resources match your search</h2>
              <p>Try a different word, choose “All areas”, or reset your filters. You can also call 211 to talk to someone about local services.</p>
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <Link href="/resources" className="btn btn--primary">
                  Reset filters
                </Link>
                <a href="tel:211" className="btn btn--outline">
                  <Icon name="phone" size={20} /> Call 211
                </a>
              </div>
            </div>
          )}

          <div className="card" style={{ marginTop: "1rem" }}>
            <h2 style={{ fontSize: "1.3rem" }}>Know a resource we’re missing? See something outdated?</h2>
            <p className="muted">
              Tell us. Our team reviews every suggestion before anything is added or changed on the site.
            </p>
            <Link href="/contact?topic=resource-update" className="btn btn--dark">
              Suggest or update a resource
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
