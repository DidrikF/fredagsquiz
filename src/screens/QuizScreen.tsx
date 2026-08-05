import { useRef } from 'react';
import type { Dispatch, KeyboardEvent } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionPhoto, SoundNotice } from '../components/QuestionMedia';
import { copy } from '../copy';
import type { PriceQuestion, SoundQuestion, YearQuestion } from '../data/questions';
import { QUESTION_COUNT, questionAt } from '../data/questions';
import type { QuizAction, QuizState } from '../state/quizState';
import { isAdvanceDisabled, yearValue } from '../state/quizState';

const LETTERS = ['A', 'B', 'C', 'D'];

interface Props {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

export function QuizScreen({ state, dispatch }: Props) {
  const question = questionAt(state.idx);
  const isLast = state.idx + 1 >= QUESTION_COUNT;

  return (
    <div className="screen screen-quiz">
      <div className="q-meta">
        <span className="tag tag-accent-2">{copy.kind[question.kind]}</span>
        <span className="q-count">{copy.quiz.progress(state.idx + 1, QUESTION_COUNT)}</span>
      </div>
      <ProgressBar current={state.idx + 1} total={QUESTION_COUNT} />

      <h2 className="q-prompt">{question.prompt}</h2>

      {question.kind === 'sound' ? (
        <SoundNotice />
      ) : (
        <QuestionPhoto question={question} variant="participant" />
      )}

      {question.kind === 'year' && (
        <YearInput question={question} value={yearValue(state)} dispatch={dispatch} />
      )}
      {question.kind === 'price' && (
        <PriceInput question={question} value={state.draftPrice} dispatch={dispatch} />
      )}
      {question.kind === 'sound' && (
        <SoundOptions
          question={question}
          selected={state.draftSound}
          onSelect={(index) => dispatch({ type: 'selectSound', index })}
        />
      )}

      <p className="text-muted q-caveat">{copy.quiz.caveat}</p>
      <button
        type="button"
        className="btn btn-primary btn-advance"
        disabled={isAdvanceDisabled(state)}
        onClick={() => dispatch({ type: 'advance' })}
      >
        {isLast ? copy.quiz.finish : copy.quiz.next}
      </button>
    </div>
  );
}

interface YearProps {
  question: YearQuestion;
  value: number;
  dispatch: Dispatch<QuizAction>;
}

function YearInput({ question, value, dispatch }: YearProps) {
  return (
    <div className="year-input">
      <label className="label-strong" htmlFor="fq-year">
        {copy.quiz.yearLabel}
      </label>
      <div className="year-row">
        <button
          type="button"
          className="btn btn-secondary btn-step"
          aria-label={copy.quiz.yearDown}
          onClick={() => dispatch({ type: 'stepYear', delta: -1 })}
        >
          −
        </button>
        <div className="year-value" aria-live="polite">
          {value}
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-step"
          aria-label={copy.quiz.yearUp}
          onClick={() => dispatch({ type: 'stepYear', delta: 1 })}
        >
          +
        </button>
      </div>
      <input
        id="fq-year"
        type="range"
        min={question.min}
        max={question.max}
        step={1}
        value={value}
        onChange={(event) => dispatch({ type: 'setYear', value: Number(event.target.value) })}
      />
      <div className="year-bounds text-muted">
        <span>{question.min}</span>
        <span>{question.max}</span>
      </div>
    </div>
  );
}

interface PriceProps {
  question: PriceQuestion;
  value: string;
  dispatch: Dispatch<QuizAction>;
}

function PriceInput({ question, value, dispatch }: PriceProps) {
  return (
    <div className="field">
      <label className="label-strong" htmlFor="fq-price">
        {copy.quiz.priceLabel} <span className="text-muted">({question.unitLabel})</span>
      </label>
      <div className="price-row">
        <input
          id="fq-price"
          className="input"
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          enterKeyHint="done"
          placeholder={copy.quiz.pricePlaceholder}
          value={value}
          onChange={(event) => dispatch({ type: 'setPrice', value: event.target.value })}
        />
        <span className="price-unit" aria-hidden="true">
          {copy.quiz.priceSuffix}
        </span>
      </div>
    </div>
  );
}

interface SoundProps {
  question: SoundQuestion;
  selected: number | null;
  onSelect: (index: number) => void;
}

function SoundOptions({ question, selected, onSelect }: SoundProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const count = question.options.length;
  const focusIndex = selected ?? 0;

  const moveTo = (index: number) => {
    const next = (index + count) % count;
    onSelect(next);
    buttons.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number | undefined> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: count - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    moveTo(target);
  };

  return (
    <div role="radiogroup" aria-label={copy.quiz.optionsLabel} className="options">
      {question.options.map((label, index) => (
        <button
          key={label}
          type="button"
          role="radio"
          className="option"
          aria-checked={selected === index}
          tabIndex={index === focusIndex ? 0 : -1}
          ref={(element) => {
            buttons.current[index] = element;
          }}
          onClick={() => onSelect(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          <span className="option-letter" aria-hidden="true">
            {LETTERS[index] ?? index + 1}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
