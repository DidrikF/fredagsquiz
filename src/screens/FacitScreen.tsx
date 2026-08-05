import type { Dispatch } from 'react';
import { copy } from '../copy';
import type { Question } from '../data/questions';
import { QUESTION_COUNT, QUESTIONS } from '../data/questions';
import { answerLabel } from '../lib/results';
import type { QuizAction } from '../state/quizState';

interface Props {
  dispatch: Dispatch<QuizAction>;
}

/**
 * The answer sheet. Only reachable in presenter mode, and deliberately plain —
 * it exists to be read off a laptop, not shown to a room.
 */
export function FacitScreen({ dispatch }: Props) {
  return (
    <div className="screen screen-fasit">
      <div className="fasit-head">
        <div>
          <h1 className="fasit-title">{copy.facit.title}</h1>
          <p className="fasit-lede">{copy.facit.lede(QUESTION_COUNT)}</p>
        </div>
        <div className="fasit-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch({ type: 'closeFacit' })}
          >
            {copy.facit.back}
          </button>
          <button type="button" className="btn btn-ghost btn-link" onClick={() => window.print()}>
            {copy.facit.print}
          </button>
        </div>
      </div>

      <ol className="fasit-list">
        {QUESTIONS.map((question, index) => (
          <li key={`${index}-${question.kind}`} className="fasit-item">
            <div className="fasit-item-head">
              <span className="fasit-number">{index + 1}</span>
              <span className="tag tag-neutral">{copy.kind[question.kind]}</span>
            </div>
            <p className="fasit-prompt">{question.prompt}</p>
            <FacitAnswer question={question} />
            <p className="text-muted fasit-note">{question.note}</p>
            {question.source && (
              <a
                className="fasit-source"
                href={question.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.reveal.source}
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function FacitAnswer({ question }: { question: Question }) {
  if (question.kind !== 'sound') {
    return (
      <p className="fasit-answer">
        <span className="fasit-answer-label">{copy.facit.answerLabel}</span>
        {answerLabel(question, question.answer)}
        {question.kind === 'price' && <span className="fasit-unit"> ({question.unitLabel})</span>}
      </p>
    );
  }

  return (
    <div>
      <p className="fasit-answer">
        <span className="fasit-answer-label">{copy.facit.answerLabel}</span>
        {question.options[question.answer]}
      </p>
      <ul className="fasit-options">
        {question.options.map((option, index) => (
          <li key={option} className={index === question.answer ? 'is-correct' : undefined}>
            <span aria-hidden="true">{index === question.answer ? '✓' : '·'}</span> {option}
          </li>
        ))}
      </ul>
      <p className="text-muted fasit-clip">{question.clipName}</p>
    </div>
  );
}
