import data from "@/data/resources.json";

export type RegionId =
  | "san-jose"
  | "san-francisco"
  | "hayward-castro-valley-fremont"
  | "palo-alto-mountain-view-east-palo-alto"
  | "all";

export type CategoryId =
  | "emergency-shelter"
  | "food"
  | "medical"
  | "mental-health"
  | "showers-laundry"
  | "housing"
  | "hygiene"
  | "social-services"
  | "general";

export type LocationType = "fixed" | "phone-only" | "mobile";

export interface Resource {
  id: string;
  name: string;
  region: RegionId;
  categories: CategoryId[];
  description: string;
  address: { street: string; city: string | null; state: string; postalCode: string | null };
  phone: string;
  website: string | null;
  locationType: LocationType;
  availabilityNotes: string | null;
  lastVerified: string | null;
  isActive: boolean;
}

export const REGIONS: { id: Exclude<RegionId, "all">; label: string }[] = [
  { id: "san-jose", label: "San Jose" },
  { id: "san-francisco", label: "San Francisco" },
  { id: "hayward-castro-valley-fremont", label: "Hayward, Castro Valley & Fremont" },
  { id: "palo-alto-mountain-view-east-palo-alto", label: "Palo Alto, Mountain View & East Palo Alto" },
];

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "emergency-shelter", label: "Emergency Shelter" },
  { id: "food", label: "Food and Meals" },
  { id: "medical", label: "Medical Care" },
  { id: "mental-health", label: "Mental Health and Wellness" },
  { id: "showers-laundry", label: "Showers and Laundry" },
  { id: "housing", label: "Housing Navigation" },
  { id: "hygiene", label: "Hygiene and Basic Necessities" },
  { id: "social-services", label: "Social Services" },
  { id: "general", label: "General Assistance" },
];

export const regionLabel = (id: RegionId) =>
  id === "all" ? "All Bay Area regions" : REGIONS.find((r) => r.id === id)?.label ?? id;

export const categoryLabel = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

export const isRegion = (v: unknown): v is Exclude<RegionId, "all"> =>
  typeof v === "string" && REGIONS.some((r) => r.id === v);
export const isCategory = (v: unknown): v is CategoryId =>
  typeof v === "string" && CATEGORIES.some((c) => c.id === v);

const all = (data.resources as Resource[]);

/** All listings that are switched on (isActive: true). */
export function getActiveResources(): Resource[] {
  return all.filter((r) => r.isActive);
}

export function getResource(id: string): Resource | undefined {
  return getActiveResources().find((r) => r.id === id);
}

export function getDataset() {
  return {
    schemaVersion: data.schemaVersion,
    dataVersion: data.dataVersion,
    resources: getActiveResources(),
  };
}

export interface Filters {
  q?: string;
  region?: Exclude<RegionId, "all">;
  category?: CategoryId;
}

export function filterResources(list: Resource[], { q, region, category }: Filters): Resource[] {
  const terms = (q ?? "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return list.filter((r) => {
    if (region && r.region !== region && r.region !== "all") return false;
    if (category && !r.categories.includes(category)) return false;
    if (terms.length) {
      const hay = [
        r.name,
        r.description,
        r.address.street,
        r.address.city ?? "",
        regionLabel(r.region),
        ...r.categories.map(categoryLabel),
      ]
        .join(" ")
        .toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  });
}

/* ---------- formatting helpers ---------- */

export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return d;
}

export function telHref(digits: string): string {
  const d = digits.replace(/\D/g, "");
  return d.length === 10 ? `tel:+1${d}` : `tel:${d}`;
}

export function fullAddress(r: Resource): string {
  const { street, city, state, postalCode } = r.address;
  return [street, city, [state, postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ");
}

/** Directions only for fixed, physical addresses. */
export function directionsHref(r: Resource): string | null {
  if (r.locationType !== "fixed" || !r.address.city) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(r))}`;
}

export function locationLabel(r: Resource): string {
  if (r.locationType === "phone-only") return "Phone-based service";
  if (r.locationType === "mobile") return "Mobile service — locations rotate";
  return fullAddress(r);
}
