import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Callout } from "@/components/mdx/Callout";

/**
 * Composants disponibles dans le MDX.
 *
 * La mise en forme du texte courant vient de la classe `.prose-content`, posée
 * par la page : il n'y a donc plus qu'à traiter ici ce que le CSS ne peut pas
 * faire, à savoir la navigation interne et l'enveloppe défilante des tableaux.
 *
 * next-mdx-remote v6 n'évalue plus les expressions `{…}` dans le MDX, correctif
 * de son avis de sécurité. Un composant utilisé ici ne peut donc recevoir que
 * des attributs textuels ; toute donnée structurée passe par le frontmatter.
 */
const components = {
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href.startsWith("/") || href.startsWith("#")) {
      return <Link href={href} {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  Callout,
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              { behavior: "wrap", properties: { className: "no-underline" } },
            ],
          ],
        },
      }}
    />
  );
}
