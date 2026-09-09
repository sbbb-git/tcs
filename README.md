# TalentCare Santé

Site vitrine et blog de TalentCare Santé, cabinet de recrutement spécialisé
santé. Next.js exporté en statique, hébergé sur Cloudflare Pages.

**En ligne : https://talentcaresante.fr**

## Pourquoi cette base

La version précédente était une application React monopage : le serveur
renvoyait un HTML vide, tout le contenu était injecté par JavaScript, et le site
entier partageait un seul `<title>`. Aucune page d'article n'existait réellement
côté serveur.

Ici, chaque page est un fichier HTML produit au build, avec ses propres balises
`title`, `description`, `canonical`, ses données structurées et son image de
partage. Il n'y a pas de serveur applicatif : le formulaire de contact passe par
Formspree.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Génère le site statique dans `out/` |
| `npm run typecheck` | Vérification TypeScript seule |
| `npm run seo:check` | Contrôles SEO sur `out/` (voir plus bas) |
| `npm run seo:check:strict` | Idem, la dette qualité devient bloquante |
| `npm run smoke -- <url>` | Contrôles sur le site en ligne (défaut : la production) |
| `npm run verify` | `typecheck` + `build` + `seo:check` |
| `npm run og` | Régénère `public/og/*.png` (nécessite `npm i -D playwright`) |

## Écrire un article

Un fichier `.mdx` par article dans `content/blog/`. Le nom du fichier devient
l'URL : `content/blog/mon-article.mdx` → `/blog/mon-article/`.

```mdx
---
title: "Titre affiché et balise <title> — 60 caractères maximum"
description: "Meta description, entre 110 et 160 caractères."
excerpt: "Résumé affiché sur les cartes du blog."
date: "2026-06-15"
category: "Recrutement médical"
keywords:
  - "mot-clé principal"
  - "variante"
keyPoints:
  - "Point clé affiché en tête d'article."
  - "Trois à quatre suffisent."
---

Le corps de l'article, en Markdown.

## Un titre de section

Du texte, avec des [liens internes](/blog/autre-article/) et des liens vers des
sources officielles.
```

### Champs du frontmatter

| Champ | Obligatoire | Rôle |
|---|---|---|
| `title` | oui | Titre de la page et balise `<title>` |
| `description` | oui | Meta description et `og:description` |
| `excerpt` | oui | Résumé sur les cartes du blog |
| `date` | oui | Date de publication, format `AAAA-MM-JJ` |
| `category` | oui | Doit exister dans `src/lib/categories.ts` |
| `keywords` | non | Mots-clés visés |
| `keyPoints` | non | Encadré de synthèse en tête d'article |
| `updated` | non | Date de dernière mise à jour |
| `draft` | non | `true` exclut l'article du build |

Le temps de lecture est calculé automatiquement, et le sommaire est construit à
partir des titres `##` et `###`.

### Composants disponibles dans le MDX

```mdx
<Callout title="Bon à savoir">
Une remarque pratique.
</Callout>

<Callout type="warning" title="Point de vigilance">
Un avertissement.
</Callout>
```

> **Attention** — `next-mdx-remote` v6 n'évalue plus les expressions `{…}` dans
> le MDX : c'est le correctif de son avis de sécurité. Un attribut de la forme
> `<Composant items={[...]} />` est ignoré **silencieusement** et le composant
> reçoit `undefined`. Toute donnée structurée passe donc par le frontmatter.
> `npm run seo:check` rejette ce motif.

## Rythme de publication

Un article daté dans le futur **n'apparaît pas** dans le build : ni sur le blog,
ni dans le sitemap, ni dans le flux RSS. Il se publie tout seul le jour venu, à
condition qu'un build soit déclenché ce jour-là.

La reconstruction quotidienne est assurée par le workflow GitHub Actions
(`.github/workflows/deploy.yml`). Vous pouvez donc rédiger plusieurs articles
d'avance et les laisser sortir à leur rythme.

Une page par semaine est un bon rythme. Le contrôle SEO refuse plus de deux
articles programmés à la même date future : sur un domaine récent, une
publication groupée ressemble à de la génération de masse.

## Le contrôle SEO

`scripts/seo-check.mjs` s'exécute sur le HTML réellement produit dans `out/`, et
non sur les sources. Il sort en code non nul pour interrompre un déploiement.

**Erreurs bloquantes** — toujours :

- `<title>`, meta description, `og:image` ou URL canonique absente ;
- titre ou description en doublon entre deux pages ;
- nombre de `<h1>` différent de 1 ;
- `lang="fr"` absent ;
- page sans aucun lien interne sortant ;
- lien interne pointant vers une URL absente du build ;
- composant non rendu apparaissant en texte brut dans le HTML ;
- attribut MDX en expression `{…}` ;
- plus de deux articles programmés à la même date future.

**Dette qualité** — signalée, bloquante avec `--strict` :

- `<title>` de plus de 60 caractères ;
- meta description hors de la fenêtre 110–160 caractères ;
- page de contenu de moins de 350 mots réels ;
- champs légaux non renseignés dans `src/lib/legal.ts`.

Passez à `npm run seo:check:strict` dans la commande de build une fois la dette
résorbée. L'activer trop tôt ne ferait que bloquer la production.

## Déploiement — GitHub Actions vers Cloudflare Pages

Le projet Cloudflare Pages est de type **Direct Upload** : il n'a pas de
configuration de build côté Cloudflare. C'est GitHub Actions qui construit et
publie (`.github/workflows/deploy.yml`).

Le workflow se déclenche à chaque push sur `main`, tous les jours à 5h17 UTC, et
à la demande. Le build part du dépôt cloné par la CI, jamais d'un dossier
local : une page ne peut donc pas exister en production sans être versionnée.

