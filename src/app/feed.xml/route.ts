import { getPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS feed, how aggregators and several assistant crawlers discover new posts. */
export function GET() {
  const posts = getPosts();
  const updated = posts[0]?.date;

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}/`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}, Blog</title>
    <link>${absoluteUrl("/blog/")}</link>
    <description>${escapeXml(
      "Analyses et conseils pratiques sur le recrutement médical en France.",
    )}</description>
    <language>fr-FR</language>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />${
      updated
        ? `\n    <lastBuildDate>${new Date(`${updated}T09:00:00Z`).toUTCString()}</lastBuildDate>`
        : ""
    }
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
