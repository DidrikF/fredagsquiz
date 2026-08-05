import { useEffect } from 'react';
import type { Dispatch } from 'react';
import { copy } from '../copy';
import type { QuizAction } from '../state/quizState';

/** How long the armed state lasts before it disarms itself. */
const ARMED_MS = 6000;

interface Props {
  armed: boolean;
  dispatch: Dispatch<QuizAction>;
}

/**
 * Reset, available on every screen. Two taps, because one stray tap during
 * question six would wipe a colleague's whole run — and it disarms itself if
 * the second tap never comes.
 */
export function ResetFooter({ armed, dispatch }: Props) {
  useEffect(() => {
    if (!armed) return;
    const timer = window.setTimeout(() => dispatch({ type: 'disarmReset' }), ARMED_MS);
    return () => clearTimeout(timer);
  }, [armed, dispatch]);

  if (!armed) {
    return (
      <div className="reset-footer">
        <button
          type="button"
          className="btn btn-ghost btn-link reset-open"
          onClick={() => dispatch({ type: 'armReset' })}
        >
          {copy.reset.open}
        </button>
      </div>
    );
  }

  return (
    <div className="reset-footer is-armed">
      <p className="reset-hint">{copy.reset.hint}</p>
      <div className="reset-buttons">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch({ type: 'disarmReset' })}
        >
          {copy.reset.cancel}
        </button>
        <button
          type="button"
          className="btn btn-primary reset-confirm"
          onClick={() => dispatch({ type: 'restart' })}
        >
          {copy.reset.confirm}
        </button>
      </div>
    </div>
  );
}
