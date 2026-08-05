# Spørsmålskandidater — Fredagsquizen

Ten candidates per round type, researched August 2026. Each entry is shaped so
it can be pasted more or less straight into `src/data/questions.ts`.

**Verification key**

- ✅ — I opened the source page and read the number off it
- ⚠️ — read off a search-results list, not the item page. Open it before you commit
- 🔴 — known problem, read the note before using

---

## Before you pick

Five things that will bite you, found the hard way while researching this.

**FINN listings expire.** Every price below is from early August 2026. A private
listing can vanish in a week. Screenshot the photo now and re-check the price
the morning of the quiz — the `note` field is where you say "lå ute i august".

**FINN sellers use fake prices.** Placeholder prices meaning "ring meg" are
everywhere: `Nrf kviger selges — 123 kr`, `Tiroler kviger — 1 234 kr`, `Sølv —
123 456 kr`, `Reklameskilt og melkespann — 999 999 kr`. If the number looks like
someone leaning on the keyboard, it is.

**Never author a price question with `answer: 0`.** FINN is full of "gis bort"
listings — there are at least eight grand pianos being given away right now,
which is a great fact and a terrible question. Percentage error divides by the
answer, so a free item used to score every player `NaN` and print `Infinity %`
on the results card. I found this while researching and
[fixed it](../src/lib/scoring.ts) — a free item now scores 100 only on an exact
guess — but the round is still pointless, so don't.

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

### 2. Massey Ferguson MF135, 1971 ✅ — **51 000 kr**

The one tractor. **MF 100-serien er den mest utbredte traktorserien noensinne i
det norske traktormarkedet** — Eik alone sold at least 23 000 of them — and the
MF 135 is the archetype. If your colleagues picture "a tractor", they picture
this one.

The ad is the best part. It has a front loader, two snow blades, a small bucket
and possibly a two-furrow plough, and the seller is disarmingly honest about the
faults: *"Bruker litt olje. Svetter litt servoolje. Lekker litt kjølevæske."*

