# Fredagsquizen

One page, one URL, shared in Slack. Every colleague opens it on their own
device and plays at their own pace; the host opens the same URL and unlocks
presenter mode with a reveal code. Nothing is transmitted between devices —
the only shared state is the host's voice and the projector.

Three round types are mixed in one run: **guess the year** (photo, scored by
distance), **guess the price** (photo, scored by percentage error) and **guess
the sound** (clip played out loud in the room, four options, right or wrong).

Static site, no backend, no accounts. Interface language is Norwegian bokmål;
code and documentation are in English.

## Running it

```bash
npm install
npm run dev
```

`npm run build` type-checks and writes `dist/`. `npm run preview` serves that
build locally.

## How a Friday goes

1. Someone drops the URL in Slack. Everyone opens it, types a first name and
   starts. They answer nine questions and get **no feedback of any kind** —
   the whole point is that nobody knows how they did until the end.
2. The host opens the same URL, taps *Er du programleder?*, enters the reveal
   code and starts the presentation. The host does not answer and is not
   scored.
3. The host walks the room through the questions: reads the prompt, plays the
   sound clips as many times as the room asks for, then pushes *Vis fasiten på
   storskjerm* when everyone has landed.
4. After the last question the host gets the reveal code at display size and
   reads it aloud. Everyone types it into their waiting screen and the results
   open across the room at once.

Answers live in `localStorage` on each device, so a reload — or a phone that
locked itself during question six — lands exactly where it left off.

## Authoring the quiz

Everything is in [`src/data/questions.ts`](src/data/questions.ts).

**Right now it holds 30 candidates** — ten of each kind, alternating year →
price → sound — so the whole set can be played through on a screen before the
final nine are chosen. Delete the ones you don't want and everything follows:
the maximum score is `questions.length × 100`, and the progress label, emoji
strip and Slack summary all recount themselves. The research behind each
candidate, with sources and verification status, is in
[`docs/kandidater.md`](docs/kandidater.md).

```ts
{ kind: 'year',  prompt, photoHint, photo?, min, max, answer, note, source? }
{ kind: 'price', prompt, photoHint, photo?, unitLabel, answer, note, source? }
{ kind: 'sound', prompt, clipName, clip?, options[4], answer /* index */, note, source? }
```

- `min` / `max` bound the year slider for that question only.
- `unitLabel` is the price clarifier next to the field: *per kilo*, *per
  stykk*, *hele fisken*.
- `photoHint` is the figure caption, and doubles as the question's label on the
  results cards.
- `note` is the one line read aloud at reveal. `source` is optional and shows
  as a link on the reveal screen and the results card.

Media goes in [`public/media/`](public/media/) and is referenced by file name. A
question without a file still works: the photo becomes a placeholder block and
the play button simulates a three second clip.

Every asset currently in the repo came from Wikimedia Commons via
[`scripts/fetch-media.mjs`](scripts/fetch-media.mjs), which downloads them,
downscales the photos, trims each clip to eight seconds, loudness-normalises it
to broadcast level and converts it to mp3 — the originals run 18–82 seconds and
their levels span 27 dB, which would have made half of them inaudible in a room.
Re-run it any time with `node scripts/fetch-media.mjs` (needs ffmpeg).

Attribution for every file is in
[`public/media/CREDITS.md`](public/media/CREDITS.md). Several are CC BY or
CC BY-SA, which require credit where the work is used — put the line from that
file on a closing slide or in the Slack thread.

Two things to know about the photos on the **price** rounds: they are
illustrasjonsfoto, not the sellers' own pictures, because FINN listing photos
belong to the sellers and this site is public. Each caption says so. If you'd
rather show the real listing photos, keep the page off the public web.

Every interface string lives in [`src/copy.ts`](src/copy.ts), so translating
the quiz means editing one document.

## Scoring

| Round | Formula | Zero at |
| --- | --- | --- |
| Year | `clamp(100 − \|guess − answer\| × 5, 0, 100)` | 20 years off |
| Price | `clamp(round(100 × (1 − err / 0.6)), 0, 100)` where `err = \|guess − answer\| / answer` | 60 % error |
| Sound | 100 if the index matches, else 0 | any wrong option |

Unanswered questions score 0. The formulas are never shown to players — the
results page communicates closeness geometrically, with the guess above the
line, the truth below it, and the distance stated in words.

## Configuration

| Setting | Default | Effect |
| --- | --- | --- |
| `VITE_REVEAL_CODE` | `lutefisk` | The shared secret for presenter mode and the results unlock. Compared case-insensitively after trimming. |
| `VITE_SLACK_SUMMARY` | `true` | Set to `false` to hide the copyable summary block on the results screen. |

Set them in a `.env.local` file for local runs, or edit the defaults in
[`src/config.ts`](src/config.ts). Pick a code that is easy to shout across a
lit, noisy room.

The reveal code is a party trick, not a security boundary: it ships in the
JavaScript bundle, so anyone determined to read it can. It exists to keep the
room in sync, and that is all it needs to do.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to
`main`. Enable it once under **Settings → Pages → Source → GitHub Actions**.

The build uses a relative base path, so it works from a project page
(`user.github.io/repo/`), a user page, or any subfolder without further
configuration. To change the reveal code without touching the code, add a
repository secret named `REVEAL_CODE`.

## Notes

- Works at 375 px in one hand and at projector scale in the reveal overlay.
  Nothing depends on hover.
- Right, wrong and "how close" are always carried by text and shape as well as
  colour. Reduced motion is respected.
- Not in this version: live leaderboard, sync between devices, accounts,
  in-app authoring, round types beyond the three.

Built from the design and spec in
[`Fredagsquiz.dc.html`](https://claude.ai/design/p/33fe6d12-b534-402b-bcd2-4d5d9ed76673).
The design system tokens in `src/styles/design-system.css` are vendored from
that project — retune the look there.
