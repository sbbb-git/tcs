import Link from "next/link";

import { Icon } from "@/components/Icon";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  headingLevel?: "h2" | "h3";
};

export default function PostCard({ post, headingLevel = "h2" }: PostCardProps) {
  const Heading = headingLevel;

  return (
    <article className="card-link flex h-full flex-col">
      <p className="eyebrow">{post.category}</p>

      <Heading className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink">
        <Link href={`/blog/${post.slug}/`} className="transition hover:text-accent-700">
          {/* Le lien couvre la carte : le survol de n'importe quel point l'active. */}
          <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
          {post.title}
        </Link>
      </Heading>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>

      <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-xs text-ink-mute">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="calendar" className="h-3.5 w-3.5" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="clock" className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
      </div>
    </article>
  );
}
