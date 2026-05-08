import type { MetadataRoute } from "next";

const BASE_URL = "https://tps-website-one.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const services = ["deal-sourcing", "r2sa", "r2hmo", "social-housing", "supported-living"];

  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/landlords", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/investors", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/calculators", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/education", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/register-criteria", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/landlord-enquiry", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const servicePages = services.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticPages.map((p) => ({ url: `${BASE_URL}${p.url}`, lastModified, priority: p.priority, changeFrequency: p.changeFrequency })),
    ...servicePages,
  ];
}
