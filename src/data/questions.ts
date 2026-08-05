import { clamp } from '../lib/format';

/*
 * The whole quiz lives in this file. Thirty candidates — ten of each kind,
 * alternating year → price → sound — so the whole set can be reviewed on a
 * screen before the final nine are picked. Delete the ones you don't want and
 * everything downstream follows: the maximum score is `QUESTIONS.length * 100`,
 * and the progress label, emoji strip and Slack summary all recount themselves.
 *
 * Media lives in `public/media/` and is referenced by file name. Every file is
 * from Wikimedia Commons — see `public/media/CREDITS.md` for author and licence,
 * and `scripts/fetch-media.mjs` to re-fetch. Sound clips are trimmed to eight
 * seconds and loudness-normalised.
 *
 * The photos on the price rounds are screenshots of the real FINN listings with
 * every price redacted, taken by `scripts/capture-ads.mjs`. They are the
 * sellers' own pictures and belong to them — this is for an internal quiz that
 * comes down straight afterwards.
 */

export const POINTS_PER_QUESTION = 100;

export type QuestionKind = 'year' | 'price' | 'sound';

interface QuestionBase {
  /** Read aloud by the presenter and shown on the participant's screen. */
  prompt: string;
  /** One line of explanation, read aloud at reveal. */
  note: string;
  source?: string;
}

interface PhotoQuestionBase extends QuestionBase {
  /** Figure caption, and the question's label on the results cards. */
  photoHint: string;
  /** File name in `public/media/`, or an absolute path / URL. */
  photo?: string;
}

export interface YearQuestion extends PhotoQuestionBase {
  kind: 'year';
  /** Slider bounds for this question only — not a global range. */
  min: number;
  max: number;
  answer: number;
}

export interface PriceQuestion extends PhotoQuestionBase {
  kind: 'price';
  /** Price clarifier next to the field: "per kilo", "hele fisken". */
  unitLabel: string;
  answer: number;
}

export interface SoundQuestion extends QuestionBase {
  kind: 'sound';
  /** Shown to the presenter only, so they know which file to play. */
  clipName: string;
  /** File name in `public/media/`, or an absolute path / URL. */
  clip?: string;
  options: readonly [string, string, string, string];
  /** Index into `options`. */
  answer: 0 | 1 | 2 | 3;
}

export type Question = YearQuestion | PriceQuestion | SoundQuestion;

