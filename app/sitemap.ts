import type { MetadataRoute } from "next";
import { SOLUTIONS_LIST } from "@/lib/solutions-data";
import { INSIGHTS } from "@/lib/insights-data";

const BASE_URL = "https://qavyon.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/what-we-solve",
    "/system",
    "/insights",
    "/about",
    "/how-we-work",
    "/quickscan",
    "/book",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const solutionRoutes = SOLUTIONS_LIST.map((s) => ({
    url: `${BASE_URL}/what-we-solve/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightRoutes = INSIGHTS.map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...solutionRoutes, ...insightRoutes];
}
