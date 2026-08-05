import { matchesRevealCode } from '../config';
import { QUESTION_COUNT, questionAt } from '../data/questions';
import { clamp } from '../lib/format';
import type { Answer } from '../lib/scoring';
import { readJson, removeKey, writeJson } from '../lib/storage';

const STORAGE_KEY = 'fredagsquiz-v1';
const SCREENS = ['start', 'quiz', 'host', 'hostend', 'waiting', 'results'] as const;

export type Screen = (typeof SCREENS)[number];

export interface QuizState {
  screen: Screen;
  name: string;
  idx: number;
  answers: Answer[];
  presenter: boolean;
  /** Reveal-code input. Never persisted. */
  code: string;
  codeWrong: boolean;
  hostBoxOpen: boolean;
  draftYear: number | null;
  draftPrice: string;
  draftSound: number | null;
  revealOpen: boolean;
  copied: boolean;
}

export type QuizAction =
  | { type: 'setName'; value: string }
  | { type: 'start' }
  | { type: 'startHost' }
  | { type: 'toggleHostBox' }
  | { type: 'setCode'; value: string }
  | { type: 'submitCode' }
  | { type: 'setYear'; value: number }
  | { type: 'stepYear'; delta: number }
  | { type: 'setPrice'; value: string }
  | { type: 'selectSound'; index: number }
  | { type: 'advance' }
  | { type: 'hostPrev' }
  | { type: 'hostNext' }
  | { type: 'hostBackToLast' }
  | { type: 'exitPresenter' }
  | { type: 'openReveal' }
  | { type: 'closeReveal' }
  | { type: 'setCopied'; value: boolean }
  | { type: 'restart' };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.value };

    case 'start':
      return { ...state, screen: 'quiz', idx: 0, hostBoxOpen: false };

    case 'startHost':
      return { ...state, screen: 'host', idx: 0, hostBoxOpen: false, revealOpen: false };

    case 'toggleHostBox':
      return { ...state, hostBoxOpen: !state.hostBoxOpen, codeWrong: false };

    case 'setCode':
      return { ...state, code: action.value, codeWrong: false };

    case 'submitCode': {
      if (!matchesRevealCode(state.code)) return { ...state, codeWrong: true };
      if (state.screen === 'waiting') {
        return { ...state, screen: 'results', code: '', codeWrong: false };
      }
      return { ...state, presenter: true, code: '', codeWrong: false };
    }

    case 'setYear':
    case 'stepYear': {
      const question = questionAt(state.idx);
      if (question.kind !== 'year') return state;
      const next =
        action.type === 'setYear' ? action.value : yearValue(state) + action.delta;
      return { ...state, draftYear: clamp(Math.round(next), question.min, question.max) };
    }

    case 'setPrice':
      return { ...state, draftPrice: action.value };

    case 'selectSound':
      return { ...state, draftSound: action.index };

    case 'advance': {
      const answers = state.answers.slice();
      answers[state.idx] = currentDraft(state);
      if (state.idx + 1 >= QUESTION_COUNT) {
        return { ...state, answers, screen: 'waiting' };
      }
      return {
        ...state,
        answers,
        idx: state.idx + 1,
        draftYear: null,
        draftPrice: '',
        draftSound: null,
      };
    }

    case 'hostPrev':
      return goToQuestion(state, state.idx - 1);

    case 'hostNext':
      return state.idx + 1 >= QUESTION_COUNT
        ? { ...state, screen: 'hostend', revealOpen: false }
        : goToQuestion(state, state.idx + 1);

    case 'hostBackToLast':
      return { ...goToQuestion(state, QUESTION_COUNT - 1), screen: 'host' };

    case 'exitPresenter':
      return {
        ...state,
        presenter: false,
        screen: 'start',
        idx: 0,
        code: '',
        codeWrong: false,
        hostBoxOpen: false,
        revealOpen: false,
      };

    case 'openReveal':
      return { ...state, revealOpen: true };

    case 'closeReveal':
      return { ...state, revealOpen: false };

    case 'setCopied':
      return { ...state, copied: action.value };

    case 'restart':
      removeKey(STORAGE_KEY);
      return freshState();
  }
}

export function createInitialState(): QuizState {
  return restoreState(readJson(STORAGE_KEY));
}

