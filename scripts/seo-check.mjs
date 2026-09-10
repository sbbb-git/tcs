#!/usr/bin/env node
/**
 * Post-build SEO gate.
 *
 * Runs against the exported `out/` directory — the HTML actually shipped, not
 * the source — and exits non-zero so a failing check stops the deploy instead
 * of printing a warning nobody reads.
 *
 * Two tiers:
 *   ERREUR  real breakage. Always blocks.
 *   DETTE   quality debt. Warns by default; blocks with --strict.
 *
 * Turning on --strict while the corpus is still thin only freezes publishing,
 * so switch it on once the backlog is cleared (see README).
 */
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");
const STRICT = process.argv.includes("--strict");

const TITLE_MAX = 60;
const DESC_MIN = 110;
const DESC_MAX = 160;
const MIN_WORDS = 350;

/*
 * Une annonce est structurellement plus courte qu'un article : elle décrit un
 * poste, pas un sujet. Lui imposer le seuil des pages de contenu pousserait à
 * la rembourrer d'un texte identique d'une offre à l'autre, ce qui est pire
 * qu'une page courte. Le seuil reste néanmoins non nul : une annonce de trois
 * lignes n'a rien à indexer.
 */
const MIN_WORDS_OFFER = 250;
const OFFER_PAGE = /^\/offres-emploi\/(?!metier\/)[^/]+\/?$/;

/**
 * Listings and legal notices are legitimately short: their job is to route or
 * to inform, not to rank on a query. The word-count floor targets the pages
 * that are supposed to earn traffic.
 */
const NOT_CONTENT = [
  /^\/blog\/?$/,
  /^\/blog\/categorie\//,
  /^\/offres-emploi\/?$/,
  /^\/mentions-legales\/?$/,
  /^\/confidentialite\/?$/,
];

const errors = [];
const debts = [];

const fail = (page, message) => errors.push(`${page} — ${message}`);
const debt = (page, message) => debts.push(`${page} — ${message}`);

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  eacute: "é", egrave: "è", ecirc: "ê", agrave: "à", ccedil: "ç",
  ugrave: "ù", ocirc: "ô", icirc: "î", euml: "ë", iuml: "ï",
  laquo: "«", raquo: "»", hellip: "…", rsquo: "’", lsquo: "‘",
  ldquo: "“", rdquo: "”", mdash: "—", ndash: "–", deg: "°", euro: "€",
};

/** Decodes entities so length checks count characters as a human sees them. */
function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

function metaContent(html, attr, value) {
  const pattern = new RegExp(
    `<meta[^>]+${attr}=["']${value}["'][^>]*>`,
    "i",
  );
  const tag = pattern.exec(html)?.[0];
  if (!tag) return null;
  const content = /content=["']([^"']*)["']/i.exec(tag)?.[1];
  return content == null ? null : decodeEntities(content);
}

