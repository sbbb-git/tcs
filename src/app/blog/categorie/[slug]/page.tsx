import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import { getCategories, getPostsByCategory } from "@/lib/blog";
import { categoryMeta } from "@/lib/categories";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const meta = categoryMeta[slug];
  if (!meta) return {};

  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/categorie/${slug}/`,
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

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Catégorie</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {categoryMeta[slug].intro}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="flex">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
