// Checks src/data/resources.json for common mistakes before publishing.
// Run with: npm run validate-data
import { readFileSync } from "node:fs";

const REGIONS = ["san-jose", "san-francisco", "hayward-castro-valley-fremont", "palo-alto-mountain-view-east-palo-alto", "all"];
const CATEGORIES = ["emergency-shelter", "food", "medical", "mental-health", "showers-laundry", "housing", "hygiene", "social-services", "general"];
const TYPES = ["fixed", "phone-only", "mobile"];

const data = JSON.parse(readFileSync(new URL("../src/data/resources.json", import.meta.url), "utf8"));
const problems = [];
const ids = new Set();

for (const [i, r] of data.resources.entries()) {
  const where = `#${i + 1} ${r.name ?? "(no name)"}`;
  if (!r.id || !/^[a-z0-9-]+$/.test(r.id)) problems.push(`${where}: id must be lowercase letters, numbers, dashes`);
  if (ids.has(r.id)) problems.push(`${where}: duplicate id "${r.id}"`);
  ids.add(r.id);
  if (!r.name) problems.push(`${where}: missing name`);
  if (!REGIONS.includes(r.region)) problems.push(`${where}: unknown region "${r.region}"`);
  if (!Array.isArray(r.categories) || !r.categories.length) problems.push(`${where}: needs at least one category`);
  for (const c of r.categories ?? []) if (!CATEGORIES.includes(c)) problems.push(`${where}: unknown category "${c}"`);
  if (!TYPES.includes(r.locationType)) problems.push(`${where}: unknown locationType "${r.locationType}"`);
  if (!/^(\d{3}|\d{10})$/.test(String(r.phone ?? ""))) problems.push(`${where}: phone must be 10 digits (or 3, like 211)`);
  if (r.locationType === "fixed" && !r.address?.city) problems.push(`${where}: fixed locations need a city`);
  if (r.website && !/^https:\/\//.test(r.website)) problems.push(`${where}: website should start with https://`);
  if (r.lastVerified && !/^\d{4}-\d{2}-\d{2}$/.test(r.lastVerified)) problems.push(`${where}: lastVerified must be YYYY-MM-DD`);
  if (typeof r.isActive !== "boolean") problems.push(`${where}: isActive must be true or false`);
}

if (problems.length) {
  console.error(`Found ${problems.length} problem(s):\n- ` + problems.join("\n- "));
  process.exit(1);
}
const active = data.resources.filter((r) => r.isActive).length;
console.log(`OK — ${data.resources.length} resources (${active} shown on the site).`);
