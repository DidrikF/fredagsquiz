import { clamp } from '../lib/format';

/*
 * The whole quiz lives in this file. Nine questions, three of each kind,
 * alternating year → price → sound. The count is data driven: the maximum
 * score is `QUESTIONS.length * 100`, so adding or removing a question needs
 * no other change anywhere.
 *
 * Media: drop the files in `public/media/` and reference them by file name.
 *   year/price → `photo: 'kontoret-2013.jpg'`
 *   sound      → `clip: 'klipp-01.mp3'`
 * A question without a file still works — the photo becomes a placeholder
 * block and the play button simulates a three second clip.
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
    prompt: 'Når ble dette bildet tatt?',
    photoHint: 'Foto: kontoret vårt, før noen kom på å vaske vinduene.',
    min: 1995,
    max: 2025,
    answer: 2013,
    note: 'Bildet lå i en mappe som het «IKKE SLETT». Ingen vet hvem som tok det.',
  },
  {
    kind: 'price',
    prompt: 'Hva koster kaffen vår hos leverandøren?',
    photoHint: 'Foto: sekken ved siden av maskinen i tredje etasje.',
    unitLabel: 'per kilo',
    answer: 389,
    note: '389 kr kiloen. Du drikker omtrent 4 kr hver gang du fyller koppen, og du fyller den ofte.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'klipp-01.mp3',
    options: [
      'Kaffemaskinen som maler bønner',
      'Printeren i andre etasje',
      'En elbil som rygger',
      'Oppvaskmaskinen på kjøkkenet',
    ],
    answer: 1,
    note: 'Printeren. Den har hatt den lyden i fire år, og nei, det er ikke normalt.',
  },
  {
    kind: 'year',
    prompt: 'Når kom denne maskinen på markedet?',
    photoHint:
      'Foto: en beige PC som fortsatt står på pulten til noen som insisterer på at den var raskere.',
    min: 1985,
    max: 2010,
    answer: 1997,
    note: '1997. Den hadde 32 MB minne, og eieren husker det som «helt nok».',
  },
  {
    kind: 'price',
    prompt: 'Hva koster denne over disk på Fisketorget?',
    photoHint: 'Foto: én fersk laks, 4,2 kilo, sett ovenfra.',
    unitLabel: 'hele fisken',
    answer: 620,
    note: '620 kr for hele fisken. Under 150 kr kiloen, altså billigere enn de fleste gjettet.',
    source: 'https://www.ssb.no/',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'klipp-02.mp3',
    options: [
      'Snøbrøyting i gata',
      'Et vaffeljern som varmes opp',
      'Teams-ringetonen',
      'En sykkelbjelle',
    ],
    answer: 2,
    note: 'Teams-ringetonen. Halve rommet fikk en fysisk reaksjon.',
  },
  {
    kind: 'year',
    prompt: 'Når var denne firmaturen?',
    photoHint: 'Foto: fjorten personer i regntøy, ingen smiler.',
    min: 2010,
    max: 2025,
    answer: 2019,
    note: '2019. Det er den turen ingen snakker om, og nå snakket vi om den.',
  },
  {
    kind: 'price',
    prompt: 'Hva koster ett slikt tastatur?',
    photoHint: 'Foto: det mekaniske tastaturet som lager mest lyd i åpent landskap.',
    unitLabel: 'per stykk',
    answer: 2690,
    note: '2 690 kr. Eieren kaller det «en investering i arbeidsflyt». Naboene kaller det noe annet.',
  },
  {
    kind: 'sound',
    prompt: 'Hva hørte du?',
    clipName: 'klipp-03.mp3',
    options: [
      'En måke på taket',
      'Sekkepipe i det fjerne',
      'En kaffekopp som veltet',
      'Brannalarmtesten',
    ],
    answer: 0,
    note: 'En måke. Den bor på taket, den har alltid bodd på taket, og den kommer til å overleve oss alle.',
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
