import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import { getCategories, getPosts } from "@/lib/blog";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Blog : recrutement médical en France | TalentCare",
  description:
    "Analyses et conseils pratiques sur le recrutement médical en France : démographie, rémunérations, statuts, marque employeur et fidélisation des praticiens.",
  path: "/blog/",
  keywords: [
    "recrutement médical",
    "démographie médicale",
    "salaire médecin",
    "marque employeur santé",
  ],
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Blog", path: "/blog/" },
];

export default function BlogPage() {
  const posts = getPosts();
  const categories = getCategories();

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema(crumbs),
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/blog/#collection"),
            name: "Blog TalentCare Santé",
            description:
              "Analyses et conseils pratiques sur le recrutement médical en France.",
            inLanguage: "fr-FR",
            isPartOf: { "@id": absoluteUrl("/#website") },
            hasPart: posts.map((post) => ({
              "@type": "BlogPosting",
              "@id": `${absoluteUrl(`/blog/${post.slug}/`)}#article`,
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}/`),
              datePublished: post.date,
            })),
          },
        ])}
      />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Blog</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Recrutement médical en France
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Analyses, conseils pratiques et tendances pour recruter et fidéliser
            les professionnels de santé.
          </p>

          {categories.length > 1 && (
            <nav aria-label="Catégories" className="mt-7">
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/blog/categorie/${category.slug}/`}
                      className="inline-flex items-center gap-2 rounded-lg bg-bg px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-line transition hover:text-accent-700 hover:ring-accent-400"
                    >
                      {category.name}
                      <span className="text-ink-mute">{category.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
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
