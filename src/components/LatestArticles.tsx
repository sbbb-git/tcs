import Link from "next/link";

import { Icon } from "@/components/Icon";
import PostCard from "@/components/PostCard";
import Section, { SectionHeader } from "@/components/Section";
import type { Post } from "@/lib/blog";

export default function LatestArticles({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <Section tone="soft" width="full" labelledBy="articles-title">
      <SectionHeader
        eyebrow="Ressources"
        title="Comprendre le recrutement médical"
        intro="Statuts, rémunération, conditions d'exercice : ce qu'on explique en entretien, écrit une bonne fois."
        id="articles-title"
      />

      <ul className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex">
            <PostCard post={post} headingLevel="h3" />
          </li>
        ))}
      </ul>

      <div className="mt-9 text-center">
        <Link href="/blog/" className="btn-secondary">
          Tous les articles
          <Icon name="arrowRight" className="h-[18px] w-[18px]" />
        </Link>
      </div>
    </Section>
  );
}
