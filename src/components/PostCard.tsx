import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  /** Headings inside a list of articles should sit one level below the page h1. */
  headingLevel?: "h2" | "h3";
};

export default function PostCard({ post, headingLevel = "h2" }: PostCardProps) {
  const Heading = headingLevel;

  return (
    <Card className="flex h-full flex-col border-none bg-card shadow-lg transition-shadow hover:shadow-xl">
      <CardContent className="flex flex-1 flex-col p-6">
        <Badge variant="outline" className="mb-4 w-fit border-border">
          {post.category}
        </Badge>

        <Heading className="mb-3 text-xl font-bold text-foreground">
          <Link
            href={`/blog/${post.slug}/`}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </Heading>

        <p className="mb-6 text-sm text-muted-foreground">{post.excerpt}</p>

        <div className="mt-auto">
          <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}/`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            tabIndex={-1}
            aria-hidden="true"
          >
            Lire l&apos;article
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
