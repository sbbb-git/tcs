import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { categoryMeta, categoryOrder } from "@/lib/categories";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  category: string;
  keywords?: string[];
  /** Summary bullets shown above the article body. */
  keyPoints?: string[];
  /**
   * Questions-réponses affichées en fin d'article et déclarées en FAQPage.
   * À réserver aux vraies questions posées par les lecteurs : un bloc FAQ
   * artificiel ne gagne rien et alourdit la page.
   */
  faq?: { question: string; answer: string }[];
  /** Overrides the computed reading time when set. */
  readingTime?: string;
  /** Set to true to keep a post out of the build entirely. */
  draft?: boolean;
  updated?: string;
  author?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  body: string;
  readingTime: string;
  wordCount: number;
  headings: Heading[];
};

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Category = { slug: string; name: string; count: number };

/** Accent-insensitive, URL-safe slug — "Démographie médicale" -> "demographie-medicale". */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Pulls `##` and `###` headings out of the MDX body for the table of contents.
 * The ids match what rehype-slug generates, so the anchors line up.
 */
function extractHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({
      id: slugify(text),
      text,
      level: match[1].length === 2 ? 2 : 3,
    });
  }

  return headings;
}

function countWords(body: string): number {
  const plain = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]/g, " ");
  return plain.split(/\s+/).filter(Boolean).length;
}

/** Midnight UTC today — posts dated later than this are held back. */
function todayUtc(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const front = data as PostFrontmatter;

  for (const field of ["title", "description", "excerpt", "date", "category"] as const) {
    if (!front[field]) {
      throw new Error(`content/blog/${fileName}: champ "${field}" manquant.`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(front.date)) {
    throw new Error(
      `content/blog/${fileName}: "date" doit être au format AAAA-MM-JJ.`,
    );
  }

  const stats = readingTime(content);

  return {
    ...front,
    slug,
    body: content,
    readingTime:
      front.readingTime ?? `${Math.max(1, Math.round(stats.minutes))} min`,
    wordCount: countWords(content),
    headings: extractHeadings(content),
  };
}

let cache: Post[] | null = null;

/** Every post on disk, including drafts and future-dated ones. */
export function getAllPostsRaw(): Post[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) return [];

  cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));

  return cache;
}

/**
 * Posts that are actually published: not a draft, and dated today or earlier.
 * A daily rebuild is what makes a future-dated post go live on its own date,
 * which keeps publishing to a steady drip rather than one big dump.
 */
export function getPosts(): Post[] {
  const today = todayUtc();
  return getAllPostsRaw().filter(
    (post) => !post.draft && new Date(`${post.date}T00:00:00Z`) <= today,
  );
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getCategories(): Category[] {
  const counts = new Map<string, { name: string; count: number }>();

  for (const post of getPosts()) {
    const slug = slugify(post.category);
    const entry = counts.get(slug);
    if (entry) entry.count += 1;
    else counts.set(slug, { name: post.category, count: 1 });
  }

  const unknown = [...counts.keys()].filter((slug) => !categoryMeta[slug]);
  if (unknown.length > 0) {
    throw new Error(
      `Catégorie inconnue dans content/blog : ${unknown.join(", ")}. ` +
        "Ajoutez-la à src/lib/categories.ts ou corrigez le frontmatter.",
    );
  }

  return [...counts.entries()]
    .map(([slug, { name, count }]) => ({ slug, name, count }))
    .sort((a, b) => {
      const rankA = categoryOrder.indexOf(a.slug);
      const rankB = categoryOrder.indexOf(b.slug);
      return rankA - rankB || a.name.localeCompare(b.name, "fr");
    });
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getPosts().filter((post) => slugify(post.category) === categorySlug);
}

/**
 * Related posts for the "À lire aussi" block: same category first, then the
 * most recent others. Every article ends up with outgoing internal links,
 * which the SEO check enforces.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return [];

  const others = getPosts().filter((post) => post.slug !== slug);
  const sameCategory = others.filter(
    (post) => post.category === current.category,
  );
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}