/** Writes the resumable slice of the state; drops the key once nothing is worth resuming. */
export function persistState(state: QuizState): void {
  if (isPristine(state)) {
    removeKey(STORAGE_KEY);
    return;
  }
  writeJson(STORAGE_KEY, {
    screen: state.screen,
    name: state.name,
    idx: state.idx,
    answers: state.answers,
    presenter: state.presenter,
    draftYear: state.draftYear,
    draftPrice: state.draftPrice,
    draftSound: state.draftSound,
  });
}

/** The year slider defaults to the midpoint of the question's own range. */
export function yearValue(state: QuizState): number {
  const question = questionAt(state.idx);
  if (question.kind !== 'year') return 0;
  const midpoint = Math.round((question.min + question.max) / 2);
  return clamp(state.draftYear ?? midpoint, question.min, question.max);
}

/** What pressing "Ferdig" would record for the question on screen. */
export function currentDraft(state: QuizState): Answer {
  const question = questionAt(state.idx);
  switch (question.kind) {
    case 'year':
      return yearValue(state);
    case 'price': {
      if (state.draftPrice.trim() === '') return null;
      const value = Number(state.draftPrice);
      return Number.isFinite(value) ? value : null;
    }
    case 'sound':
      return state.draftSound;
  }
}

export function isAdvanceDisabled(state: QuizState): boolean {
  const question = questionAt(state.idx);
  switch (question.kind) {
    case 'year':
      return false;
    case 'price': {
      const value = currentDraft(state);
      return value === null || value < 0;
    }
    case 'sound':
      return state.draftSound === null;
  }
}

function goToQuestion(state: QuizState, idx: number): QuizState {
  return {
    ...state,
    idx: clamp(idx, 0, QUESTION_COUNT - 1),
    revealOpen: false,
  };
}

function freshState(): QuizState {
  return {
    screen: 'start',
    name: '',
    idx: 0,
    answers: QUESTION_COUNT > 0 ? new Array<Answer>(QUESTION_COUNT).fill(null) : [],
    presenter: false,
    code: '',
    codeWrong: false,
    hostBoxOpen: false,
    draftYear: null,
    draftPrice: '',
    draftSound: null,
    revealOpen: false,
    copied: false,
  };
}

/**
 * Rebuilds the state from whatever is in storage. Legacy and impossible
 * combinations are migrated rather than thrown away: a presenter parked on the
 * participant screen belongs on the host screen, an unknown screen belongs at
 * the start, and transient flags always come back off.
 */
function restoreState(saved: unknown): QuizState {
  const base = freshState();
  if (saved === null || typeof saved !== 'object') return base;
  const raw = saved as Record<string, unknown>;

  const presenter = raw.presenter === true;
  let screen: Screen = isScreen(raw.screen) ? raw.screen : 'start';
  if (screen === 'quiz' && presenter) screen = 'host';
  if ((screen === 'host' || screen === 'hostend') && !presenter) screen = 'start';

  return {
    ...base,
    screen,
    presenter,
    name: typeof raw.name === 'string' ? raw.name : '',
    idx: clamp(Math.trunc(Number(raw.idx)) || 0, 0, Math.max(0, QUESTION_COUNT - 1)),
    answers: normaliseAnswers(raw.answers, base.answers),
    draftYear: typeof raw.draftYear === 'number' && Number.isFinite(raw.draftYear)
      ? Math.round(raw.draftYear)
      : null,
    draftPrice: typeof raw.draftPrice === 'string' ? raw.draftPrice : '',
    draftSound: isOptionIndex(raw.draftSound) ? raw.draftSound : null,
  };
}

function normaliseAnswers(saved: unknown, fallback: Answer[]): Answer[] {
  if (!Array.isArray(saved) || saved.length !== QUESTION_COUNT) return fallback;
  return saved.map((value) =>
    typeof value === 'number' && Number.isFinite(value) ? value : null,
  );
}

function isPristine(state: QuizState): boolean {
  return (
    state.screen === 'start' &&
    !state.presenter &&
    state.name === '' &&
    state.idx === 0 &&
    state.draftYear === null &&
    state.draftPrice === '' &&
    state.draftSound === null &&
    state.answers.every((answer) => answer === null)
  );
}

function isScreen(value: unknown): value is Screen {
  return typeof value === 'string' && (SCREENS as readonly string[]).includes(value);
}

function isOptionIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value < 4;
}
