import type { Question } from '../data/questions';
import { POINTS_PER_QUESTION } from '../data/questions';
import { clamp } from './format';

/** Points lost per year of error — zero points at 20 years off. */
const POINTS_PER_YEAR_OFF = 5;
/** Relative price error that scores zero: 60 % off. */
const PRICE_ERROR_AT_ZERO = 0.6;

/** A year, an amount in kroner, or an index into a sound question's options. */
export type Answer = number | null;

/** Unanswered questions score 0. Formulas are never shown to players. */
export function scoreQuestion(question: Question, answer: Answer): number {
  if (answer === null || !Number.isFinite(answer)) return 0;

  switch (question.kind) {
    case 'year':
      return clamp(
        POINTS_PER_QUESTION - Math.abs(answer - question.answer) * POINTS_PER_YEAR_OFF,
        0,
        POINTS_PER_QUESTION,
      );
    case 'price': {
      // Percentage error is undefined for a free item, and dividing by it
      // would score every player NaN. FINN is full of "gis bort" listings,
      // so this is a real thing to author by accident.
      if (question.answer <= 0) {
        return answer === question.answer ? POINTS_PER_QUESTION : 0;
      }
      const error = Math.abs(answer - question.answer) / question.answer;
      return clamp(
        Math.round(POINTS_PER_QUESTION * (1 - error / PRICE_ERROR_AT_ZERO)),
        0,
        POINTS_PER_QUESTION,
      );
    }
    case 'sound':
      return answer === question.answer ? POINTS_PER_QUESTION : 0;
  }
}
