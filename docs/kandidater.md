# Spørsmålskandidater — Fredagsquizen

Ten candidates per round type, researched August 2026. Each entry is shaped so
it can be pasted more or less straight into `src/data/questions.ts`.

**Verification key**

- ✅ — I opened the source page and read the number off it
- ⚠️ — read off a search-results list, not the item page. Open it before you commit
- 🔴 — known problem, read the note before using

---

## Before you pick

Four things that will bite you, found the hard way while researching this.

**FINN listings expire.** Every price below is from early August 2026. A private
listing can vanish in a week. Screenshot the photo now and re-check the price
the morning of the quiz — the `note` field is where you say "lå ute i august".

**FINN sellers use fake prices.** Several livestock listings show `123 kr` or
`1 234 kr` as a placeholder, meaning "ring meg". `Nrf kviger selges` at 123 kr is
not a 123 kr cow. Anything suspiciously round-and-silly is a dummy price.

**Watch the unit.** `Dexter kvige kalver selges — 15 000 kr` — is that one calf
or the lot? The `unitLabel` field exists for exactly this, but you have to read
the ad body to know what to put in it. An ambiguous unit makes the round unfair.

**The sound clips are `.ogg`.** Everything from Wikimedia Commons is Ogg Vorbis.
Chrome, Edge and Firefox play it; Safari is unreliable, and the presenter may
well be on a Mac. Convert before Friday:

```bash
for f in public/media/*.ogg; do ffmpeg -i "$f" -b:a 160k "${f%.ogg}.mp3"; done
```

---

## Gjett året — 10 kandidater

Two formats work in this app. **A: "Når ble dette lansert?"** with a photo of the
product — easy to source, easy to verify, and the roast writes itself. **B: "Når
ble dette bildet tatt?"** with a dated archive photo — closer to the original
design, but you need a photo with a trustworthy date.

### 1. Jarlsberg ✅ — 1956

Format A. `min: 1930, max: 1990`
Norway's biggest cheese export, developed at NLH in Ås.

