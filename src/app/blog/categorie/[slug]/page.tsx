import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import JsonLd from "@/components/JsonLd";
import { getCategories, getPostsByCategory } from "@/lib/blog";
import { categoryMeta } from "@/lib/categories";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategories().find((item) => item.slug === slug);
  if (!category) return {};

  const meta = categoryMeta[slug];
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/categorie/${category.slug}/`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategories().find((item) => item.slug === slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: category.name, path: `/blog/categorie/${category.slug}/` },
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbSchema(crumbs)])} />

      <div className="px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumbs items={crumbs} />

          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Catégorie
            </p>
            <h1 className="mb-4 mt-2 text-4xl font-bold text-foreground md:text-5xl">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {categoryMeta[slug].intro}
            </p>
          </div>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="flex">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
