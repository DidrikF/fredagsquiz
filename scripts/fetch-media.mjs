/*
 * Pulls every question asset from Wikimedia Commons into public/media/ and
 * writes CREDITS.md. Images are downscaled to 1600 px wide; sound clips are
 * trimmed to eight seconds and loudness-normalised to broadcast level, because
 * the originals run 18-82 s and their levels span 27 dB.
 *
 *   node scripts/fetch-media.mjs
 *
 * Re-running is safe — it overwrites. Needs ffmpeg on PATH.
 */

import { execFile } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const run = promisify(execFile);
const OUT = 'public/media';
const TMP = 'public/media/.tmp';
const API = 'https://commons.wikimedia.org/w/api.php';
const UA = { 'User-Agent': 'fredagsquiz/1.0 (didrik.fleischer@gmail.com)' };
const THUMB_WIDTH = 1600;
const MAX_IMAGE_WIDTH = 1600;
const CLIP_SECONDS = 8;

const IMAGES = [
  ['aar-01-jarlsberg', 'Jarlsberg cheese.jpg'],
  ['aar-02-litago', 'Chocolate milk.JPG'],
  ['aar-03-tine', 'TineKartonger1995.jpg'],
  ['aar-04-grandiosa', 'Frozen Grandiosa Doublesalami.JPG'],
  ['aar-05-kvikklunsj', 'Kvikk Lunsj i snøen.jpg'],
  ['aar-06-potetgull', 'Chips - Best before seal; forever.jpg'],
  ['aar-07-elopak', '-2019-09-07 UHT milk and specialist milk, Coop, Cromer.JPG'],
  ['aar-09-nationaltheatret', 'People waiting at Nationaltheatret Station 1928.jpg'],
  ['aar-10-melkekartong', 'Q-Melk Skummet melk 1 liter melkekartong datomerking best før 2017-09 skimmed milk Norway 02.jpg'],

  ['pris-01-hytte', 'Red forest cabin hytte.jpg'],
  ['pris-02-traktor', 'Massey Ferguson 135 Diesel.jpg'],
  ['pris-03-bunad', 'Norwegian folk costume from Western Norway.jpg'],
  ['pris-04-spikertelt', 'Camping ^ caravan site, near A475 - geograph.org.uk - 7214615.jpg'],
  ['pris-05-melkerobot', 'Cow in milking robot 01.jpg'],
  ['pris-06-lenestol', 'Take a seat (Unsplash).jpg'],
  ['pris-07-sofa', 'Couch-furniture-living-room-sofa (24300293356).jpg'],
  ['pris-08-elghode', 'Moose head trophy Orroroo.jpg'],
  ['pris-09-mikrohus', 'Tiny house, Portland.jpg'],
  ['pris-10-kvige', 'Red Dexter Heffer.jpg'],
];

const CLIPS = [
  ['lyd-01-handmelking', 'WWS Handmilking.ogg'],
  ['lyd-02-bagasjeband', 'WWS Luggagebeltinwaitinghall.ogg'],
  ['lyd-03-melkemaskin', 'WWS Milkingunit.ogg'],
  ['lyd-04-rulletrapp', 'WWS Escalator.ogg'],
  ['lyd-05-oppskjaermaskin', 'WWS Meatslicer.ogg'],
  ['lyd-06-batmotor', 'WWS Hotbulbengineexhaustpipe.ogg'],
  ['lyd-07-gulvvasker', 'WWS Automaticscrubberdrier.ogg'],
  ['lyd-08-eltemaskin', 'WWS Doughmixer.ogg'],
  ['lyd-09-kassaapparat', 'WWS Electroniccashregister.ogg'],
  ['lyd-10-vaskeanlegg', 'WWS MilkingMachineCleaningUnit.ogg'],
];

await mkdir(OUT, { recursive: true });
await mkdir(TMP, { recursive: true });

const credits = [];

