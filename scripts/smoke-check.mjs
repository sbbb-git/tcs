#!/usr/bin/env node
/**
 * Vérification post-déploiement, sur le site RÉELLEMENT SERVI.
 *
 * Le contrôle SEO (`seo:check`) inspecte le HTML produit localement. Certaines
 * choses ne se voient qu'en ligne : un hébergeur peut préfixer le robots.txt de
 * son propre bloc, une réécriture de lien peut casser les adresses e-mail, un
 * fichier peut manquer à l'upload. C'est ce que couvre ce script.
 *
 *   node scripts/smoke-check.mjs https://talentcaresante.fr
 */
const base = (process.argv[2] || "https://talentcaresante.fr").replace(/\/$/, "");

const errors = [];
const notes = [];

/**
 * Un déploiement fraîchement publié met quelques secondes à se propager, et le
 * CDN peut encore servir la version précédente. Le paramètre de contournement
 * force une réponse fraîche : sans lui, le contrôle valide parfois le contenu
 * d'avant le déploiement. La requête passe par la même chaîne de traitement,
 * les transformations de l'hébergeur restent donc visibles.
 */
async function fetchWithRetry(url, { attempts = 6, delayMs = 5000 } = {}) {
  let last;
  const bust = `_cb=${Date.now().toString(36)}`;
  const fresh = url.includes("?") ? `${url}&${bust}` : `${url}?${bust}`;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(fresh, {
        redirect: "follow",
        headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
      });
      if (res.status < 500) return res;
      last = new Error(`HTTP ${res.status}`);
    } catch (err) {
      last = err;
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayMs));
  }
  throw last;
}

const PAGES = [
  "/",
  "/blog/",
  "/mentions-legales/",
  "/confidentialite/",
  "/sitemap.xml",
  "/robots.txt",
  "/feed.xml",
  "/og/default.png",
];

console.log(`Vérification de ${base}\n`);

/* --- les pages répondent --- */
for (const path of PAGES) {
  try {
    const res = await fetchWithRetry(base + path);
    if (res.status !== 200) errors.push(`${path} répond ${res.status} au lieu de 200.`);
    else console.log(`  200  ${path}`);
  } catch (err) {
    errors.push(`${path} injoignable : ${err.message}`);
  }
}

/* --- une URL inexistante répond bien 404 --- */
try {
  const res = await fetchWithRetry(`${base}/cette-page-nexiste-pas/`);
  if (res.status !== 404) {
    errors.push(`Une URL inexistante répond ${res.status} au lieu de 404.`);
  } else {
    console.log("  404  (URL inexistante, comme attendu)");
  }
} catch (err) {
  errors.push(`Test 404 impossible : ${err.message}`);
}

/* --- la page d'accueil déclare la bonne URL canonique --- */
try {
  const html = await (await fetchWithRetry(base + "/")).text();
  const canonical = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/.exec(html)?.[1];
  if (!canonical) errors.push("Aucune URL canonique sur la page d'accueil.");
  else if (!canonical.startsWith(base)) {
    errors.push(`URL canonique incohérente : ${canonical} (attendu sous ${base}).`);
  } else {
    console.log(`  canonique : ${canonical}`);
  }

  // Certains hébergeurs réécrivent les liens mailto: vers une URL technique
  // qui renvoie 404 aux robots. Le lien doit rester un vrai mailto:.
  if (/\/cdn-cgi\/l\/email-protection/.test(html)) {
    errors.push(
      "Les adresses e-mail sont obfusquées par l'hébergeur : les liens mailto: " +
        "renvoient 404 aux robots. Désactiver Scrape Shield > Email Address Obfuscation.",
    );
  }
} catch (err) {
  errors.push(`Analyse de la page d'accueil impossible : ${err.message}`);
}

