/*
 * Screenshots the real FINN listings behind the price questions, with every
 * monetary figure redacted, into public/media/.
 *
 *   node scripts/capture-ads.mjs
 *
 * The listings are other people's ads and the photos are the sellers'. This is
 * for an internal quiz that comes down straight afterwards — see README.md
 * before leaving these on a public URL.
 *
 * Two things make this harder than it looks, and both silently produced
 * screenshots with the answer printed on them before they were fixed:
 *
 *  1. FINN hydrates after load, so a single redaction pass races the render.
 *     The DOM pass here is installed before any page script and re-applies on
 *     every mutation.
 *  2. On the Torget pages the price sits inside a shadow root, where
 *     `innerText` and a TreeWalker cannot see it — a DOM-only pass reports
 *     success while the price is plainly visible. Playwright's locators do
 *     pierce shadow DOM, so anything the DOM pass misses is masked at the
 *     pixel level when the screenshot is taken.
 *
 * The result is verified after the shutter: every money-shaped element still on
 * the page must be covered by a mask, or the run fails.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/didrikf/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core');

const CHROME =
  '/Users/didrikf/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const OUT = 'public/media';
// 4:3 — the participant's photo block. The presenter's 16:9 crop takes a slice
// of the middle, so the title and price bar need to sit near the centre.
const VIEWPORT = { width: 1100, height: 825 };
const MASK_COLOUR = '#201e1d';

/** Digits tied to "kr" or a ",-" suffix. Model years and m² must not match. */
const MONEY_SOURCE = '(?:kr\\.?\\s*\\d[\\d\\s\\u00a0.,]*)|(?:\\d[\\d\\s\\u00a0.]*\\s*(?:kr\\b|,-))';
const MONEY = new RegExp(MONEY_SOURCE, 'i');

const ADS = [
  ['pris-02-traktor', 'https://www.finn.no/mobility/item/472181593'],
  ['pris-04-spikertelt', 'https://www.finn.no/recommerce/forsale/item/464066904'],
  ['pris-05-melkerobot', 'https://www.finn.no/recommerce/forsale/item/472064426'],
  ['pris-08-elghode', 'https://www.finn.no/recommerce/forsale/item/466295748'],
  ['pris-09-mikrohus', 'https://www.finn.no/recommerce/forsale/item/410676404'],
  ['pris-10-kvige', 'https://www.finn.no/recommerce/forsale/item/364986784'],
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME });
const context = await browser.newContext({ viewport: VIEWPORT, locale: 'nb-NO' });
await context.addInitScript(installRedactor, MONEY_SOURCE);

const page = await context.newPage();
const failures = [];

for (const [name, url] of ADS) {
  await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(3000);

  const prep = await page.evaluate(tidy);
  await page.waitForTimeout(1200);

  const targets = await moneyTargets(page);
  await page.screenshot({
    path: `${OUT}/${name}.jpg`,
    type: 'jpeg',
    quality: 88,
    mask: targets.map((t) => t.locator),
    maskColor: MASK_COLOUR,
  });

  // Anything money-shaped that is not under a mask would be readable.
  const leftovers = (await moneyTargets(page)).filter(
    (t) => !targets.some((m) => covers(m.box, t.box)),
  );
  if (leftovers.length) {
    failures.push(`${name}: ${leftovers.map((l) => l.text).slice(0, 3).join(' | ')}`);
  }

  console.log(
    `${name.padEnd(20)} dom:${String(prep.redacted).padStart(3)}  maskert:${String(targets.length).padStart(2)}  samtykke:${prep.consent}  ${
      leftovers.length ? `LEKKASJE ${leftovers.map((l) => l.text).slice(0, 2).join(' | ')}` : 'ren'
    }`,
  );
}

await browser.close();
await writeFile(`${OUT}/ADS.md`, renderNotes());