/** Body text with markup, scripts, styles and JSON-LD removed. */
function visibleText(html) {
  const body = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html)?.[1] ?? html;
  return decodeEntities(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text) {
  return text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

/** "out/blog/slug/index.html" -> "/blog/slug/" */
function routeOf(file) {
  const rel = path.relative(OUT_DIR, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel.replace(/\.html$/, "")}`;
}

/* ------------------------------------------------------------------ */
/* run                                                                 */
/* ------------------------------------------------------------------ */

if (!fs.existsSync(OUT_DIR)) {
  console.error("✗ Le dossier out/ est absent. Lancez `npm run build` d'abord.");
  process.exit(1);
}

const files = walk(OUT_DIR);
const routes = new Set(files.map(routeOf));
// A trailing-slash build also answers on the slash-less form.
for (const route of [...routes]) {
  if (route.endsWith("/") && route !== "/") routes.add(route.slice(0, -1));
}

const titlesSeen = new Map();
const descriptionsSeen = new Map();

for (const file of files) {
  const route = routeOf(file);
  const html = fs.readFileSync(file, "utf8");

  const isNoIndex = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  // 404 is generated by Next but never linked; it is not an indexable page.
  const isContentPage = !isNoIndex && route !== "/404" && route !== "/404/";

  /* --- structural breakage: always blocking --- */

  if (!/<html[^>]+lang=["']fr["']/i.test(html)) {
    fail(route, "l'attribut lang=\"fr\" est absent de <html>.");
  }

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (isContentPage && h1Count !== 1) {
    fail(route, `${h1Count} balise(s) <h1> — il en faut exactement une.`);
  }

  /*
   * Le tiret cadratin est une signature d'écriture assistée en français, où la
   * virgule, le deux-points ou la parenthèse font le même travail. Le bannir
   * est une décision éditoriale, tenue ici plutôt que laissée à la relecture.
   */
  if (isContentPage) {
    const dashes = (visibleText(html).match(/—/g) ?? []).length;
    if (dashes > 0) {
      fail(route, `${dashes} tiret(s) cadratin dans le texte. Utiliser une virgule, un deux-points ou une parenthèse.`);
    }
  }

  // A JSX tag that reached the output as literal text, e.g. "<Callout>".
  const leaked = visibleText(html).match(/<\/?[A-Z][A-Za-z0-9]*\s*\/?>/g);
  if (leaked) {
    fail(route, `composant non rendu dans le HTML : ${[...new Set(leaked)].join(", ")}`);
  }

  const title = decodeEntities(
    /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() ?? "",
  );
  const description = metaContent(html, "name", "description");
  const ogImage = metaContent(html, "property", "og:image");
  const canonical = /<link[^>]+rel=["']canonical["'][^>]*>/i
    .exec(html)?.[0]
    ?.match(/href=["']([^"']+)["']/)?.[1];

  if (isContentPage) {
    if (!title) fail(route, "balise <title> absente ou vide.");
    if (!description) fail(route, "meta description absente.");
    if (!ogImage) fail(route, "og:image absente.");
    if (!canonical) fail(route, "URL canonique absente.");

    if (title) {
      const previous = titlesSeen.get(title);
      if (previous) fail(route, `title identique à ${previous}.`);
      else titlesSeen.set(title, route);
    }
    if (description) {
      const previous = descriptionsSeen.get(description);
      if (previous) fail(route, `meta description identique à ${previous}.`);
      else descriptionsSeen.set(description, route);
    }
  }

  /* --- internal links --- */

  const hrefs = [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const internal = hrefs.filter(
    (href) => href.startsWith("/") && !href.startsWith("//"),
  );

  if (isContentPage && internal.length === 0) {
    fail(route, "aucun lien interne sortant.");
  }

  for (const href of new Set(internal)) {
    const target = href.split("#")[0].split("?")[0];
    if (!target || target === route) continue;
    const asFile = path.join(OUT_DIR, target.replace(/^\//, ""));
    const exists =
      routes.has(target) ||
      routes.has(target.endsWith("/") ? target.slice(0, -1) : `${target}/`) ||
      fs.existsSync(asFile);
    if (!exists) fail(route, `lien interne mort : ${href}`);
  }

  /* --- quality debt --- */

  if (isContentPage) {
    if (title && title.length > TITLE_MAX) {
      debt(route, `title de ${title.length} caractères (max ${TITLE_MAX}) : « ${title} »`);
    }
    if (description) {
      const length = description.length;
      if (length < DESC_MIN || length > DESC_MAX) {
        debt(
          route,
          `meta description de ${length} caractères (attendu ${DESC_MIN}–${DESC_MAX}).`,
        );
      }
    }

    if (!NOT_CONTENT.some((pattern) => pattern.test(route))) {
      const words = countWords(visibleText(html));
      const floor = OFFER_PAGE.test(route) ? MIN_WORDS_OFFER : MIN_WORDS;
      if (words < floor) {
        debt(route, `${words} mots réels (minimum ${floor}).`);
      }
    }
  }
}

/* --- legal placeholders --- */

const legalSource = fs.readFileSync(
  path.join(process.cwd(), "src", "lib", "legal.ts"),
  "utf8",
);
const todoCount = (legalSource.match(/"TODO[^"]*"/g) ?? []).length;
if (todoCount > 0) {
  debt(
    "src/lib/legal.ts",
    `${todoCount} champ(s) légaux non renseignés — obligatoire avant mise en ligne.`,
  );
}

/* --- MDX expression attributes --- */

/*
 * next-mdx-remote v6 does not evaluate `{...}` in MDX. An expression attribute
 * is dropped silently, so the component renders with the prop undefined — the
 * kind of failure that only shows up as a blank block on a published page.
 * Structured data belongs in the frontmatter instead.
 */
const CONTENT_DIR_MDX = path.join(process.cwd(), "content", "blog");
if (fs.existsSync(CONTENT_DIR_MDX)) {
  for (const file of fs.readdirSync(CONTENT_DIR_MDX).filter((f) => f.endsWith(".mdx"))) {
    const body = fs
      .readFileSync(path.join(CONTENT_DIR_MDX, file), "utf8")
      .replace(/^---[\s\S]*?\n---\n/, "");
    if (/<[A-Z][A-Za-z0-9]*[^>]*\s[a-zA-Z-]+=\{/.test(body)) {
      fail(
        `content/blog/${file}`,
        "attribut MDX en expression {…} : non évalué par next-mdx-remote v6. " +
          "Passez la donnée par le frontmatter.",
      );
    }
  }
}

/* --- liens internes entre articles, programmés compris --- */

/*
 * Le contrôle sur out/ ne voit que les articles déjà publiés. Un article
 * programmé qui pointe vers un article publié plus tard produirait un lien mort
 * le jour de sa sortie — et le build ne le signalerait qu'à ce moment-là, sur
 * la branche de production. On vérifie donc le corpus entier, dates comprises.
 */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const todayIso = new Date().toISOString().slice(0, 10);
if (fs.existsSync(BLOG_DIR)) {
  const posts = new Map();
  for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    posts.set(file.replace(/\.mdx$/, ""), {
      file,
      date: /^date:\s*"?(\d{4}-\d{2}-\d{2})/m.exec(raw)?.[1] ?? "",
      body: raw.replace(/^---[\s\S]*?\n---\n/, ""),
    });
  }

  for (const [slug, post] of posts) {
    const links = [...post.body.matchAll(/\]\((\/blog\/[^)\s]*)\)/g)].map((m) => m[1]);
    for (const link of new Set(links)) {
      const targetSlug = link.replace(/^\/blog\//, "").replace(/\/$/, "");
      if (targetSlug.startsWith("categorie/")) continue;

      const target = posts.get(targetSlug);
      if (!target) {
        fail(`content/blog/${post.file}`, `lien vers un article inexistant : ${link}`);
      } else if (target.date > post.date && target.date > todayIso) {
        // Entre deux articles déjà parus, l'ordre des dates n'a plus d'effet :
        // les deux sont visibles. Le problème ne se pose que lorsque la cible
        // est encore à venir au moment où l'article source est, lui, visible.
        fail(
          `content/blog/${post.file}`,
          `lien vers « ${targetSlug} », qui ne paraît que le ${target.date} ` +
            `alors que cet article est visible dès le ${post.date} : le lien ` +
            "serait mort dans l'intervalle.",
        );
      }
    }
  }
}

/* --- publishing rhythm --- */

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
if (fs.existsSync(CONTENT_DIR)) {
  const today = new Date().toISOString().slice(0, 10);
  const byDate = new Map();
  for (const file of fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const date = /^date:\s*"?(\d{4}-\d{2}-\d{2})"?/m.exec(raw)?.[1];
    if (!date || date <= today) continue;
    byDate.set(date, (byDate.get(date) ?? 0) + 1);
  }
  for (const [date, count] of byDate) {
    if (count > 2) {
      fail(
        "content/blog",
        `${count} articles programmés le ${date} — deux au maximum par jour.`,
      );
    }
  }
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log(`\nSEO — ${files.length} pages analysées dans out/\n`);

if (errors.length) {
  console.log(`✗ ${errors.length} erreur(s) bloquante(s) :`);
  for (const message of errors) console.log(`   ${message}`);
  console.log("");
}

if (debts.length) {
  console.log(
    `${STRICT ? "✗" : "!"} ${debts.length} point(s) de dette qualité${
      STRICT ? " (bloquants en mode strict)" : ""
    } :`,
  );
  for (const message of debts) console.log(`   ${message}`);
  console.log("");
}

if (!errors.length && !debts.length) {
  console.log("✓ Tous les contrôles passent.\n");
}

if (errors.length || (STRICT && debts.length)) process.exit(1);
