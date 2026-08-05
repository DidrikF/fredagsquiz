import type { Dispatch } from 'react';
import { revealCodeLabel } from '../config';
import { copy } from '../copy';
import { QUESTION_COUNT } from '../data/questions';
import type { QuizAction } from '../state/quizState';

interface Props {
  dispatch: Dispatch<QuizAction>;
}

export function HostEndScreen({ dispatch }: Props) {
  return (
    <div className="screen screen-hostend">
      <h1 className="hostend-title">{copy.hostEnd.title(QUESTION_COUNT)}</h1>
      <p className="hostend-lede">{copy.hostEnd.lede}</p>

      <div className="hostend-code">
        <span className="kicker">{copy.hostEnd.codeKicker}</span>
        <p>{revealCodeLabel()}</p>
      </div>

      <div className="hostend-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch({ type: 'hostBackToLast' })}
        >
          {copy.hostEnd.back}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-link"
          onClick={() => dispatch({ type: 'exitPresenter' })}
        >
          {copy.host.exit}
        </button>
      </div>
    </div>
  );
}
