import Link from "next/link";
import {
  categoryLabel,
  directionsHref,
  formatPhone,
  locationLabel,
  regionLabel,
  telHref,
  type Resource,
} from "@/lib/resources";
import { Icon, categoryIcon } from "./Icon";

export function LocationBadge({ r }: { r: Resource }) {
  if (r.locationType === "mobile")
    return (
      <span className="loc-badge loc-badge--mobile">
        <Icon name="rotate" size={16} /> Mobile service — locations rotate
      </span>
    );
  if (r.locationType === "phone-only")
    return (
      <span className="loc-badge loc-badge--phone">
        <Icon name="phone" size={16} /> Phone-based service
      </span>
    );
  return null;
}

export function CategoryTags({ r }: { r: Resource }) {
  return (
    <ul className="tags" aria-label="Services">
      {r.categories.map((c) => (
        <li key={c} className="tag">
          <Icon name={categoryIcon[c]} size={14} />
          {categoryLabel(c)}
        </li>
      ))}
    </ul>
  );
}

export function ResourceCard({ r }: { r: Resource }) {
  const directions = directionsHref(r);
  const headingId = `res-${r.id}`;
  return (
    <article className="resource-card" aria-labelledby={headingId}>
      <LocationBadge r={r} />
      <h3 id={headingId}>
        <Link href={`/resources/${r.id}`}>{r.name}</Link>
      </h3>
      <CategoryTags r={r} />

      <p className="meta-line">
        <Icon name={r.locationType === "fixed" ? "pin" : r.locationType === "mobile" ? "rotate" : "phone"} size={18} />
        <span>
          {r.locationType === "fixed" ? locationLabel(r) : r.address.street}
          <span className="sr-only"> — {regionLabel(r.region)}</span>
        </span>
      </p>
      <p className="meta-line">
        <Icon name="phone" size={18} />
        <a className="phone-big" href={telHref(r.phone)}>
          {formatPhone(r.phone)}
        </a>
      </p>

      <p className="resource-card__desc">{r.description}</p>

      {r.locationType === "mobile" && (
        <p className="notice" style={{ fontSize: "0.92rem" }}>
          Locations and schedules may change. Check before you go.
        </p>
      )}

      <div className="card-actions">
        <a className="btn btn--primary btn--call" href={telHref(r.phone)}>
          <Icon name="phone" size={20} /> Call {formatPhone(r.phone)}
          <span className="sr-only"> — {r.name}</span>
        </a>
        {directions && (
          <a className="btn btn--outline btn--sm" href={directions} target="_blank" rel="noopener noreferrer">
            <Icon name="directions" size={18} /> Directions
            <span className="sr-only"> to {r.name} (opens map)</span>
          </a>
        )}
        <Link className="btn btn--outline btn--sm" href={`/resources/${r.id}`}>
          View Details<span className="sr-only"> for {r.name}</span>
        </Link>
        {r.website && (
          <a
            className="btn btn--outline btn--sm"
            href={r.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="globe" size={18} /> Website<span className="sr-only"> for {r.name} (opens new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
