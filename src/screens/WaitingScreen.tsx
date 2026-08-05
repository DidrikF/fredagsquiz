import type { Dispatch } from 'react';
import { copy } from '../copy';
import { QUESTION_COUNT } from '../data/questions';
import type { QuizAction, QuizState } from '../state/quizState';

interface Props {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

export function WaitingScreen({ state, dispatch }: Props) {
  return (
    <div className="screen screen-waiting">
      <div className="waiting-mark" aria-hidden="true">
        {copy.waiting.mark}
      </div>

      <div>
        <h1 className="waiting-title">{copy.waiting.title(QUESTION_COUNT)}</h1>
        <p className="waiting-lede">{copy.waiting.lede}</p>
      </div>

      <form
        className="waiting-card"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch({ type: 'submitCode' });
        }}
      >
        <label htmlFor="fq-code-wait">{copy.waiting.codeLabel}</label>
        <input
          id="fq-code-wait"
          className="input"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder={copy.waiting.codePlaceholder}
          value={state.code}
          onChange={(event) => dispatch({ type: 'setCode', value: event.target.value })}
        />
        <button type="submit" className="btn btn-primary">
          {copy.waiting.submit}
        </button>
        {state.codeWrong && (
          <p className="msg-error" role="alert">
            {copy.waiting.codeWrong}
          </p>
        )}
      </form>

      <p className="text-muted waiting-foot">{copy.waiting.foot}</p>
    </div>
  );
}
