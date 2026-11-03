import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getActiveResources } from "@/lib/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages = ["", "/resources", "/wound-care", "/about", "/get-involved", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" || p === "/resources" ? 1 : 0.6,
    })),
    ...getActiveResources().map((r) => ({
      url: `${base}/resources/${r.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