/* --- le robots.txt servi ne se contredit pas --- */
try {
  const txt = await (await fetchWithRetry(base + "/robots.txt")).text();

  // Regroupe les directives par agent, tous groupes confondus.
  const perAgent = new Map();
  let current = [];
  for (const raw of txt.split("\n")) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const [key, ...rest] = line.split(":");
    const field = key.trim().toLowerCase();
    const value = rest.join(":").trim();

    if (field === "user-agent") {
      current = current.length && current.at(-1).fresh ? current : [];
      current.push({ agent: value.toLowerCase(), fresh: true });
      if (!perAgent.has(value.toLowerCase())) perAgent.set(value.toLowerCase(), new Set());
    } else if (field === "allow" || field === "disallow") {
      for (const entry of current) {
        entry.fresh = false;
        perAgent.get(entry.agent).add(`${field} ${value}`);
      }
    }
  }

  for (const [agent, directives] of perAgent) {
    if (directives.has("allow /") && directives.has("disallow /")) {
      errors.push(
        `robots.txt : « ${agent} » est à la fois autorisé et interdit sur / — ` +
          "deux groupes contradictoires, comportement indéfini selon le robot.",
      );
    }
  }

  if (/BEGIN Cloudflare Managed content/i.test(txt)) {
    notes.push(
      "robots.txt : l'hébergeur ajoute un bloc « Cloudflare Managed content » " +
        "qui bloque les robots d'entraînement. C'est volontaire ; il se règle " +
        "dans Cloudflare (AI Crawl Control), pas dans le dépôt.",
    );
  }

  if (!/sitemap:/i.test(txt)) errors.push("robots.txt : la ligne Sitemap est absente.");
  else console.log("  robots.txt : sitemap déclaré, aucun agent contradictoire");
} catch (err) {
  errors.push(`Analyse du robots.txt impossible : ${err.message}`);
}

/* --- la clé IndexNow est bien servie --- */

/*
 * IndexNow valide la propriété du domaine en lisant ce fichier. S'il n'est pas
 * servi, chaque soumission est refusée par un 403 — code qui signifie « clé
 * invalide » et non « trop de requêtes », d'où des heures perdues à chercher
 * une limite de débit qui n'existe pas.
 */
try {
  const siteTs = await import("node:fs").then((fs) =>
    fs.readFileSync("src/lib/site.ts", "utf8"),
  );
  const key = /indexNowKey:\s*"([^"]+)"/.exec(siteTs)?.[1];

  if (key) {
    const res = await fetchWithRetry(`${base}/${key}.txt`);
    const body = (await res.text()).trim();
    if (res.status !== 200) {
      errors.push(`Clé IndexNow non servie : /${key}.txt répond ${res.status}.`);
    } else if (body !== key) {
      errors.push(
        `Le fichier /${key}.txt ne contient pas la clé attendue — toute ` +
          "soumission IndexNow sera refusée.",
      );
    } else {
      console.log(`  clé IndexNow servie et conforme`);
    }
  }
} catch (err) {
  errors.push(`Vérification de la clé IndexNow impossible : ${err.message}`);
}

/* --- le sitemap pointe vers le bon domaine --- */
try {
  const xml = await (await fetchWithRetry(base + "/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) errors.push("sitemap.xml : aucune URL.");
  else {
    const foreign = locs.filter((u) => !u.startsWith(base));
    if (foreign.length) {
      errors.push(`sitemap.xml : ${foreign.length} URL hors de ${base} (ex. ${foreign[0]}).`);
    } else {
      console.log(`  sitemap.xml : ${locs.length} URL, toutes sous ${base}`);
    }
  }
} catch (err) {
  errors.push(`Analyse du sitemap impossible : ${err.message}`);
}

/* --- rapport --- */
console.log("");
for (const note of notes) console.log(`!  ${note}`);
if (notes.length) console.log("");

if (errors.length) {
  console.log(`✗ ${errors.length} problème(s) sur le site en ligne :`);
  for (const e of errors) console.log(`   ${e}`);
  process.exit(1);
}

console.log("✓ Le site en ligne répond correctement.");
