import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.kidenzo.store";

  // Home route
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 33 Category hubs
  for (const cat of CATEGORIES) {
    routes.push({
      url: `${baseUrl}/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
  }

  // Institutional & Legal Pages (E-E-A-T)
  const institutionalPages = [
    "a-propos",
    "mentions-legales",
    "confidentialite",
    "affiliation",
    "contact",
  ];
  for (const page of institutionalPages) {
    routes.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // All 1,409+ Articles routes
  const articles = getAllArticles();
  for (const art of articles) {
    routes.push({
      url: `${baseUrl}/${art.categorySlug}/${art.slug}`,
      lastModified: art.publishedAt ? new Date(art.publishedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return routes;
}