export const QUESTIONS: readonly Question[] = [
  {
    kind: 'year',
    prompt: 'Når ble Kvikk Lunsj lansert?',
    photoHint: 'Foto: Kvikk Lunsj i snøen, der den hører hjemme.',
    photo: 'aar-05-kvikklunsj.jpg',
    min: 1920,
    max: 1975,
    answer: 1937,
    note: '1937. Fire år etter den britiske fetteren, og med turregler trykt på papiret siden.',
    source: 'https://en.wikipedia.org/wiki/Kvikk_Lunsj',
  },
  {
    kind: 'price',
    prompt: 'Hva koster denne traktoren på Finn?',
    photoHint: 'Annonsen for en Massey Ferguson MF135 fra 1971, med prisen sladdet.',
    photo: 'pris-02-traktor.jpg',
    unitLabel: 'hele traktoren',
    answer: 51000,
    note: '51 000 kr, med frontlaster, to brøyteskjær og ei lita skuffe. Selgeren skriver at den bruker litt olje, svetter litt servoolje og lekker litt kjølevæske — «men denne starter og går umiddelbart alltid».',
    source: 'https://www.finn.no/mobility/item/472181593',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-01-handmelking.mp3',
    clip: 'lyd-01-handmelking.mp3',
    options: [
      'Regn på et blikktak',
      'Håndmelking av ei ku',
      'Noen som vasker opp',
      'En kaffetrakter som brygger',
    ],
    answer: 1,
    note: 'Håndmelking. Rundt 1,5 liter i minuttet hvis du er god. En melkemaskin tar fire spener samtidig og bryr seg ikke om at du er god.',
  },

  {
    kind: 'year',
    prompt: 'Når ble Jarlsberg lansert?',
    photoHint: 'Foto: Jarlsberg, med hullene som ble et varemerke.',
    photo: 'aar-01-jarlsberg.jpg',
    min: 1930,
    max: 1990,
    answer: 1956,
    note: '1956. Utviklet på Ås, oppkalt etter en ost som døde ut i 1916, og i dag vår største osteeksport.',
    source: 'https://snl.no/jarlsberg_-_ost',
  },
  {
    kind: 'price',
    prompt: 'Hva var prisantydningen på denne hytta?',
    photoHint: 'Annonsen for hytta i Leksvik, med alle pristall sladdet.',
    photo: 'pris-01-hytte.jpg',
    unitLabel: 'hele hytta',
    answer: 100000,
    note: '100 000 kr. Innlagt strøm og vann, peis, utsikt, 1 009 kvadratmeter tomt — og et bud på 150 000 lå allerede inne. Nærmeste butikk er 6,3 km unna.',
    source: 'https://www.finn.no/realestate/leisuresale/ad.html?finnkode=454063859',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-02-bagasjeband.mp3',
    clip: 'lyd-02-bagasjeband.mp3',
    options: [
      'Bagasjebåndet på flyplassen',
      'En gressklipper',
      'En oppvaskmaskin',
      'En rulletrapp',
    ],
    answer: 0,
    note: 'Bagasjebåndet. Du har stått ved et hundre ganger og aldri hørt etter en eneste gang.',
  },

  {
    kind: 'year',
    prompt: 'Når ble Litago lansert?',
    photoHint: 'Foto: sjokolademelk. Illustrasjonsfoto.',
    photo: 'aar-02-litago.jpg',
    min: 1970,
    max: 2010,
    answer: 1994,
    note: '1994. Lansert som et barnekonsept — så viste det seg at det stort sett var ungdom og voksne som drakk det. Litago er yngre enn de fleste i dette rommet.',
    source: 'https://www.tine.no/merkevarer/litago/artikler/historien-om-litago',
  },
  {
    kind: 'price',
    prompt: 'Hva koster denne brukte bunaden på Finn?',
    photoHint: 'Annonsen for en brukt øst-telemarksbunad, med prisen sladdet.',
    photo: 'pris-03-bunad.jpg',
    unitLabel: 'hele bunaden, brukt',
    source: 'https://www.finn.no/recommerce/forsale/item/455740691',
    answer: 102000,
    note: '102 000 kr. Brukt. Det er to traktorer og litt til, eller en hel hytte i Leksvik med noen tusen til overs.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-03-melkemaskin.mp3',
    clip: 'lyd-03-melkemaskin.mp3',
    options: [
      'En respirator',
      'En melkemaskin i fjøset',
      'En gammel oljekjele',
      'En luftpumpe på bensinstasjonen',
    ],
    answer: 1,
    note: 'En melkemaskin. Pulseringen etterligner kalvens rytme — det er derfor den lyder som noe som puster.',
  },

  {
    kind: 'year',
    prompt: 'Når ble TINE tatt i bruk som navn på meierisamvirket?',
    photoHint: 'Foto: TINE-kartonger, 1995.',
    photo: 'aar-03-tine.jpg',
    min: 1960,
    max: 2005,
    answer: 1992,
    note: 'Sommeren 1992. Logoen hadde vært i bruk siden 1973, men navnet på selve samvirket kom først i 92.',
    source: 'https://snl.no/Tine_-_n%C3%A6ringsmiddelkonsern',
  },
  {
    kind: 'price',
    prompt: 'Hva koster dette spikerteltet med campingvogn?',
    photoHint: 'Annonsen for spikertelt med Hobby 720-vogn på Våberg Camping, med prisen sladdet.',
    photo: 'pris-04-spikertelt.jpg',
    unitLabel: 'vogn og telt samlet',
    source: 'https://www.finn.no/recommerce/forsale/item/464066904',
    answer: 420000,
    note: '420 000 kr. Hytta i Leksvik — 62 kvadratmeter, innlagt vann og strøm, peis og utsikt — lå ute til 100 000. Det er fire spikertelt per hytte.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-04-rulletrapp.mp3',
    clip: 'lyd-04-rulletrapp.mp3',
    options: ['En rulletrapp', 'En heis', 'Et tog som bremser inn', 'En vaskemaskin'],
    answer: 0,
    note: 'En rulletrapp. Du kjører en hver uke og kunne ikke beskrevet lyden om livet stod på spill.',
  },

  {
    kind: 'year',
    prompt: 'Når ble Grandiosa lansert?',
    photoHint: 'Foto: Grandiosa, fortsatt frossen.',
    photo: 'aar-04-grandiosa.jpg',
    min: 1960,
    max: 2000,
    answer: 1980,
    note: '1980. Norges mest spiste pizza siden, og fortsatt gjenstand for uenighet om hvorvidt den skal ha ekstra ost.',
    source: 'https://www.grandiosa.no/om-grandiosa/tidslinje/',
  },
  {
    kind: 'price',
    prompt: 'Hva koster denne brukte melkeroboten?',
    photoHint: 'Annonsen for en DeLaval melkerobot Classic 2012, med prisen sladdet.',
    photo: 'pris-05-melkerobot.jpg',
    unitLabel: 'brukt, hele roboten',
    source: 'https://www.finn.no/recommerce/forsale/item/472064426',
    answer: 250000,
    note: '250 000 kr brukt. En ny koster godt over millionen. Det lå en til ute på 450 000 samtidig.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-05-oppskjaermaskin.mp3',
    clip: 'lyd-05-oppskjaermaskin.mp3',
    options: [
      'En oppskjærmaskin hos slakteren',
      'En brødrister',
      'En kopimaskin',
      'En elektrisk hekksaks',
    ],
    answer: 0,
    note: 'Oppskjærmaskinen. Du har stått i kø bak den i tjue år uten å tenke over det.',
  },

  {
    kind: 'year',
    prompt: 'Når startet produksjonen av potetgull i Norge?',
    photoHint: 'Foto: potetgull. Illustrasjonsfoto.',
    photo: 'aar-06-potetgull.jpg',
    min: 1920,
    max: 1980,
    answer: 1936,
    note: '1936, hos Maarud. Og «potetgull» er ikke et vanlig norsk ord — det er et varemerke. Resten heter chips.',
    source: 'https://en.wikipedia.org/wiki/Maarud',
  },
  {
    kind: 'price',
    prompt: 'Hva koster disse to Stressless-stolene med krakk?',
    photoHint: 'Annonsen for to Stressless-stoler med krakk, med prisen sladdet.',
    photo: 'pris-06-lenestol.jpg',
    unitLabel: 'for begge stolene',
    source: 'https://www.finn.no/recommerce/forsale/item/471410799',
    answer: 2000,
    note: '2 000 kr for begge — krakkene inkludert. Det norske stuemøbelet taper seg raskere enn du tror.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-06-batmotor.mp3',
    clip: 'lyd-06-batmotor.mp3',
    options: [
      'Et damplokomotiv som står stille',
      'En gammel enstempers båtmotor',
      'En hjullaster på tomgang',
      'En vedkløyver',
    ],
    answer: 1,
    note: 'En gammel enstempers båtmotor — glødehode, eller semidiesel. Du varmet opp toppen med blåselampe før start, og så gikk den til den gikk tom. Den lyden var Norskekysten i femti år.',
  },

  {
    kind: 'year',
    prompt: 'Når ble Elopak grunnlagt?',
    photoHint: 'Foto: melkekartonger i butikkhylle. Illustrasjonsfoto.',
    photo: 'aar-07-elopak.jpg',
    min: 1935,
    max: 1985,
    answer: 1957,
    note: '1957. Norsk selskap, amerikansk lisens — Pure-Pak, patentert helt tilbake i 1915. Melka di ligger i en 70 år gammel idé.',
    source: 'https://snl.no/Elopak_ASA',
  },
  {
    kind: 'price',
    prompt: 'Hva koster denne brukte Stressless-hjørnesofaen?',
    photoHint: 'Annonsen for en Stressless Stella hjørnesofa med pall, med prisen sladdet.',
    photo: 'pris-07-sofa.jpg',
    unitLabel: 'hele sofaen',
    source: 'https://www.finn.no/recommerce/forsale/item/468262052',
    answer: 75000,
    note: '75 000 kr. Samme merke som de to stolene til 2 000 kr lenger bak i quizen. Det er 37 stolpar per sofa.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-07-gulvvasker.mp3',
    clip: 'lyd-07-gulvvasker.mp3',
    options: [
      'En gulvvaskemaskin på et kjøpesenter',
      'En støvsuger',
      'En gressklipper',
      'En snøfreser',
    ],
    answer: 0,
    note: 'Gulvvaskemaskinen. Den du alltid må gå rundt på kjøpesenteret, og som du aldri har sett ordentlig på.',
  },

  {
    kind: 'year',
    prompt: 'Når startet osteproduksjonen på Nittedal Meieri — osten som ble Norvegia?',
    photoHint: 'Norsk Gouda, senere Norvegia. Uten bilde — vi fant ingen fritt lisensiert.',
    min: 1820,
    max: 1920,
    answer: 1859,
    note: '1859. Hollenderne lærte oss håndverket, men fettinnholdet holdt ikke hollandsk mål — derfor heter den Norvegia og ikke gouda.',
    source: 'https://www.tine.no/merkevarer/norvegia/artikler/historien-om-norvegia',
  },
  {
    kind: 'price',
    prompt: 'Hva koster et utstoppet elghode på Finn?',
    photoHint: 'Annonsen for et utstoppet elghode på veggplate, med prisen sladdet.',
    photo: 'pris-08-elghode.jpg',
    unitLabel: 'ett hode',
    source: 'https://www.finn.no/recommerce/forsale/item/466295748',
    answer: 3000,
    note: '3 000 kr. Det lå åtte av dem ute samtidig, fra 3 000 til 8 000. Markedet for utstoppet elg er større enn du trodde, og prisen lavere.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-08-eltemaskin.mp3',
    clip: 'lyd-08-eltemaskin.mp3',
    options: [
      'En eltemaskin hos bakeren',
      'En sementblander',
      'En oppvaskmaskin',
      'En vaskemaskin med skjev last',
    ],
    answer: 0,
    note: 'Eltemaskinen hos bakeren. Deig i spiralmikser lyder nesten nøyaktig som betong, og det er ingen trøst for noen av dem.',
  },

  {
    kind: 'year',
    prompt: 'Når ble dette bildet tatt?',
    photoHint: 'Foto: folk som venter på Nationaltheatret stasjon.',
    photo: 'aar-09-nationaltheatret.jpg',
    min: 1900,
    max: 1960,
    answer: 1928,
    note: '1928. Se på hattene. Alle har hatt.',
  },
  {
    kind: 'price',
    prompt: 'Hva koster dette mikrohuset på hjul?',
    photoHint: 'Annonsen for et mikrohus på hjul, 18 m² med off-grid-mulighet, med prisen sladdet.',
    photo: 'pris-09-mikrohus.jpg',
    unitLabel: 'hele huset',
    answer: 600000,
    note: '600 000 kr for 18 kvadratmeter på hjul. Hytta i Leksvik er 62 kvadratmeter med innlagt vann, strøm og utsikt, og kostet en sjettedel.',
    source: 'https://www.finn.no/recommerce/forsale/item/410676404',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-09-kassaapparat.mp3',
    clip: 'lyd-09-kassaapparat.mp3',
    options: ['Et kassaapparat', 'En billettautomat', 'En kopimaskin', 'En stemplingsklokke'],
    answer: 0,
    note: 'Et kassaapparat. Alle fire piper likt, og det er nettopp derfor det er vanskelig.',
  },

  {
    kind: 'year',
    prompt: 'Omtrent når var glassflaskene borte fra norske melkeruter?',
    photoHint: 'Foto: melkekartong. Illustrasjonsfoto — og ja, det er en konkurrent. Bytt bildet.',
    photo: 'aar-10-melkekartong.jpg',
    min: 1945,
    max: 1990,
    answer: 1967,
    note: 'Rundt 1967. Kartongen kom på 50-tallet med Asker Meieri først ute, og ti år senere var flaskene så godt som borte. Dette er det dårligst kildebelagte spørsmålet i settet — sjekk det eller kutt det.',
  },
  {
    kind: 'price',
    prompt: 'Hva koster disse Dexter-kvigekalvene på Finn?',
    photoHint: 'Annonsen for Dexter kvigekalver i Farsund, med prisen sladdet.',
    photo: 'pris-10-kvige.jpg',
    unitLabel: 'slik annonsen stod',
    source: 'https://www.finn.no/recommerce/forsale/item/364986784',
    answer: 15000,
    note: '15 000 kr slik annonsen stod. Sjekk om det er per kalv eller for hele slengen før du bruker spørsmålet — annonseteksten er tvetydig.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'lyd-10-vaskeanlegg.mp3',
    clip: 'lyd-10-vaskeanlegg.mp3',
    options: [
      'En oppvaskmaskin på et storkjøkken',
      'Vaskeanlegget som spyler melkeanlegget rent',
      'En kaffemaskin som renser seg',
      'En vaskemaskin på sentrifuge',
    ],
    answer: 1,
    note: 'Vaskeanlegget som spyler melkeanlegget rent. Det går etter hver eneste melking, hver eneste dag, i hele landet — og ingen av dere visste hvordan det hørtes ut.',
  },
];

export const QUESTION_COUNT = QUESTIONS.length;
export const MAX_SCORE = QUESTION_COUNT * POINTS_PER_QUESTION;

/** Always returns a question — the index is clamped into range first. */
export function questionAt(idx: number): Question {
  const safe = QUESTIONS[clamp(Math.trunc(idx) || 0, 0, QUESTION_COUNT - 1)];
  if (!safe) throw new Error('QUESTIONS is empty — the quiz needs at least one question.');
  return safe;
}
