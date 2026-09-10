/**
 * Renders the social preview image and the logo as PNGs.
 *
 * They must be raster: social networks do not render an SVG og:image, and
 * schema.org expects a bitmap logo. Run with `npm run og` after a brand change;
 * the output is committed so the build itself needs no browser.
 */
import fs from "node:fs";
import path from "node:path";
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "Playwright n'est pas installé. Il ne l'est volontairement pas par défaut :\n" +
      "les PNG de public/og/ sont versionnés et ne se régénèrent qu'à un changement\n" +
      "de marque. Pour les refaire :\n\n  npm i -D playwright && npx playwright install chromium\n  npm run og\n",
  );
  process.exit(1);
}

const OUT = path.join(process.cwd(), "public", "og");
fs.mkdirSync(OUT, { recursive: true });

const PRIMARY = "#0284C5";
const ACCENT_DARK = "#046FA6";
const INK = "#0B2A3F";
const PAPER = "#F2F8FC";

const heart = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
</svg>`;

const shell = (body, css) => `<!doctype html><html><head><meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased}
  ${css}
</style></head><body>${body}</body></html>`;

const ogHtml = shell(
  `<div class="card">
     <div class="brand">
       <div class="mark">${heart}</div>
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
   .mark{width:76px;height:76px;border-radius:20px;background:linear-gradient(135deg,${ACCENT_DARK},${PRIMARY});color:#f0f9ff;display:flex;align-items:center;justify-content:center}
   .mark svg{width:40px;height:40px}
   h1{font-size:64px;line-height:1.12;font-weight:700;letter-spacing:-0.02em;max-width:20ch}
   h1 em{font-style:normal;color:${PRIMARY}}
   .foot{font-size:28px;color:#2B4E68;font-weight:400}`,
);

const logoHtml = shell(
  `<div class="mark">${heart}</div>`,
  `body{width:512px;height:512px;background:linear-gradient(135deg,${ACCENT_DARK},${PRIMARY});display:flex;align-items:center;justify-content:center}
   .mark{color:#f0f9ff;display:flex}
   .mark svg{width:288px;height:288px;stroke-width:2}`,
);

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

for (const [name, html, size] of [
  ["default.png", ogHtml, { width: 1200, height: 630 }],
  ["logo.png", logoHtml, { width: 512, height: 512 }],
]) {
  const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, name) });
  await page.close();
  console.log("✓", name, `${size.width}×${size.height}`);
}

await browser.close();
