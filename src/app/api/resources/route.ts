import { NextResponse } from "next/server";
import { getDataset } from "@/lib/resources";

/**
 * Public, versioned JSON export of the active resource directory.
 * GET /api/resources  → { schemaVersion, dataVersion, resources: [...] }
 * Intended for the future mobile app (which can cache it for offline use).
 */
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getDataset(), {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
