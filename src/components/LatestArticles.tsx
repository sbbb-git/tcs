import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/blog";

/**
 * Surfaces the blog on the home page. Beyond the editorial value, it gives the
 * most-linked page of the site a direct path to fresh content.
 */
export default function LatestArticles({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-secondary/50 px-4 py-20" aria-labelledby="articles-title">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Ressources
          </p>
          <h2
            id="articles-title"
            className="mb-4 mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Comprendre le recrutement médical
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Nos analyses sur la démographie médicale, les rémunérations, les
            statuts et l&apos;attractivité des établissements.
          </p>
        </div>

        <ul className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="flex">
              <PostCard post={post} headingLevel="h3" />
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/blog/">
              Tous les articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
