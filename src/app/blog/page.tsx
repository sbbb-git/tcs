import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import JsonLd from "@/components/JsonLd";
import { getCategories, getPosts } from "@/lib/blog";
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Blog — recrutement médical en France | TalentCare Santé",
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

export default function BlogPage() {
  const posts = getPosts();
  const categories = getCategories();

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Blog", path: "/blog/" },
          ]),
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

      <div className="px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Blog", path: "/blog/" },
            ]}
          />

          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Blog
            </p>
            <h1 className="mb-4 mt-2 text-4xl font-bold text-foreground md:text-5xl">
              Recrutement médical en France
            </h1>
            <p className="text-lg text-muted-foreground">
              Analyses, conseils pratiques et tendances pour recruter et
              fidéliser les médecins en France.
            </p>
          </div>

          {categories.length > 1 && (
            <nav aria-label="Catégories" className="mb-12">
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/blog/categorie/${category.slug}/`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {category.name}
                      <span className="text-muted-foreground">{category.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

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
