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

**Every sound clip needs work before it is usable.** They are Ogg Vorbis (Safari
is unreliable, and the presenter is probably on a Mac), they run 18–82 seconds
when a round wants 6–10, and their levels span 27 dB. One ffmpeg pass fixes all
three — command and measurements are in the sound section below.

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

### The rule this set follows

**Every answer is a thing people can name.** Difficulty comes from the sound
being ambiguous out of context — never from the answer being a word you don't
own. A repslagermaskin is not a hard question, it is an unanswerable one: you
can't reason toward a noun you've never heard, and the reveal lands as "what?"
instead of "ohh".

The same goes for the three wrong options. All four have to be things a person
can picture, or the round degenerates into picking the only familiar word.

That rule cost me most of the previous set. Gone: repslagermaskin, rullemaskin,
Burroughs regnemaskin, gullvasking med vaskerenne, fjernskriver, trommel,
bløtleggingshjul. Also reworded two survivors — *melkeorgan* became **melkemaskin**,
and *glødehodemotor* became **en gammel enstempers båtmotor**, with the technical
word moved into the reveal where it belongs.

Nine of ten are from **Work With Sounds**, an EU project that recorded
disappearing workplace sounds. CC BY 4.0, credit "Work With Sounds / Werstas".
All ten were downloaded and measured — durations and levels below are real.

### Difficulty ladder

Sound rounds score binary, 100 or 0. Three of them in a nine-question quiz means
300 points with no partial credit, so climb rather than open at brutal.

**Anbefalt trio:** #1 Håndmelking → #6 Båtmotoren → #10 Vaskeanlegget.

🔴 **I cannot hear these files.** The grades below are inferred from what the
object is and how distinctive it should be — not from listening. Play all ten
before you lock the ladder; expect to move at least one.

---

## Medium

### 1. Håndmelking ✅ — CC BY 4.0 · 75 s · snitt −34 dB

Milk hitting a metal pail, in rhythm. Everyone knows what hand milking is, and
it's the only one of the four options that could make that particular sound.