for (const [name, title] of IMAGES) {
  const info = await imageInfo(title, THUMB_WIDTH);
  const url = info.thumburl ?? info.url;
  const raw = `${TMP}/${name}${extensionOf(url)}`;
  await download(url, raw);

  // Downscale and re-encode: Commons hands back more pixels than a phone on
  // conference wifi wants to wait for.
  await run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', raw,
    '-vf', `scale='min(${MAX_IMAGE_WIDTH},iw)':-2`, '-q:v', '4',
    `${OUT}/${name}.jpg`,
  ]);

  credits.push({ file: `${name}.jpg`, ...describe(title, info) });
  console.log(`image  ${name}.jpg`);
  await sleep(700);
}

for (const [name, title] of CLIPS) {
  const info = await imageInfo(title);
  const raw = `${TMP}/${name}.ogg`;
  await download(info.url, raw);

  const duration = Number(
    (await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', raw]))
      .stdout,
  );
  // Skip the opening — recordings tend to start with handling noise — but
  // never run past the end of a short clip.
  const start = Math.max(1, Math.min(duration * 0.25, duration - CLIP_SECONDS - 1));

  await run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', start.toFixed(2), '-t', String(CLIP_SECONDS), '-i', raw,
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
    '-b:a', '160k', `${OUT}/${name}.mp3`,
  ]);

  credits.push({ file: `${name}.mp3`, ...describe(title, info), edit: `beskåret ${start.toFixed(0)}–${(start + CLIP_SECONDS).toFixed(0)} s, normalisert` });
  console.log(`clip   ${name}.mp3  (fra ${duration.toFixed(0)} s)`);
  await sleep(700);
}

await rm(TMP, { recursive: true, force: true });
await writeFile(`${OUT}/CREDITS.md`, renderCredits(credits));
console.log(`\n${credits.length} filer i ${OUT}/ — se CREDITS.md`);

async function imageInfo(title, thumbWidth) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
    titles: `File:${title}`,
  });
  if (thumbWidth) params.set('iiurlwidth', String(thumbWidth));

  const response = await fetch(`${API}?${params}`, { headers: UA });
  const pages = Object.values((await response.json()).query.pages);
  const info = pages[0]?.imageinfo?.[0];
  if (!info) throw new Error(`Commons has no file named "${title}"`);
  return info;
}

async function download(url, path) {
  const response = await fetch(url, { headers: UA });
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  await writeFile(path, Buffer.from(await response.arrayBuffer()));
}

function describe(title, info) {
  const meta = info.extmetadata ?? {};
  return {
    title,
    author: plain(meta.Artist) || 'ukjent',
    licence: plain(meta.LicenseShortName) || 'ukjent',
    page: info.descriptionurl ?? `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title)}`,
  };
}

function renderCredits(entries) {
  const rows = entries
    .map((e) => `| \`${e.file}\` | [${e.title}](${e.page}) | ${e.author} | ${e.licence} | ${e.edit ?? '—'} |`)
    .join('\n');
  return `# Mediekreditering

Alle filer er hentet fra Wikimedia Commons med \`scripts/fetch-media.mjs\`.
CC BY og CC BY-SA krever kreditering ved bruk — denne lista er kilden.

Lydklippene er fra **Work With Sounds** (Werstas m.fl.), et EU-prosjekt som
dokumenterte arbeidslyder som holder på å forsvinne.

| Fil | Original | Opphavsperson | Lisens | Bearbeiding |
| --- | --- | --- | --- | --- |
${rows}
`;
}

function plain(field) {
  // Commons packs markup and stray newlines into these fields; a table row
  // needs one clean line.
  return field
    ? String(field.value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').replace(/\|/g, '/').trim().slice(0, 120)
    : '';
}

function extensionOf(url) {
  const match = /\.(jpe?g|png|gif|webp)(?:$|\?)/i.exec(url);
  return match ? `.${match[1].toLowerCase()}` : '.jpg';
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
