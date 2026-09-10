import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MdxContent from "@/components/MdxContent";
import PostCard from "@/components/PostCard";
import TableOfContents from "@/components/TableOfContents";
import { Faq } from "@/components/mdx/Faq";
import { KeyPoints } from "@/components/mdx/KeyPoints";
import { getPost, getPosts, getRelatedPosts, slugify } from "@/lib/blog";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
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
        data={jsonLdGraph([
          articleSchema(post),
          breadcrumbSchema(crumbs),
          ...(post.faq?.length ? [faqSchema(post.faq)] : []),
        ])}
      />

      <div className="border-b border-line bg-soft">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <Link
            href={`/blog/categorie/${categorySlug}/`}
            className="eyebrow hover:text-accent-800"
          >
            {post.category}
          </Link>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-mute">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4" />
              {post.readingTime} de lecture
            </span>
            {post.updated && post.updated !== post.date && (
              <span>
                Mis à jour le{" "}
                <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <article>
          {post.keyPoints && post.keyPoints.length > 0 && (
            <KeyPoints items={post.keyPoints} />
          )}

          <TableOfContents headings={post.headings} />

          <div className="prose-content">
            <MdxContent source={post.body} />
          </div>

          {post.faq && post.faq.length > 0 && <Faq items={post.faq} />}
        </article>

        {/*
          Appel à l'action : registre visuel volontairement supérieur à celui
          des encarts du corps, pour que la hiérarchie visuelle reflète la
          hiérarchie commerciale.
        */}
        <aside className="mt-14 rounded-2xl bg-accent-50 p-7 text-center ring-1 ring-accent-200">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Un projet de recrutement ou de carrière ?
          </h2>
          <p className="mx-auto mt-2 max-w-xl leading-relaxed text-ink-soft">
            Nous accompagnons les praticiens dans leur mobilité et les
            établissements dans leurs recrutements.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/#contact" className="btn-primary">
              Nous contacter
            </Link>
            <Link href="/offres-emploi/" className="btn-secondary bg-bg">
              Voir les offres
            </Link>
          </div>
        </aside>

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-title">
            <h2
              id="related-title"
              className="text-2xl font-semibold tracking-tight text-ink"
            >
              À lire aussi
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="flex">
                  <PostCard post={item} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