Si les contrôles SEO échouent, rien n'est publié.

### Ce qu'il faut renseigner une fois

Dans le dépôt GitHub → **Settings → Secrets and variables → Actions** :

Onglet **Secrets** :

| Nom | Valeur |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token d'API avec la permission *Cloudflare Pages : Edit* |
| `CLOUDFLARE_ACCOUNT_ID` | Identifiant de compte Cloudflare |

Le nom du projet Pages est fixé dans le workflow (`PROJECT_NAME`,
`talentcaresante`). Il est créé automatiquement au premier déploiement s'il
n'existe pas encore.

Tant que l'un des deux secrets manque, le workflow s'arrête à la première étape
en le nommant, sans rien déployer.

### Publication différée

La reconstruction quotidienne est ce qui fait sortir les articles datés dans le
futur. Sans elle, un article programmé resterait invisible jusqu'au prochain
push.

### Ce que le déploiement vérifie en ligne

Après publication, `scripts/smoke-check.mjs` interroge le site réellement servi :
codes de réponse, 404 effectif, URL canonique, cohérence du sitemap, groupes
contradictoires dans le robots.txt, et réécriture des liens `mailto:` par
l'hébergeur. Le contrôle contourne le cache du CDN, sinon il validerait parfois
la version précédente.

C'est nécessaire parce que le fichier servi n'est pas celui du dépôt : Cloudflare
préfixe le `robots.txt` d'un bloc « Managed content » qui bloque les robots
d'entraînement (GPTBot, ClaudeBot, Google-Extended, CCBot…). Ce bloc est
volontaire et se règle dans Cloudflare (AI Crawl Control), pas ici. En
conséquence, `src/app/robots.ts` ne déclare que des robots de recherche et de
citation, qu'aucune règle managée ne bloque : redéclarer un agent déjà bloqué
créerait deux groupes contradictoires.

### À vérifier dans le tableau de bord Cloudflare

1. **Un seul hostname.** Choisissez `talentcaresante.fr` **ou**
   `www.talentcaresante.fr`, et redirigez l'autre en 301 par une Redirect Rule
   sur la zone. Deux hostnames servant le même site divisent les signaux et
   dupliquent chaque page dans les rapports. `src/lib/site.ts` déclare
   actuellement l'apex.
2. **Email Address Obfuscation** (Scrape Shield) — déjà désactivé. Activée,
   l'option réécrit les liens `mailto:` vers une URL technique qui renvoie 404
   aux robots, sur chaque page du site. Le contrôle en ligne la détecte si elle
   revient.
3. **Automatic HTTPS Rewrites** et redirection HTTP → HTTPS activées.

## État de la mise en ligne

Fait :

- [x] Projet Cloudflare Pages `talentcaresante` créé et déployé depuis la CI.
- [x] Domaine `talentcaresante.fr` rattaché au projet, enregistrement DNS posé.
- [x] Obfuscation d'e-mail Cloudflare désactivée — les liens `mailto:` sont de
      nouveau lisibles par les robots.
- [x] `robots.txt` aligné sur la politique managée de Cloudflare, sans groupe
      contradictoire.
- [x] Purge du CDN et vérification du site servi à chaque déploiement.

Reste à faire :

- [ ] Renseigner `src/lib/legal.ts` : raison sociale, forme juridique, adresse,
      SIREN, SIRET, directeur de la publication. Obligation légale (LCEN).
      Aucune de ces valeurs ne doit être approximée.
- [ ] Rediriger `www` vers l'apex. Le workflow `cloudflare-setup` sait le faire
      (entrée `setup_www`) mais le token doit porter la permission
      *Zone → Dynamic Redirect → Edit* ; sinon, la règle se pose à la main dans
      Rules > Redirect Rules. Sans urgence : `www` ne résout pas aujourd'hui,
      il n'y a donc pas de contenu servi en double.
- [ ] Créer la propriété Google Search Console et soumettre
      `https://talentcaresante.fr/sitemap.xml`.
- [ ] Créer le compte Bing Webmaster Tools et y soumettre le même sitemap.
- [ ] Générer la clé IndexNow **depuis Bing Webmaster Tools**. Une clé inventée
      renvoie un 403 permanent, qui signifie « clé invalide » et non « trop de
      requêtes ».
- [ ] Vérifier l'aperçu de partage sur LinkedIn et Facebook.

La variable GitHub `CLOUDFLARE_PROJECT_NAME` n'est plus lue : le nom du projet
est fixé dans le workflow. Elle peut être supprimée.

## Ce qui plafonne les résultats

Un domaine récent met plusieurs mois à être pris au sérieux, quelle que soit la
qualité du contenu. Et sans liens entrants depuis des sites reconnus du secteur,
la meilleure page plafonne.

Les sources naturelles sont identifiables : ordres et syndicats professionnels,
fédérations d'établissements, écoles et facultés, annuaires spécialisés,
partenaires commerciaux. Deux ou trois liens obtenus par échange de mails
rapportent davantage que le vingtième article. C'est un travail commercial, pas
technique, et il devrait démarrer le même jour que le site.

## Structure

```
content/blog/          Articles au format MDX
public/                Fichiers servis tels quels (og/, favicon, _headers, _redirects)
scripts/
  seo-check.mjs        Contrôles post-build
  generate-og.mjs      Génération des PNG de partage
src/
  app/                 Routes, sitemap, robots, flux RSS
  components/          Sections du site et primitives d'interface
  lib/
    blog.ts            Lecture des MDX, catégories, articles liés
    categories.ts      Taxonomie éditoriale
    legal.ts           Identité de l'éditeur (à compléter)
    seo.ts             Métadonnées et données structurées
    site.ts            Coordonnées, réseaux sociaux, partenaire
```
