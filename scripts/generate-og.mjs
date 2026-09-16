/**
 * Renders the social preview image, the schema.org logo and the Apple touch
 * icon as PNGs.
 *
 * They must be raster: social networks do not render an SVG og:image, iOS
 * ignores an SVG touch icon, and schema.org expects a bitmap logo. The marks
 * themselves are read from public/*.svg so this script never holds a second
 * copy of the drawing: change the SVG, run `npm run og`, and the three PNGs
 * follow. The output is committed so the build itself needs no browser.
 */
import fs from "node:fs";
import path from "node:path";
/* playwright-core suffit : on fournit toujours l'exécutable, donc le
 * téléchargement du navigateur qu'embarque `playwright` est inutile. */
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  try {
    ({ chromium } = await import("playwright-core"));
  } catch {}
}
if (!chromium) {
  console.error(
    "Playwright n'est pas installé. Il ne l'est volontairement pas par défaut :\n" +
      "les PNG de public/og/ sont versionnés et ne se régénèrent qu'à un changement\n" +
      "de marque. Pour les refaire :\n\n  npm i -D playwright && npx playwright install chromium\n  npm run og\n",
  );
  process.exit(1);
}

const OUT = path.join(process.cwd(), "public", "og");
fs.mkdirSync(OUT, { recursive: true });

const PRIMARY = "#2E5FBF";
const ACCENT_DARK = "#2A55AB";
const INK = "#0B2A3F";
const PAPER = "#F2F8FC";

const PUBLIC = path.join(process.cwd(), "public");
/* Les SVG portent une taille fixe pour l'usage direct dans une page ; ici
 * c'est le CSS qui dimensionne, donc on la retire. */
const marque = (fichier) =>
  fs
    .readFileSync(path.join(PUBLIC, fichier), "utf8")
    .replace(/ width="\d+" height="\d+"/, "");

const shell = (body, css) => `<!doctype html><html><head><meta charset="utf-8">
<style>
  /* Même pile que le site, qui ne charge aucune police distante : la carte
   * sociale doit ressembler aux pages, et un @import vers Google Fonts rendrait
   * le rendu dépendant du réseau de la machine qui lance le script. */
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Inter Variable',ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased}
  ${css}
</style></head><body>${body}</body></html>`;

const ogHtml = shell(
  `<div class="card">
     <div class="brand">
       <div class="mark">${marque("logo-mark.svg")}</div>
       <span>TalentCare <b>Santé</b></span>
     </div>
     <h1>Le trait d'union entre<br><em>talents médicaux</em><br>et établissements de santé</h1>
     <p class="foot">Cabinet de recrutement spécialisé santé · talentcaresante.fr</p>
     <div class="rule"></div>
   </div>`,
  `body{width:1200px;height:630px;background:${PAPER};color:${INK}}
   .card{width:100%;height:100%;padding:68px 80px 78px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
   .rule{position:absolute;left:0;right:0;bottom:0;height:14px;background:linear-gradient(90deg,${ACCENT_DARK},${PRIMARY})}
   .brand{display:flex;align-items:center;gap:18px;font-size:38px;font-weight:700}
   .brand b{color:${PRIMARY};font-weight:700}
   .mark{display:flex;align-items:center}
   .mark svg{height:64px;width:auto}
   h1{font-size:64px;line-height:1.12;font-weight:700;letter-spacing:-0.02em;max-width:20ch}
   h1 em{font-style:normal;color:${PRIMARY}}
   .foot{font-size:28px;color:#2B4E68;font-weight:400}`,
);

const logoHtml = shell(
  `<div class="mark">${marque("logo-mark.svg")}</div>`,
  `body{width:512px;height:512px;background:#fff;display:flex;align-items:center;justify-content:center}
   .mark{display:flex}
   .mark svg{width:400px;height:400px}`,
);

/* L'icône Apple ne tolère ni transparence ni marge : le fond encre du favicon
 * fait l'aplat, iOS arrondit les angles lui-même. */
const appleHtml = shell(
  marque("favicon.svg"),
  `body{width:180px;height:180px;display:flex}
   svg{width:180px;height:180px}`,
);

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

for (const [dest, html, size] of [
  [path.join(OUT, "default.png"), ogHtml, { width: 1200, height: 630 }],
  [path.join(OUT, "logo.png"), logoHtml, { width: 512, height: 512 }],
  [path.join(PUBLIC, "apple-touch-icon.png"), appleHtml, { width: 180, height: 180 }],
]) {
  const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: dest });
  await page.close();
  console.log("✓", path.relative(process.cwd(), dest), `${size.width}×${size.height}`);
}

await browser.close();
