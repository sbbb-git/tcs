import type { MetadataRoute } from "next";

import { getCategories, getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const categories = getCategories();
  const lastPostDate = posts[0]?.date;

  return [
    {
      url: absoluteUrl("/"),
      lastModified: lastPostDate ? new Date(lastPostDate) : new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog/"),
      lastModified: lastPostDate ? new Date(lastPostDate) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...categories.map((category) => ({
      url: absoluteUrl(`/blog/categorie/${category.slug}/`),
      lastModified: lastPostDate ? new Date(lastPostDate) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/mentions-legales/"),
      changeFrequency: "yearly" as const,
      priority: 0.1,
    },
    {
      url: absoluteUrl("/confidentialite/"),
      changeFrequency: "yearly" as const,
      priority: 0.1,
    },
  ];
}
