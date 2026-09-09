import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Assistant crawlers come in two kinds and they must not be confused:
 *
 *  - search / citation crawlers build the index an assistant answers from and
 *    show a source link, so blocking them removes the site from those answers;
 *  - training crawlers feed model training and send no visitor at all, so
 *    blocking them costs nothing in traffic.
 *
 * Everything is allowed here. Restricting training crawlers is a separate,
 * deliberate decision: add them to a `disallow` group below, never by accident.
 *
 * Whatever this file says, check the robots.txt actually *served* by the host
 * once online — some hosts prepend a managed block of their own, which would
 * leave two contradictory groups for the same user-agent.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },

      // Named explicitly so a future rule can never catch them by accident.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
