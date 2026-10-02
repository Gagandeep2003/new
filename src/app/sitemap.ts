import { MetadataRoute } from "next";
import { Categories } from "@/data/categories";
import { tools } from "@/data/tools";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://utilities.example.com";
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      priority: 1.0,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/search`,
      lastModified,
      priority: 0.8,
      changeFrequency: "daily",
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = Categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: "weekly",
  }));

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/${tool.category}/${tool.slug}`,
    lastModified,
    priority: 0.9,
    changeFrequency: "weekly",
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}