if (failures.length) {
  console.error(`\n${failures.length} annonse(r) lekker pris:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`\n${ADS.length} annonser lagret i ${OUT}/ — verifisert uten synlig pris.`);

/**
 * Every visible element whose own text states a sum. Uses Playwright's text
 * engine because it reaches into shadow roots; drops any element that merely
 * contains another match, so masks stay tight instead of blacking out a column.
 */
async function moneyTargets(page) {
  const found = [];
  for (const locator of await page.getByText(MONEY).all()) {
    const box = await locator.boundingBox().catch(() => null);
    if (!box || box.width === 0 || box.height === 0) continue;
    if (box.y > VIEWPORT.height || box.x > VIEWPORT.width) continue;
    // A match the size of the page is a container, not a price.
    if (box.width * box.height > VIEWPORT.width * VIEWPORT.height * 0.3) continue;
    const text = (await locator.innerText().catch(() => ''))?.trim().slice(0, 40) ?? '';
    found.push({ locator, box, text });
  }
  return found.filter((a) => !found.some((b) => b !== a && covers(a.box, b.box) && area(b.box) < area(a.box)));
}

function area(box) {
  return box.width * box.height;
}

function covers(outer, inner) {
  const pad = 2;
  return (
    inner.x >= outer.x - pad &&
    inner.y >= outer.y - pad &&
    inner.x + inner.width <= outer.x + outer.width + pad &&
    inner.y + inner.height <= outer.y + outer.height + pad
  );
}

/**
 * Injected before any page script: redacts money in the light DOM on every
 * mutation, keeping the surrounding words. Shadow roots are handled by masking.
 */
function installRedactor(moneySource) {
  const BLOCK = '█████';
  const matches = (value) => new RegExp(moneySource, 'i').test(value);

  const sweep = () => {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const doomed = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeValue && !node.nodeValue.includes(BLOCK) && matches(node.nodeValue)) {
        doomed.push(node);
      }
    }
    doomed.forEach((node) => {
      const replaced = node.nodeValue.replace(new RegExp(moneySource, 'gi'), BLOCK);
      node.nodeValue = replaced;
      const el = node.parentElement;
      if (el && replaced.trim() === BLOCK) {
        el.style.background = '#201e1d';
        el.style.color = '#201e1d';
        el.style.borderRadius = '6px';
        el.style.padding = '0 10px';
      }
      window.__fqRedacted = (window.__fqRedacted || 0) + 1;
    });
  };

  const start = () => {
    if (!document.body) return;
    sweep();
    new MutationObserver(sweep).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  };

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
}

/** Declines tracking, hides furniture, and caps the gallery so the title fits. */
function tidy() {
  let consent = 'ingen';
  const dialog = document.querySelector(
    '[id*="consent" i],[class*="consent" i],[id*="sp_message" i],dialog[open]',
  );
  if (dialog) {
    const reject = [...dialog.querySelectorAll('button,a')].find((b) =>
      /avvis|avslå|kun nødvendig|nødvendige|reject|necessary only/i.test(b.textContent || ''),
    );
    if (reject) {
      reject.click();
      consent = 'avvist';
    } else {
      dialog.style.display = 'none';
      consent = 'skjult';
    }
  }

  ['footer', '[class*="recommend" i]', '[data-testid*="recommend" i]', 'iframe',
   '[id*="banner" i]', '[class*="advert" i]'].forEach((sel) =>
    document.querySelectorAll(sel).forEach((el) => { el.style.display = 'none'; }),
  );

  // Frame on the headline rather than the top of the page: the galleries are
  // tall enough to fill the viewport on their own, which would leave the shot
  // showing a photo and nothing that identifies the ad.
  const visible = (h) => h.textContent.trim().length > 6 && h.getBoundingClientRect().height > 0;
  // h1 is the ad title on every FINN layout; h2 is a fallback that can pick up
  // a gallery caption, which frames the shot on a photo and nothing else.
  const heading =
    [...document.querySelectorAll('h1')].find(visible) ??
    [...document.querySelectorAll('h2')].find(visible);
  const headingTop = heading ? heading.getBoundingClientRect().top + window.scrollY : 0;
  window.scrollTo(0, Math.max(0, headingTop - 260));

  return { redacted: window.__fqRedacted || 0, consent, framedOn: heading?.textContent.trim().slice(0, 40) ?? null };
}

function renderNotes() {
  return `# Annonsebilder

Skjermbilder av de faktiske FINN-annonsene med alle pristall sladdet, tatt med
\`scripts/capture-ads.mjs\`. Skriptet verifiserer etter at bildet er tatt at
ingen pris er synlig, og feiler hvis noe lekker.

Bildene tilhører selgerne. De ligger her for en intern quiz og skal tas ned
etterpå — ikke la dem bli liggende på en offentlig URL.

${ADS.map(([n, u]) => `- \`${n}.jpg\` — ${u}`).join('\n')}
`;
}