> **note:** «1956. Utviklet på Ås, oppkalt etter en ost som døde ut i 1916, og i dag den mest solgte utenlandske osten i USA.»
> **Bilde:** Tine's own product shot, or [Jarlsberg_cheese.jpg](https://upload.wikimedia.org/wikipedia/commons/3/36/Jarlsberg_cheese.jpg) (CC BY-SA 3.0)
> **Kilde:** [snl.no/jarlsberg_-_ost](https://snl.no/jarlsberg_-_ost) · [tine.no](https://www.tine.no/om-tine/merkevareleverand%C3%B8ren/jarlsberg-v%C3%A5r-st%C3%B8rste-eksportartikkel)

### 2. Litago ✅ — 1994

Format A. `min: 1970, max: 2010`
Everyone in the room thinks Litago is older than they are. It is younger than
most of them.

> **note:** «1994. Lansert som et barnekonsept — så viste det seg at det for det meste var ungdom og voksne som drakk det.»
> **Bilde:** Tine's own product shot
> **Kilde:** [tine.no — Historien om Litago](https://www.tine.no/merkevarer/litago/artikler/historien-om-litago)

### 3. Navnet TINE ✅ — 1992

Format A. `min: 1960, max: 2005`
A house question with a built-in trap: the *logo* has been in use since 1973, the
*name* only since summer 1992. State the question precisely — "når ble TINE tatt
i bruk som navn på meierisamvirket?" — and the 1973 fact becomes the reveal.

> **note:** «Sommeren 1992. Logoen hadde vært i bruk siden 1973, men navnet på selve samvirket kom først i 92.»
> **Kilde:** [snl.no/Tine_-_næringsmiddelkonsern](https://snl.no/Tine_-_n%C3%A6ringsmiddelkonsern)

### 4. Grandiosa ✅ — 1980

Format A. `min: 1960, max: 2000`

> **note:** «1980. Norges mest spiste pizza siden, og fortsatt gjenstand for uenighet om hvorvidt den skal ha ekstra ost.»
> **Bilde:** [Frozen_Grandiosa_Doublesalami.JPG](https://upload.wikimedia.org/wikipedia/commons/0/00/Frozen_Grandiosa_Doublesalami.JPG) (CC BY-SA 3.0)
> **Kilde:** [grandiosa.no/om-grandiosa/tidslinje](https://www.grandiosa.no/om-grandiosa/tidslinje/)

### 5. Kvikk Lunsj ✅ — 1937

Format A. `min: 1920, max: 1975`
Older than most guess, and the påskefjell connection makes it feel timeless.

> **note:** «1937. Fire år etter den britiske fetteren, og med turregler på papiret siden.»
> **Bilde:** [Kvikk_Lunsj_i_snøen.jpg](https://upload.wikimedia.org/wikipedia/commons/4/43/Kvikk_Lunsj_i_sn%C3%B8en.jpg) (CC BY 2.0)
> **Kilde:** [en.wikipedia.org/wiki/Kvikk_Lunsj](https://en.wikipedia.org/wiki/Kvikk_Lunsj)

### 6. Potetgull ✅ — 1936

Format A. `min: 1920, max: 1980`
"Potetgull" is a Maarud trademark, not a generic word — good reveal material.

> **note:** «1936. Og «potetgull» er ikke et vanlig norsk ord, det er Maaruds varemerke. Resten heter chips.»
> **Kilde:** [en.wikipedia.org/wiki/Maarud](https://en.wikipedia.org/wiki/Maarud)

### 7. Elopak ✅ — 1957

Format A. `min: 1935, max: 1985`
The Norwegian company behind the carton the milk goes in. Very on-brand, and
nobody knows this one.

> **note:** «1957. Norsk selskap, amerikansk lisens — Pure-Pak, patentert helt tilbake i 1915. Melka di ligger i en 70 år gammel idé.»
> **Kilde:** [snl.no/Elopak_ASA](https://snl.no/Elopak_ASA)

### 8. Norsk Gouda på Nittedal Meieri ✅ — 1859

Format A. `min: 1820, max: 1920`
The cheese that eventually became Norvegia. Taught to Norwegians by the Dutch.

> **note:** «1859, på Nittedal Meieri. Hollenderne lærte oss det, men fettinnholdet holdt ikke hollandsk mål — derfor heter den Norvegia og ikke gouda.»
> **Kilde:** [tine.no — Historien om Norvegia](https://www.tine.no/merkevarer/norvegia/artikler/historien-om-norvegia) · [snl.no/norvegia](https://snl.no/norvegia)
> 🔴 Ask about the *production start*, not about when it was renamed Norvegia — the sources only say "på 1950-tallet" for the renaming, which is too vague to score.

### 9. Nationaltheatret stasjon ✅ — 1928

Format B — a genuinely dated archive photo. `min: 1900, max: 1960`
People waiting on the platform. Public domain, from Galleri NOR / Nasjonalbiblioteket.

> **note:** «1928. Se på hattene. Alle har hatt.»
> **Bilde:** [People_waiting_at_Nationaltheatret_Station_1928.jpg](https://upload.wikimedia.org/wikipedia/commons/6/68/People_waiting_at_Nationaltheatret_Station_1928.jpg) (public domain)

### 10. Melkekartongen tok over for glassflaska ⚠️ — ca. 1967

Format A. `min: 1945, max: 1990`
🔴 The sourcing here is softer than the rest: cartons arrived in the late 1950s
(Asker Meieri first), and by 1967 the bottles were as good as gone. That is a
period, not a year. Either nail down a precise year from Tine's own archive or
reframe it as "hvilket tiår". Listed because it is a great question if you can
source it — not because I could.

### Reserve bench

If you want format B — real dated archive photos — the deepest Norwegian well is
[DigitaltMuseum](https://digitaltmuseum.no/) with the licence filter set to
**"fri gjenbruk"** (about 126 000 of 2.3 million objects are CC-licensed), plus
[Nasjonalbiblioteket](https://www.nb.no/) and
[Digitalarkivet](https://www.digitalarkivet.no/content/5/historiske_bilder).
Search *meieri*, *budeie*, *melkerampe*, *seter*. I could not query these
programmatically, so nothing from them is on the verified list above.

---

## Gjett prisen — 10 kandidater fra FINN

All prices read early August 2026. Re-check before Friday.

### 1. Hytte i Leksvik ✅ — **prisantydning 100 000 kr**

The single best price question I found. A whole cabin from 1947 — 62 m², 1 009 m²
tomt, **innlagt strøm og vann**, peis, "nydelig utsikt" — for the price of a used
car. Everyone will guess millions.

> `unitLabel: 'hele hytta'` · Skjettendalsveien 19, 7120 Leksvik (Indre Fosen)
> **note:** «100 000 kr i prisantydning. Innlagt strøm og vann, peis, utsikt, 1 009 kvadratmeter tomt — og et bud på 150 000 lå allerede inne. Nærmeste butikk er 6,3 km unna.»
> **FINN-kode 454063859** — [annonsen](https://www.finn.no/realestate/leisuresale/ad.html?finnkode=454063859)

### 2. Massey Ferguson FE35, 1970 ⚠️ — **10 000 kr**

A whole tractor for the price of a phone. The best "billigere enn du tror" item
on the list.

> `unitLabel: 'hele traktoren'` · Molde · **FINN-kode 437912390**

### 3. Massey Ferguson 35 Bensin, 1960 ⚠️ — **24 000 kr**

Same joke, better photo — a 65-year-old grey-and-red classic.

> `unitLabel: 'hele traktoren'` · Ørsta · **FINN-kode 469887111**

### 4. Massey Ferguson 5713 Dyna6, 2020 ⚠️ — **815 000 kr**

The counterweight. Run it *after* the FE35 and the room recalibrates violently.

> `unitLabel: 'hele traktoren'` · Surnadal, 2 360 timer · **FINN-kode 467723675**
> **note:** «815 000 kr, brukt, med 2 360 timer på telleren. Traktoren fra 1970 lenger opp koster 10 000. Det er 81 gamle traktorer per nye.»

### 5. DeLaval melkerobot Classic, 2012 ⚠️ — **250 000 kr**

The house question. Ask what a *used* one costs and let people argue about the
new price at reveal.

> `unitLabel: 'brukt, hele roboten'` · Soknedal
> Search: `finn.no/recommerce/forsale/search?q=melkerobot` (a second one at 450 000 kr in Sørli)

### 6. To Stressless-stoler med krakk ⚠️ — **2 000 kr**

The Norwegian living room, secondhand. Two chairs *and* two footstools.

> `unitLabel: 'for begge stolene'` · Kristiansand S · **FINN-kode 471410799**

### 7. Stressless Stella hjørnesofa ⚠️ — **75 000 kr**

The same brand at the other end. Pick one of #6 and #7, not both.

> `unitLabel: 'hele sofaen'` · Oslo · **FINN-kode 468262052**

### 8. Utstoppet elghode ⚠️ — **3 000 kr**

Reliably guessed far too high. There are at least eight on FINN right now, from
3 000 to 8 000 kr, which is itself a funny fact for the reveal.

> `unitLabel: 'ett hode'` · Dokka · **FINN-kode 466295748**
> **note:** «3 000 kr. Det ligger åtte av dem ute på Finn akkurat nå. Markedet for utstoppet elg er større enn du trodde, og prisen lavere.»

### 9. Påkosta mikrohus / minihus ⚠️ — **790 000 kr**

A tiny house that costs eight times the Leksvik cabin. Good pairing with #1 —
same round, opposite direction.

> `unitLabel: 'hele huset'` · Vassenden

### 10. Dexter kvigekalver ⚠️🔴 — **15 000 kr**

Live cattle on FINN. Thematically perfect, but **read the ad before using it**:
the title says "kalver", plural, and it is not clear whether the price is per
animal or for the lot. If it is per animal, this is a great question; if not,
skip it.

> Farsund · **FINN-kode 364986784**
> 🔴 Also beware neighbouring listings at `123 kr` and `1 234 kr` — those are
> placeholder prices, not real ones.

### Also seen, if you need substitutes

Massey Ferguson 6616 (2013, 6 200 t) 475 000 kr · MF 5713S (2018) 680 000 kr ·
Utstoppet hel elg 8 000 kr (Eiken) · Naust ved Fosterlågen (dummy price, skip) ·
Fritidsbolig Fannrem.

---

## Gjett lyden — 10 kandidater

All ten are from Wikimedia Commons with a free licence and a direct download
link. Seven come from **Work With Sounds**, an EU project that recorded
disappearing workplace sounds — CC BY 4.0, credit "Work With Sounds / Werstas".
They are ideal here: recognisable enough to be fair, obscure enough that four
options are genuinely needed.

### 1. Håndmelking ✅ — CC BY 4.0

The obvious opener for this company. Rhythmic, unmistakable once you hear it.

> [WWS_Handmilking.ogg](https://upload.wikimedia.org/wikipedia/commons/9/91/WWS_Handmilking.ogg) · 984 KB
> **options:** `['Regn på et blikktak', 'Håndmelking av ei ku', 'Noen som vasker opp', 'En kaffetrakter som brygger']` → **1**

### 2. Melkeorgan (melkemaskin) ✅ — CC BY 4.0

The pulsating vacuum. Half the room will have heard it in a fjøs and still not
place it out of context.

> [WWS_Milkingunit.ogg](https://upload.wikimedia.org/wikipedia/commons/6/61/WWS_Milkingunit.ogg) · 408 KB
> **options:** `['En respirator', 'Et melkeorgan i fjøset', 'En gammel oljekjele', 'En luftpumpe på bensinstasjonen']` → **1**

### 3. Fôrvogn ✅ — CC BY 4.0

> [WWS_Feedwagon.ogg](https://upload.wikimedia.org/wikipedia/commons/c/ca/WWS_Feedwagon.ogg) · 170 KB
> **options:** `['En fôrvogn i fjøset', 'En skiheis', 'Et transportbånd på flyplassen', 'En snøfreser']` → **0**

### 4. Fjernskriver ✅ — CC BY 4.0

Mechanical teleprinter. Sounds like a machine gun made of typewriters.

> [WWS_Teleprintertyping.ogg](https://upload.wikimedia.org/wikipedia/commons/4/46/WWS_Teleprintertyping.ogg) · 1,4 MB
> **options:** `['En symaskin', 'En fjernskriver', 'En vevstol', 'En billettautomat']` → **1**

### 5. Dampfløyte ✅ — CC BY 4.0

Short, loud, dramatic. Good as the last sound round.

> [WWS_Steamwhistle.ogg](https://upload.wikimedia.org/wikipedia/commons/b/b4/WWS_Steamwhistle.ogg) · 122 KB
> **options:** `['En hurtigrutebåt', 'En dampfløyte på en fabrikk', 'Et tog som varsler', 'Et skipshorn i tåke']` → **1**
> 🔴 The last three are all a bit right. Tighten the distractors or swap two out.

### 6. Bensinpumpe ✅ — CC BY 4.0

> [WWS_Fueldispenser.ogg](https://upload.wikimedia.org/wikipedia/commons/e/ef/WWS_Fueldispenser.ogg) · 286 KB
> **options:** `['En bensinpumpe', 'En vannslange i hagen', 'Et akvarium', 'En kaffemaskin som skummer melk']` → **0**

### 7. Korntørke ✅ — CC BY 4.0

> [WWS_Graindryer.ogg](https://upload.wikimedia.org/wikipedia/commons/e/ec/WWS_Graindryer.ogg) · 687 KB
> **options:** `['Et ventilasjonsanlegg', 'En korntørke', 'En vindtunnel', 'En støvsuger i naborommet']` → **1**

### 8. Måke (gråmåke) ✅ — CC0

The seagull from the original placeholder set, now with a real file and no
licence worries at all.

> [XC707075 - European Herring Gull.mp3](https://upload.wikimedia.org/wikipedia/commons/5/5c/XC707075_-_European_Herring_Gull_-_Larus_argentatus.mp3) · 581 KB · CC0
> **options:** `['En måke på taket', 'En kråke', 'En baby som gråter', 'En katt utenfor døra']` → **0**

### 9. Islom ✅ — CC BY-SA 3.0

The loneliest sound in the Nordics. Beautiful, and a genuine 50/50 against
"ulv" for most people.

> [Gavia immer - Common Loon XC139388.mp3](https://upload.wikimedia.org/wikipedia/commons/8/80/Gavia_immer_-_Common_Loon_XC139388.mp3) · 2,4 MB
> **options:** `['En ulv langt unna', 'En lom på vannet', 'Et menneske som roper', 'En hund som uler']` → **1**

### 10. Modem på oppringt samband ✅ — public domain

Pure nostalgia bait, and it splits the room by age exactly the way you want on a
Friday.

> [Dial_up_modem_noises.ogg](https://upload.wikimedia.org/wikipedia/commons/3/33/Dial_up_modem_noises.ogg) · 416 KB
> **options:** `['Et faksapparat', 'Et modem som ringer opp', 'En gammel skriver', 'Et alarmanlegg']` → **1**
> 🔴 "Faks" and "modem" are close cousins acoustically. Consider replacing the fax option.

### Reserve bench, all verified links

| Lyd | Fil | Lisens |
| --- | --- | --- |
| Ku som rauter | [Single_Cow_Moo.ogg](https://upload.wikimedia.org/wikipedia/commons/a/a5/Single_Cow_Moo.ogg) | CC BY-SA 4.0 |
| Sau | [Sheep_bleating.ogg](https://upload.wikimedia.org/wikipedia/commons/1/13/Sheep_bleating.ogg) | Public domain |
| Bjeller på beite | [Cowbells_on_Monte_Baldo.ogg](https://upload.wikimedia.org/wikipedia/commons/8/8f/Cowbells_on_Monte_Baldo.ogg) | CC BY-SA 4.0 |
| Melkemottak | [WWS_MilkReceiver.ogg](https://upload.wikimedia.org/wikipedia/commons/9/93/WWS_MilkReceiver.ogg) | CC BY 4.0 |
| Traktormotor (Ursus C342) | [WWS_TractorUrsusC342engine.ogg](https://upload.wikimedia.org/wikipedia/commons/f/ff/WWS_TractorUrsusC342engine.ogg) | CC BY 4.0 |
| Kaffekvern | [Coffee_grinder.ogg](https://upload.wikimedia.org/wikipedia/commons/0/01/Coffee_grinder.ogg) | Public domain |
| Rullemaskin | [WWS_Boxmangle.ogg](https://upload.wikimedia.org/wikipedia/commons/7/77/WWS_Boxmangle.ogg) | CC BY 4.0 |
| Vekkerklokke som tikker | [WWS_Alarmclockticking.ogg](https://upload.wikimedia.org/wikipedia/commons/e/ee/WWS_Alarmclockticking.ogg) | CC BY 4.0 |
| Iskrembil | [WWS_HomeIceCreamvan.ogg](https://upload.wikimedia.org/wikipedia/commons/8/8b/WWS_HomeIceCreamvan.ogg) | CC BY 4.0 |
| Vannhjul | [WWS_Waterwheel.ogg](https://upload.wikimedia.org/wikipedia/commons/9/96/WWS_Waterwheel.ogg) | CC BY 4.0 |
| Brannalarm | [Activated_fire_alarm.ogg](https://upload.wikimedia.org/wikipedia/commons/e/e1/Activated_fire_alarm_%28sound%29.ogg) | CC BY-SA 3.0 au |
| Torden | [Thunder_01.ogg](https://upload.wikimedia.org/wikipedia/commons/f/fa/Thunder_01.ogg) | CC BY-SA 4.0 |

---

## Et forslag til de ni

Alternating year → price → sound, ordered so the tractor pair lands either side
of the room recalibrating, and the two best surprises sit late.

1. **År** — Kvikk Lunsj (1937)
2. **Pris** — Massey Ferguson FE35 1970 (10 000 kr)
3. **Lyd** — Håndmelking
4. **År** — Litago (1994)
5. **Pris** — Utstoppet elghode (3 000 kr)
6. **Lyd** — Modem
7. **År** — Navnet TINE (1992)
8. **Pris** — Hytta i Leksvik (100 000 kr)
9. **Lyd** — Islom

Two house questions, two "billigere enn du tror", one pure nostalgia, and the
cabin as the closer.

## Attribution

CC BY and CC BY-SA files need a credit line. Cheapest way to stay clean: one
slide at the end, or a line in the Slack thread —

> Lydklipp: Work With Sounds / Werstas (CC BY 4.0), Wikimedia Commons.
> Foto: Wikimedia Commons.
