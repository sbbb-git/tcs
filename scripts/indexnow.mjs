#!/usr/bin/env node
/**
 * Signale à IndexNow les pages parues ou mises à jour aujourd'hui.
 *
 * IndexNow prévient les moteurs participants — Bing, Yandex, Seznam, Naver —
 * qu'une URL a changé, au lieu d'attendre leur prochain passage. Google n'y
 * participe pas : pour lui, c'est Search Console et le sitemap qui comptent.
 *
 * Le script ne soumet QUE ce qui a changé le jour même. Renvoyer tout le site à
 * chaque déploiement noierait le signal et n'apporterait rien : le protocole est
 * conçu pour dire « cette page-là a changé », pas « voici mon plan de site ».
 *
 *   node scripts/indexnow.mjs [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");
const ENDPOINT = "https://api.indexnow.org/indexnow";

const SITE_TS = fs.readFileSync(path.join(process.cwd(), "src/lib/site.ts"), "utf8");
const url = /url:\s*"([^"]+)"/.exec(SITE_TS)?.[1];
const key = /indexNowKey:\s*"([^"]+)"/.exec(SITE_TS)?.[1];

if (!url || !key) {
  console.error("URL du site ou clé IndexNow introuvable dans src/lib/site.ts.");
  process.exit(1);
}

const host = new URL(url).host;
const base = url.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

/** Reprend la normalisation de slugify() pour retrouver l'URL d'une catégorie. */
function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const fresh = [];
const categories = new Set();

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const date = /^date:\s*"?(\d{4}-\d{2}-\d{2})/m.exec(raw)?.[1];
  const updated = /^updated:\s*"?(\d{4}-\d{2}-\d{2})/m.exec(raw)?.[1];
  const category = /^category:\s*"([^"]+)"/m.exec(raw)?.[1];
  const draft = /^draft:\s*true/m.test(raw);

  if (draft) continue;
  if (date !== today && updated !== today) continue;

  fresh.push(`${base}/blog/${file.replace(/\.mdx$/, "")}/`);
  if (category) categories.add(`${base}/blog/categorie/${slugify(category)}/`);
}

if (fresh.length === 0) {
  console.log("Aucune page parue ou modifiée aujourd'hui — rien à soumettre.");
  process.exit(0);
}

// Les pages qui listent les articles changent aussi quand un article paraît.
const urlList = [...new Set([...fresh, ...categories, `${base}/`, `${base}/blog/`])];

console.log(`${fresh.length} article(s) du jour, ${urlList.length} URL à soumettre :`);
for (const u of urlList) console.log(`   ${u}`);

if (DRY_RUN) {
  console.log("\n--dry-run : rien n'a été envoyé.");
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${base}/${key}.txt`,
    urlList,
  }),
});

const explain = {
  200: "Accepté.",
  202: "Accepté ; la clé est en cours de validation.",
  400: "Requête mal formée.",
  403: "Clé refusée. Elle doit être générée par Bing Webmaster Tools et servie à l'adresse déclarée — ce code ne signifie PAS « trop de requêtes ».",
  422: "Des URL n'appartiennent pas au domaine déclaré, ou la clé ne correspond pas.",
  429: "Trop de soumissions.",
};

console.log(`\nIndexNow : ${response.status} — ${explain[response.status] ?? "réponse inattendue."}`);

// 200 et 202 sont deux succès ; tout le reste doit être visible.
if (response.status !== 200 && response.status !== 202) {
  const body = await response.text().catch(() => "");
  if (body) console.log(body.slice(0, 400));
  process.exit(1);
}