> `unitLabel: 'hele traktoren'` · Porsgrunn, modellår 1971, 51 000 kr inkl. mva.
> **note:** «51 000 kr — med frontlaster, to brøyteskjær og ei lita skuffe. Selgeren skriver at den bruker litt olje, svetter litt servoolje og lekker litt kjølevæske. «Denne starter og går umiddelbart alltid.»»
> **FINN-kode 472181593** — [annonsen](https://www.finn.no/mobility/item/472181593)
> **Kilde for «mest utbredte»:** [traktor.no om Eikmaskin](https://www.traktor.no/et-lite-stykke-norgeshistorie-hvordan-skapte-familien-eik-en-av-landets-storste-maskingrossister/s/5-151-13405) · [snl.no/Massey_Ferguson](https://snl.no/Massey_Ferguson)
>
> If you meant *most sold today* rather than *most widespread ever*, that is John
> Deere — [Norges mest solgte for fjerde år på rad](https://www.felleskjopet.no/presse/pressemeldinger/norges-mest-populaere-traktor--for-tredje-aar-paa-rad/), with the 6M as the top series, while
> Valtra led total registrations in 2025. Say the word and I'll swap it, but a
> new John Deere makes a duller price question than a 54-year-old MF 135.

### 3. Øst-Telemark bunad ⚠️ — **102 000 kr**

Secondhand. A used bunad costs more than the cabin in #1 and twice the tractor
in #2, and almost nobody guesses above 40 000.

> `unitLabel: 'hele bunaden, brukt'` · Fiskum · **FINN-kode 455740691**
> **note:** «102 000 kr. Brukt. Det er to traktorer og litt til. En skreddersydd fanabunad lenger ned i samme søk lå på 95 000.»

### 4. Spikertelt med Hobby 720-vogn ⚠️ — **420 000 kr**

Peak Norway, and the perfect counterweight to the Leksvik cabin: a caravan with
a permanent annex on a campsite costs **four times** a whole cabin with mains
water, power and a fjord view. Run it in the same quiz as #1 and let the room
sit with that.

> `unitLabel: 'vogn og telt samlet'` · Våberg Camping, Sundlandet (Heimdal)
> **note:** «420 000 kr for vogn og spikertelt. Hytta i Leksvik — 62 kvadratmeter, innlagt vann og strøm, peis og utsikt — lå ute til 100 000. Det er fire spikertelt per hytte.»
> **FINN-kode 464066904**

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

Skreddersydd fanabunad 95 000 kr (Drammen) · Utstoppet hel elg 8 000 kr (Eiken) ·
Spikertelt med sjøutsikt 65 000 kr (Staff Camping) · Hermès-veske 179 000 kr fra
Lånekontoret · Fritidsbolig Fannrem.

Other tractors are deliberately **not** here — one is the point. If the MF 135
listing dies before Friday, search `finn.no/mobility/search/b2b/agriculturetractor?q=MF+135`
for another from the same series rather than reaching for a different model.

---
## Gjett lyden — 10 kandidater

Rebuilt: six of the previous ten were giveaways and are gone — måke, islom,
oppringt modem, dampfløyte, korntørke and bensinpumpe. A seagull is a seagull.
Four survived, and six harder ones took the empty slots.

Nine of the ten come from **Work With Sounds**, an EU project that recorded
disappearing workplace sounds. CC BY 4.0, credit "Work With Sounds / Werstas".
They are ideal here: nothing has a signature everyone knows, so the four options
do real work.

Every link below was fetched and returns 200.

### Difficulty, and how to use it

Sound rounds score binary — 100 or 0. With three of them in a nine-question quiz,
300 points ride on rounds with no partial credit, so a set of three brutal ones
turns a third of the quiz into a lottery. Build a ladder instead:

| | Kandidat | Hvorfor der |
| --- | --- | --- |
| **Medium** | 1, 2 | Most people land it once they read the options |
| **Hard** | 3–6 | Splits the room |
| **Brutal** | 7–10 | The reveal is the payoff, not the guess |

**Anbefalt trio:** #1 Håndmelking → #5 Glødehodemotor → #7 Vaskeanlegget.
Opens on theme, peaks on something unmistakably Norwegian, closes on a sound
from our own industry that nobody will place.

---

## Medium

### 1. Håndmelking ✅ — CC BY 4.0

Milk hitting a metal pail, in rhythm. The theme question, and the only one of the
four options that could make that particular sound.

> [WWS_Handmilking.ogg](https://upload.wikimedia.org/wikipedia/commons/9/91/WWS_Handmilking.ogg) · 984 KB
> **options:** `['Regn på et blikktak', 'Håndmelking av ei ku', 'Noen som vasker opp', 'En kaffetrakter som brygger']` → **1**
> **note:** «Håndmelking. Omtrent 1,5 liter i minuttet hvis du er god. Et melkeorgan tar fire spener samtidig og bryr seg ikke om at du er god.»

### 2. Fôrvogn ✅ — CC BY 4.0

Rail-mounted feed wagon down the length of a barn. Motor plus rolling metal.

> [WWS_Feedwagon.ogg](https://upload.wikimedia.org/wikipedia/commons/c/ca/WWS_Feedwagon.ogg) · 170 KB
> **options:** `['En fôrvogn i fjøset', 'En skiheis', 'Et transportbånd på flyplassen', 'En snøfreser']` → **0**

---

## Hard

### 3. Melkeorgan ✅ — CC BY 4.0

The pulsating vacuum of a milking cluster. Half the room has stood next to one
and still will not place it out of context.

> [WWS_Milkingunit.ogg](https://upload.wikimedia.org/wikipedia/commons/6/61/WWS_Milkingunit.ogg) · 408 KB
> **options:** `['En respirator', 'Et melkeorgan i fjøset', 'En gammel oljekjele', 'En luftpumpe på bensinstasjonen']` → **1**

### 4. Fjernskriver ✅ — CC BY 4.0

A mechanical teleprinter at speed. Sounds like a typewriter being fired from a
machine gun.

> [WWS_Teleprintertyping.ogg](https://upload.wikimedia.org/wikipedia/commons/4/46/WWS_Teleprintertyping.ogg) · 1,4 MB
> **options:** `['En symaskin', 'En fjernskriver', 'En vevstol', 'En billettautomat']` → **1**

### 5. Glødehodemotor ✅ — CC BY 4.0

The slow, heavy *tøff–tøff–tøff* of a semidiesel through the exhaust pipe. The
sound of the Norwegian coast for fifty years, and the one on this list most
likely to make someone's father text them about it afterwards.

> [WWS_Hotbulbengineexhaustpipe.ogg](https://upload.wikimedia.org/wikipedia/commons/7/7c/WWS_Hotbulbengineexhaustpipe.ogg) · 600 KB
> **options:** `['Et damplokomotiv som står stille', 'En glødehodemotor i en gammel skøyte', 'En hjullaster på tomgang', 'En vedkløyver']` → **1**
> **note:** «En glødehodemotor — semidiesel. Du varmer opp toppen med blåselampe før start, og så går den til den går tom. Den lyden var Norskekysten i femti år.»
> There is a longer, richer 5 MB recording of a Storebro engine as an alternative: [WWS_Storebrohotbulbengine.ogg](https://upload.wikimedia.org/wikipedia/commons/d/df/WWS_Storebrohotbulbengine.ogg)

### 6. Rullemaskin ✅ — CC BY 4.0

A box mangle — a stone-weighted wooden chest rolled over linen. Deep wooden
rumble with a turn at each end.

> [WWS_Boxmangle.ogg](https://upload.wikimedia.org/wikipedia/commons/7/77/WWS_Boxmangle.ogg) · 1,7 MB
> **options:** `['En rullemaskin for sengetøy', 'En trebåt som gynger mot brygga', 'En gammel heis', 'Et kjegleoppsett i en bowlinghall']` → **0**

---

## Brutal

### 7. Vaskeanlegget til et melkeanlegg ✅ — CC BY 4.0

The wash cycle that runs after every milking. Brutal by construction: all four
options are something rinsing itself, so nobody can shortcut it by category.
Best closer on the list — the reveal is "this runs in our own plants, twice a
day, and none of you knew what it sounded like".

> [WWS_MilkingMachineCleaningUnit.ogg](https://upload.wikimedia.org/wikipedia/commons/5/55/WWS_MilkingMachineCleaningUnit.ogg) · 770 KB
> **options:** `['En oppvaskmaskin på et storkjøkken', 'Vaskeanlegget til et melkeanlegg', 'En kaffemaskin som renser seg', 'En vaskemaskin på sentrifuge']` → **1**

### 8. Repslagermaskin ✅ — CC BY 4.0

Rope being laid up. Rhythmic, stranded, completely unplaceable.

> [WWS_Ropemakingmachine.ogg](https://upload.wikimedia.org/wikipedia/commons/c/c0/WWS_Ropemakingmachine.ogg) · 1,5 MB
> **options:** `['En repslagermaskin', 'En garnvinde på en fabrikk', 'Et karusellmaskineri på tivoli', 'En gammel filmfremviser']` → **0**

### 9. Gullvasking med vaskerenne ✅ — CC BY 4.0

Water and gravel through a sluice box. Option A is *nearly* right, which is the
whole point.

> [WWS_Goldprospectorwithasluicebox.ogg](https://upload.wikimedia.org/wikipedia/commons/7/7e/WWS_Goldprospectorwithasluicebox.ogg) · 594 KB
> **options:** `['En bekk over stein', 'En gullvasker med vaskerenne', 'Grus som tippes av et lasteplan', 'En betongblander']` → **1**

### 10. Mekanisk regnemaskin ✅ — CC BY 4.0

A Burroughs adding machine: key clatter, then the lever. Against a cash register
and a time clock, which sound almost identical, because they are almost the same
machine.

> [WWS_Burroughsaccountingmachine.ogg](https://upload.wikimedia.org/wikipedia/commons/7/73/WWS_Burroughsaccountingmachine.ogg) · 407 KB
> **options:** `['En mekanisk regnemaskin', 'Et gammelt kassaapparat', 'Et stemplingsur', 'En manuell skrivemaskin']` → **0**

---

### Reserve bench, all verified links

Harder than the ones I cut, easier than the brutal four.

| Lyd | Fil | Lisens | Nivå |
| --- | --- | --- | --- |
| Melkemottak | [WWS_MilkReceiver.ogg](https://upload.wikimedia.org/wikipedia/commons/9/93/WWS_MilkReceiver.ogg) | CC BY 4.0 | hard |
| Traktormotor (Ursus C342) | [WWS_TractorUrsusC342engine.ogg](https://upload.wikimedia.org/wikipedia/commons/f/ff/WWS_TractorUrsusC342engine.ogg) | CC BY 4.0 | medium |
| Trommel for polering | [WWS_Tumblingbarrel.ogg](https://upload.wikimedia.org/wikipedia/commons/c/c3/WWS_Tumblingbarrel.ogg) | CC BY 4.0 | brutal |
| Bløtleggingshjul | [WWS_Soakingwheel.ogg](https://upload.wikimedia.org/wikipedia/commons/b/be/WWS_Soakingwheel.ogg) | CC BY 4.0 | brutal |
| Vannhjul | [WWS_Waterwheel.ogg](https://upload.wikimedia.org/wikipedia/commons/9/96/WWS_Waterwheel.ogg) | CC BY 4.0 | hard |
| Korntørke | [WWS_Graindryer.ogg](https://upload.wikimedia.org/wikipedia/commons/e/ec/WWS_Graindryer.ogg) | CC BY 4.0 | medium |
| Iskrembil | [WWS_HomeIceCreamvan.ogg](https://upload.wikimedia.org/wikipedia/commons/8/8b/WWS_HomeIceCreamvan.ogg) | CC BY 4.0 | medium |
| Ku som rauter | [Single_Cow_Moo.ogg](https://upload.wikimedia.org/wikipedia/commons/a/a5/Single_Cow_Moo.ogg) | CC BY-SA 4.0 | for lett |
| Bjeller på beite | [Cowbells_on_Monte_Baldo.ogg](https://upload.wikimedia.org/wikipedia/commons/8/8f/Cowbells_on_Monte_Baldo.ogg) | CC BY-SA 4.0 | for lett |

### Cut, and why

Måke, islom, oppringt modem, dampfløyte, korntørke, bensinpumpe. The first three
are instantly recognisable to anyone who has been outdoors or online. The steam
whistle had three distractors that were all defensibly correct, which is unfair
rather than hard. The grain dryer and the fuel pump are just fans and liquid —
too generic to have a right answer worth arguing about.
---

## Et forslag til de ni

Alternating year → price → sound. The sounds climb medium → hard → brutal, and
the price rounds are ordered so the spikertelt lands *after* the cabin — the
whole joke is that the caravan costs four times the house.

| # | Runde | Spørsmål | Svar |
| --- | --- | --- | --- |
| 1 | År | Kvikk Lunsj | 1937 |
| 2 | Pris | Massey Ferguson MF135, 1971 | 51 000 kr |
| 3 | Lyd | Håndmelking · *medium* | — |
| 4 | År | Litago | 1994 |
| 5 | Pris | Utstoppet elghode | 3 000 kr |
| 6 | Lyd | Glødehodemotor · *hard* | — |
| 7 | År | Navnet TINE | 1992 |
| 8 | Pris | Hytta i Leksvik | 100 000 kr |
| 9 | Lyd | Vaskeanlegget til et melkeanlegg · *brutal* | — |

Two house questions, one tractor, two "billigere enn du tror", and a sound
ladder that ends on our own industry. If you want the caravan in as well, swap
it for #5 and move the moose head to the bench — but keep it after the cabin.

## Attribution

CC BY and CC BY-SA files need a credit line. Cheapest way to stay clean: one
slide at the end, or a line in the Slack thread —

> Lydklipp: Work With Sounds / Werstas (CC BY 4.0), Wikimedia Commons.
> Foto: Wikimedia Commons.
