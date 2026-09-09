import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import MdxContent from "@/components/MdxContent";
import PostCard from "@/components/PostCard";
import TableOfContents from "@/components/TableOfContents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost, getPosts, getRelatedPosts, slugify } from "@/lib/blog";
import {
  articleSchema,
  breadcrumbSchema,
  jsonLdGraph,
  pageMetadata,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const categorySlug = slugify(post.category);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.category, path: `/blog/categorie/${categorySlug}/` },
    { name: post.title, path: `/blog/${post.slug}/` },
  ];

  return (
    <>
      <JsonLd
        data={jsonLdGraph([articleSchema(post), breadcrumbSchema(crumbs)])}
      />

      <div className="px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-3xl">
          <Breadcrumbs items={crumbs} />

          <article>
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Link href="/blog/" className="inline-flex">
                  <Badge
                    variant="outline"
                    className="border-border transition-colors hover:border-primary hover:text-primary"
                  >
                    <ArrowLeft className="mr-1.5 h-3 w-3" aria-hidden="true" />
                    Retour au blog
                  </Badge>
                </Link>
                <Link
                  href={`/blog/categorie/${categorySlug}/`}
                  className="inline-flex"
                >
                  <Badge className="transition-colors hover:bg-primary/80">
                    {post.category}
                  </Badge>
                </Link>
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-5xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {post.readingTime} de lecture
                </span>
                {post.updated && post.updated !== post.date && (
                  <span>
                    Mis à jour le{" "}
                    <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </span>
                )}
              </div>

              <hr className="mt-8 border-border" />
            </header>

            <TableOfContents headings={post.headings} />

            <div>
              <MdxContent source={post.body} />
            </div>
          </article>

          <aside className="mt-14 rounded-lg bg-secondary/50 p-8 text-center">
            <h2 className="mb-2 text-xl font-bold text-foreground">
              Un projet de recrutement ou de carrière ?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              TalentCare Santé accompagne les praticiens dans leur mobilité et
              les hôpitaux, cliniques et centres de santé dans leurs
              recrutements.
            </p>
            <Button asChild size="lg">
              <Link href="/#contact">Nous contacter</Link>
            </Button>
          </aside>

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-title">
              <h2
                id="related-title"
                className="mb-6 text-2xl font-bold text-foreground"
              >
                À lire aussi
              </h2>
              <ul className="grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug} className="flex">
                    <PostCard post={item} headingLevel="h3" />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
