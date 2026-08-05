import type { QuestionKind } from './data/questions';

/*
 * Every interface string in the app. Question content lives in
 * `data/questions.ts`; everything else is here, so translating the quiz means
 * editing one document. Norwegian bokmål, deadpan, roasting kept for the
 * results verdict and the per-question notes.
 */

const NUMBER_WORDS = [
  'null',
  'én',
  'to',
  'tre',
  'fire',
  'fem',
  'seks',
  'sju',
  'åtte',
  'ni',
  'ti',
  'elleve',
  'tolv',
];

export const copy = {
  kind: {
    year: 'Gjett året',
    price: 'Gjett prisen',
    sound: 'Gjett lyden',
  } satisfies Record<QuestionKind, string>,

  start: {
    mark: '?',
    title: 'Fredags­quizen',
    lede: (count: number) =>
      `${capitalize(numberWord(count))} spørsmål. Gjett årstall, gjett pris, gjett lyd. Du får ingen tilbakemelding underveis — svarene låses opp når programlederen sier kodeordet.`,
    nameLabel: 'Hva heter du?',
    namePlaceholder: 'Fornavn holder',
    nameHint: 'Brukes bare til å merke ditt eget resultat. Sendes ingen steder.',
    submit: 'Start quizen',
    presenterKicker: 'Programledermodus',
    presenterBody:
      'Du svarer ikke selv. Du viser spørsmålet, spiller lydklippene så mange ganger rommet trenger, og avslører fasiten når alle er ferdige.',
    presenterSubmit: 'Start presentasjonen',
    hostToggle: 'Er du programleder?',
    codeLabel: 'Kodeord for programleder',
    codePlaceholder: 'kodeord',
    codeSubmit: 'Lås opp',
    codeWrong: '✕ Feil kodeord. Ikke noe drama, prøv igjen.',
    codeOk: '✓ Programledermodus er på.',
  },

  quiz: {
    progress: (current: number, total: number) => `Spørsmål ${current} av ${total}`,
    progressLabel: 'Fremdrift',
    soundNotice: 'Klippet spilles høyt i rommet. Ingen lyd på din telefon.',
    yearLabel: 'Ditt årstall',
    yearSlider: 'Velg årstall',
    yearDown: 'Ett år tidligere',
    yearUp: 'Ett år senere',
    priceLabel: 'Din pris',
    priceSuffix: 'kr',
    pricePlaceholder: '0',
    optionsLabel: 'Hvilken lyd var det?',
    caveat: 'Du kan endre svaret helt til du går videre. Etter det er det ingen vei tilbake.',
    next: 'Ferdig, neste spørsmål →',
    finish: 'Ferdig, lever svarene',
  },

  host: {
    tag: 'Programleder',
    clipPlay: '▶ Spill klippet',
    clipReplay: '↻ Spill igjen',
    clipStop: '‖ Stopp klippet',
    clipCaption: 'Spill så mange ganger rommet ber om.',
    clipMissing: 'Ingen lydfil lagt inn — knappen simulerer avspillingen.',
    reveal: 'Vis fasiten på storskjerm',
    prev: '← Forrige',
    next: 'Neste spørsmål →',
    finish: 'Avslutt runden →',
    noSpoiler: 'Fasiten vises ikke før du trykker. Ingenting her røper svaret.',
    exit: 'Avslutt programledermodus',
  },

  hostEnd: {
    title: (count: number) => `Alle ${numberWord(count)} er gjennomgått`,
    lede: 'Les kodeordet høyt. Alle skriver det inn samtidig, og resultatene åpner seg i hele rommet på én gang.',
    codeKicker: 'Kodeord',
    back: '← Tilbake til siste spørsmål',
  },

  reveal: {
    dialogLabel: 'Fasit på storskjerm',
    close: 'Lukk',
    source: 'Kilde ↗',
  },

  waiting: {
    mark: '✓',
    title: (count: number) => `Alle ${numberWord(count)} er levert`,
    lede: 'Nå venter vi på resten av rommet. Programlederen leser kodeordet høyt når alle er ferdige — skriv det inn her, og resultatet ditt åpner seg.',
    codeLabel: 'Kodeord',
    codePlaceholder: 'hør godt etter',
    submit: 'Åpne resultatet',
    codeWrong: '✕ Nei. Det var ikke kodeordet. Spør sidemannen.',
    foot: 'Svarene dine ligger trygt på denne telefonen. Du kan låse skjermen i mellomtiden.',
  },

  results: {
    anonymous: 'Anonym kollega',
    outOf: (max: number) => ` / ${max}`,
    points: ' p',
    verdict: (ratio: number) =>
      ratio >= 7 / 9
        ? 'Mistenkelig bra. Har du lest deg opp?'
        : ratio >= 1 / 2
          ? 'Midt på treet, som resten av oss.'
          : ratio >= 2 / 9
            ? 'Du var i nærheten av noe. Ikke av svaret.'
            : 'Dette var ikke din dag. Det var fortsatt fredag.',
    guessCaption: 'du',
    truthCaption: 'riktig',
    noAnswer: 'ingen svar',
    unanswered: 'Du svarte ikke. Modig.',
    bullseyeYear: 'Blink. Helt riktig år.',
    bullseyePrice: 'Blink. Krone for krone.',
    yearGap: (years: string, tooLate: boolean) => `${years} år ${tooLate ? 'for sent' : 'for tidlig'}`,
    yearDecadeSuffix: ' — altså et annet tiår, egentlig.',
    priceGap: (amount: string, tooMuch: boolean, errorPercent: number) =>
      `${amount} kr ${tooMuch ? 'for mye' : 'for lite'} (${errorPercent} %)`,
    priceGapFree: (amount: string) => `${amount} kr for mye. Den var gratis.`,
    priceTimesSuffix: (times: string) => ` — ${times} ganger prisen.`,
    priceThirdSuffix: ' — under en tredjedel av prisen.',
    yourPick: (label: string) => `Du: ${label}`,
    correctPick: (label: string) => `Riktig: ${label}`,
    source: 'Kilde ↗',
    summaryTitle: 'Lim inn i Slack-tråden',
    summary: (name: string, total: number, max: number, strip: string) =>
      `Fredagsquizen — ${name}\n${total} av ${max} poeng\n${strip}`,
    copy: 'Kopier linjen',
    copied: '✓ Kopiert',
    restart: 'Nullstill og start på nytt',
  },
};

function numberWord(value: number): string {
  return NUMBER_WORDS[value] ?? String(value);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