> [WWS_Handmilking.ogg](https://upload.wikimedia.org/wikipedia/commons/9/91/WWS_Handmilking.ogg)
> **options:** `['Regn på et blikktak', 'Håndmelking av ei ku', 'Noen som vasker opp', 'En kaffetrakter som brygger']` → **1**
> **note:** «Håndmelking. Rundt 1,5 liter i minuttet hvis du er god. En melkemaskin tar fire spener samtidig og bryr seg ikke om at du er god.»

### 2. Bagasjebåndet på flyplassen ✅ — CC BY 4.0 · 60 s · snitt −20 dB

Everyone has stood at one. Nobody has ever listened to one on purpose.

> [WWS_Luggagebeltinwaitinghall.ogg](https://upload.wikimedia.org/wikipedia/commons/d/d1/WWS_Luggagebeltinwaitinghall.ogg)
> **options:** `['Bagasjebåndet på flyplassen', 'En gressklipper', 'En oppvaskmaskin', 'En rulletrapp']` → **0**

---

## Hard

### 3. Melkemaskin ✅ — CC BY 4.0 · 43 s · snitt −27 dB

The pulsing vacuum of a milking cluster. Half the room has stood next to one and
still won't place it cold.

> [WWS_Milkingunit.ogg](https://upload.wikimedia.org/wikipedia/commons/6/61/WWS_Milkingunit.ogg)
> **options:** `['En respirator', 'En melkemaskin i fjøset', 'En gammel oljekjele', 'En luftpumpe på bensinstasjonen']` → **1**

### 4. Rulletrapp ✅ — CC BY 4.0 · 40 s · snitt −19 dB

You ride one every week and could not describe the sound to save your life.

> [WWS_Escalator.ogg](https://upload.wikimedia.org/wikipedia/commons/5/53/WWS_Escalator.ogg)
> **options:** `['En rulletrapp', 'En heis', 'Et tog som bremser inn', 'En vaskemaskin']` → **0**

### 5. Oppskjærmaskin ✅ — CC BY 4.0 · 22 s · snitt −10 dB

The deli slicer. Everyone has waited behind one at the meat counter.

> [WWS_Meatslicer.ogg](https://upload.wikimedia.org/wikipedia/commons/c/cb/WWS_Meatslicer.ogg)
> **options:** `['En oppskjærmaskin hos slakteren', 'En brødrister', 'En kopimaskin', 'En elektrisk hekksaks']` → **0**
> 🔴 This is the loudest clip of the ten by a wide margin and already peaks at
> 0 dB. Normalise it or it will be the one that makes people jump.

### 6. Gammel enstempers båtmotor ✅ — CC BY 4.0 · 50 s · snitt −20 dB

The slow, heavy *tøff–tøff–tøff* through the exhaust pipe. Anyone who has been
near the coast has heard it, and "gammel båtmotor" is something you can name
even if "glødehodemotor" isn't.

> [WWS_Hotbulbengineexhaustpipe.ogg](https://upload.wikimedia.org/wikipedia/commons/7/7c/WWS_Hotbulbengineexhaustpipe.ogg)
> **options:** `['Et damplokomotiv som står stille', 'En gammel enstempers båtmotor', 'En hjullaster på tomgang', 'En vedkløyver']` → **1**
> **note:** «En gammel enstempers båtmotor — glødehode, eller semidiesel. Du varmet opp toppen med blåselampe før start, og så gikk den til den gikk tom. Den lyden var Norskekysten i femti år.»

---

## Brutal

Still nameable — the difficulty is that the sound gives almost nothing away, and
every wrong option is something that plausibly makes the same noise.

### 7. Gulvvaskemaskinen på kjøpesenteret ✅ — CC BY 4.0 · 69 s · snitt −23 dB

The ride-on floor scrubber. Instantly recognisable by sight, completely
anonymous by ear — and all four options are motor-plus-brushes.

> [WWS_Automaticscrubberdrier.ogg](https://upload.wikimedia.org/wikipedia/commons/0/09/WWS_Automaticscrubberdrier.ogg)
> **options:** `['En gulvvaskemaskin på et kjøpesenter', 'En støvsuger', 'En gressklipper', 'En snøfreser']` → **0**

### 8. Eltemaskinen hos bakeren ✅ — CC BY 4.0 · 27 s · snitt −21 dB

Dough in a spiral mixer. Wet, heavy, slapping — and so is a cement mixer.

> [WWS_Doughmixer.ogg](https://upload.wikimedia.org/wikipedia/commons/8/82/WWS_Doughmixer.ogg)
> **options:** `['En eltemaskin hos bakeren', 'En sementblander', 'En oppvaskmaskin', 'En vaskemaskin med skjev last']` → **0**

### 9. Kassaapparat ✅ — CC BY 4.0 · 19 s · snitt −37 dB

Keys, beeps, drawer. Everyone knows a till; nobody can separate it from the
three other machines that beep at you in a shop.

> [WWS_Electroniccashregister.ogg](https://upload.wikimedia.org/wikipedia/commons/e/e4/WWS_Electroniccashregister.ogg)
> **options:** `['Et kassaapparat', 'En billettautomat', 'En kopimaskin', 'En stemplingsklokke']` → **0**
> 🔴 Quietest clip of the ten — 27 dB below the slicer. Unusable in a room
> without normalising first.

### 10. Vaskeanlegget som spyler melkeanlegget rent ✅ — CC BY 4.0 · 82 s · snitt −22 dB

The wash cycle that runs after every milking. Described in plain words rather
than jargon, so it is guessable — and brutal because all four options are
something rinsing itself. The best closer here: the reveal is "this runs in our
own plants twice a day and none of you knew what it sounded like."

> [WWS_MilkingMachineCleaningUnit.ogg](https://upload.wikimedia.org/wikipedia/commons/5/55/WWS_MilkingMachineCleaningUnit.ogg)
> **options:** `['En oppvaskmaskin på et storkjøkken', 'Vaskeanlegget som spyler melkeanlegget rent', 'En kaffemaskin som renser seg', 'En vaskemaskin på sentrifuge']` → **1**

---

### Two things every clip needs before Friday

**They are all far too long.** Measured: 18 to 82 seconds, average 47. A quiz
round wants 6–10 seconds — long enough to hear the character, short enough that
the room doesn't start talking. Trim to the most characteristic stretch, which
is rarely the first seconds.

**The levels are wildly uneven.** Mean volume across the ten spans **27 dB**,
from the cash register at −37 dB to the meat slicer at −10 dB. Play them back to
back untouched and half are inaudible while the rest make people flinch. The
slicer already peaks at 0 dB.

One pass fixes both. Trimming and loudness-normalising to broadcast level, then
out as mp3 so Safari plays it:

```bash
ffmpeg -ss 00:00:12 -t 8 -i WWS_Handmilking.ogg \
  -af "loudnorm=I=-16:TP=-1.5:LRA=11" -b:a 160k public/media/klipp-01.mp3
```

I ran that on the three extremes to check it works: the cash register went from
−37 dB to −21.6, the slicer from −10.3 to −17.4, hand milking from −34.0 to
−22.1. A 27 dB spread becomes about 5.

### Reserve bench, all verified and measured

Same rule — nameable things only.

| Lyd | Fil | Lengde | Snitt | Nivå |
| --- | --- | --- | --- | --- |
| Fôrvogn i fjøset | [WWS_Feedwagon.ogg](https://upload.wikimedia.org/wikipedia/commons/c/ca/WWS_Feedwagon.ogg) | 17 s | −21 dB | medium |
| Melkemottak | [WWS_MilkReceiver.ogg](https://upload.wikimedia.org/wikipedia/commons/9/93/WWS_MilkReceiver.ogg) | — | — | hard |
| Traktormotor | [WWS_TractorUrsusC342engine.ogg](https://upload.wikimedia.org/wikipedia/commons/f/ff/WWS_TractorUrsusC342engine.ogg) | — | — | medium |
| Båndsag | [WWS_Bandsaw.ogg](https://upload.wikimedia.org/wikipedia/commons/4/48/WWS_Bandsaw.ogg) | — | — | hard |
| Brannbilsirene | [WWS_Fireenginesiren.ogg](https://upload.wikimedia.org/wikipedia/commons/4/47/WWS_Fireenginesiren.ogg) | — | — | for lett |
| Iskrembil | [WWS_HomeIceCreamvan.ogg](https://upload.wikimedia.org/wikipedia/commons/8/8b/WWS_HomeIceCreamvan.ogg) | — | — | medium |
| Korntørke | [WWS_Graindryer.ogg](https://upload.wikimedia.org/wikipedia/commons/e/ec/WWS_Graindryer.ogg) | — | — | for generisk |

### Cut, and why

**Unnameable** — you can't guess a word you don't have: repslagermaskin,
rullemaskin, Burroughs regnemaskin, bløtleggingshjul, poleringstrommel,
gullvasking med vaskerenne. Fjernskriver went the same way; telex is a knowable
thing if you're over sixty and nothing at all if you're not.

**Too easy** — a seagull is a seagull: måke, islom, oppringt modem, brannbilsirene.

**Unfair rather than hard** — dampfløyta had three distractors that were all
defensibly correct.

**Too generic to argue about** — korntørke and bensinpumpe are a fan and a
liquid.

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
| 6 | Lyd | Gammel enstempers båtmotor · *hard* | — |
| 7 | År | Navnet TINE | 1992 |
| 8 | Pris | Hytta i Leksvik | 100 000 kr |
| 9 | Lyd | Vaskeanlegget som spyler melkeanlegget rent · *brutal* | — |

Two house questions, one tractor, two "billigere enn du tror", and a sound
ladder that ends on our own industry. If you want the caravan in as well, swap
it for #5 and move the moose head to the bench — but keep it after the cabin.

## Attribution

CC BY and CC BY-SA files need a credit line. Cheapest way to stay clean: one
slide at the end, or a line in the Slack thread —

> Lydklipp: Work With Sounds / Werstas (CC BY 4.0), Wikimedia Commons.
> Foto: Wikimedia Commons.
