import { useEffect, useRef } from 'react';
import type { Dispatch } from 'react';
import { copy } from '../copy';
import { QUESTION_COUNT, questionAt } from '../data/questions';
import { answerLabel } from '../lib/results';
import type { ClipPlayer } from '../lib/useClipPlayer';
import type { QuizAction, QuizState } from '../state/quizState';
import { clipButtonLabel } from './QuestionMedia';

interface Props {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
  player: ClipPlayer;
}

/**
 * The projector view. Sized in vmin so a wide-but-short mirrored display never
 * clips the host's advance control.
 */
export function RevealOverlay({ state, dispatch, player }: Props) {
  const question = questionAt(state.idx);
  const isLast = state.idx + 1 >= QUESTION_COUNT;
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div
      ref={dialogRef}
      className="reveal"
      role="dialog"
      aria-modal="true"
      aria-label={copy.reveal.dialogLabel}
      tabIndex={-1}
    >
      <div className="reveal-top">
        <span className="reveal-kicker">
          {copy.kind[question.kind]} · {copy.quiz.progress(state.idx + 1, QUESTION_COUNT)}
        </span>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch({ type: 'closeReveal' })}
        >
          {copy.reveal.close}
        </button>
      </div>

      <div className="reveal-body">
        <p className="reveal-prompt">{question.prompt}</p>
        <p className="reveal-answer">{answerLabel(question, question.answer)}</p>
        <p className="reveal-note">{question.note}</p>
      </div>

      {question.kind === 'sound' && (
        <div className="reveal-play">
          <button type="button" className="btn btn-primary" onClick={player.toggle}>
            {clipButtonLabel(player)}
          </button>
          <span>{question.clipName}</span>
        </div>
      )}

      <div className="reveal-foot">
        {question.source && (
          <a href={question.source} target="_blank" rel="noopener noreferrer">
            {copy.reveal.source}
          </a>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => dispatch({ type: 'hostNext' })}
        >
          {isLast ? copy.host.finish : copy.host.next}
        </button>
      </div>
    </div>
  );
}
