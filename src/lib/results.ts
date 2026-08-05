import { copy } from '../copy';
import type { Question } from '../data/questions';
import { MAX_SCORE, QUESTIONS } from '../data/questions';
import { clamp, formatDecimal, formatNumber } from './format';
import type { Answer } from './scoring';
import { scoreQuestion } from './scoring';

/* Marks are held away from the card edges so their labels stay on the card. */
const MARK_MIN_PERCENT = 7;
const MARK_MAX_PERCENT = 93;
/* Price scale: 0 … max(truth, guess) × 1.15, so a wild overshoot is physically long. */
const PRICE_HEADROOM = 1.15;
const PRICE_MIN_SPAN = 1.6;
/* Wording thresholds for the signed sentence under the line. */
const DECADE_YEARS = 20;
const TIMES_THE_PRICE = 3;
const THIRD_OF_THE_PRICE = 0.34;
/* Emoji strip, one square per question. */
const GREEN_AT = 80;
const YELLOW_AT = 40;

interface ResultRowBase {
  key: string;
  kindLabel: string;
  prompt: string;
  points: number;
  note: string;
  source: string | undefined;
  guessLabel: string;
  truthLabel: string;
}

export interface DistanceRow extends ResultRowBase {
  kind: 'distance';
  gapLabel: string;
  guessPercent: number;
  truthPercent: number;
  gapLeftPercent: number;
  gapWidthPercent: number;
}

export interface SoundRow extends ResultRowBase {
  kind: 'sound';
  correct: boolean;
}

export type ResultRow = DistanceRow | SoundRow;

export interface Results {
  rows: ResultRow[];
  total: number;
  maxScore: number;
  emojiStrip: string;
  verdict: string;
  summary: string;
}

export function buildResults(answers: readonly Answer[], name: string): Results {
  const rows = QUESTIONS.map((question, index) =>
    buildRow(question, answers[index] ?? null, index),
  );
  const total = rows.reduce((sum, row) => sum + row.points, 0);
  const emojiStrip = rows.map((row) => emojiFor(row.points)).join('');

  return {
    rows,
    total,
    maxScore: MAX_SCORE,
    emojiStrip,
    verdict: copy.results.verdict(MAX_SCORE === 0 ? 0 : total / MAX_SCORE),
    summary: copy.results.summary(name, total, MAX_SCORE, emojiStrip),
  };
}

export function answerLabel(question: Question, answer: Answer): string {
  if (answer === null) return '—';
  switch (question.kind) {
    case 'year':
      return String(answer);
    case 'price':
      return `${formatNumber(answer)} kr`;
    case 'sound':
      return question.options[answer] ?? '—';
  }
}

function buildRow(question: Question, answer: Answer, index: number): ResultRow {
  const base: ResultRowBase = {
    key: `${index}-${question.kind}`,
    kindLabel: copy.kind[question.kind],
    prompt: question.kind === 'sound' ? question.prompt : question.photoHint || question.prompt,
    points: scoreQuestion(question, answer),
    note: question.note,
    source: question.source,
    guessLabel: answerLabel(question, answer),
    truthLabel: answerLabel(question, question.answer),
  };

  if (question.kind === 'sound') {
    return {
      ...base,
      kind: 'sound',
      guessLabel: answer === null ? copy.results.noAnswer : base.guessLabel,
      correct: answer === question.answer,
    };
  }

  const truth = question.answer;
  const guess = answer ?? truth;
  const [low, high] =
    question.kind === 'year'
      ? [Math.min(question.min, guess), Math.max(question.max, guess)]
      : [0, Math.max(Math.max(truth, guess) * PRICE_HEADROOM, truth * PRICE_MIN_SPAN)];

  const guessPercent = percentOf(guess, low, high);
  const truthPercent = percentOf(truth, low, high);

  return {
    ...base,
    kind: 'distance',
    gapLabel: gapLabelFor(question, answer),
    guessPercent: clamp(guessPercent, MARK_MIN_PERCENT, MARK_MAX_PERCENT),
    truthPercent: clamp(truthPercent, MARK_MIN_PERCENT, MARK_MAX_PERCENT),
    gapLeftPercent: Math.min(guessPercent, truthPercent),
    gapWidthPercent: Math.abs(guessPercent - truthPercent),
  };
}

/** The signed sentence under the line — direction in words, never by colour. */
function gapLabelFor(question: Question, answer: Answer): string {
  if (answer === null) return copy.results.unanswered;

  const difference = answer - question.answer;
  if (question.kind === 'year') {
    if (difference === 0) return copy.results.bullseyeYear;
    const years = Math.abs(difference);
    const suffix = years >= DECADE_YEARS ? copy.results.yearDecadeSuffix : '';
    return copy.results.yearGap(formatNumber(years), difference > 0) + suffix;
  }

  if (difference === 0) return copy.results.bullseyePrice;
  const errorPercent = Math.round((Math.abs(difference) / question.answer) * 100);
  const times = answer / question.answer;
  const suffix =
    times >= TIMES_THE_PRICE
      ? copy.results.priceTimesSuffix(formatDecimal(times))
      : times <= THIRD_OF_THE_PRICE
        ? copy.results.priceThirdSuffix
        : '';
  return copy.results.priceGap(formatNumber(Math.abs(difference)), difference > 0, errorPercent) + suffix;
}

function percentOf(value: number, low: number, high: number): number {
  if (high <= low) return 50;
  return clamp(((value - low) / (high - low)) * 100, 0, 100);
}

function emojiFor(points: number): string {
  if (points >= GREEN_AT) return '🟩';
  if (points >= YELLOW_AT) return '🟨';
  return points > 0 ? '🟧' : '⬜';
}
