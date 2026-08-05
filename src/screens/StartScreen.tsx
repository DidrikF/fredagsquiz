import type { Dispatch } from 'react';
import { copy } from '../copy';
import { QUESTION_COUNT } from '../data/questions';
import type { QuizAction, QuizState } from '../state/quizState';

interface Props {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

export function StartScreen({ state, dispatch }: Props) {
  const startDisabled = state.name.trim() === '';

  return (
    <div className="screen screen-start">
      <div className="start-mark" aria-hidden="true">
        {copy.start.mark}
      </div>

      <div>
        <h1 className="start-title">{copy.start.title}</h1>
        <p className="start-lede">{copy.start.lede(QUESTION_COUNT)}</p>
      </div>

      {state.presenter ? (
        <div className="dark-panel">
          <span className="kicker">{copy.start.presenterKicker}</span>
          <p>{copy.start.presenterBody}</p>
          <button
            type="button"
            className="btn btn-primary btn-hero"
            onClick={() => dispatch({ type: 'startHost' })}
          >
            {copy.start.presenterSubmit}
          </button>
        </div>
      ) : (
        <form
          className="start-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!startDisabled) dispatch({ type: 'start' });
          }}
        >
          <div className="field">
            <label className="label-strong" htmlFor="fq-name">
              {copy.start.nameLabel}
            </label>
            <input
              id="fq-name"
              className="input input-lg"
              autoComplete="given-name"
              enterKeyHint="go"
              placeholder={copy.start.namePlaceholder}
              value={state.name}
              onChange={(event) => dispatch({ type: 'setName', value: event.target.value })}
            />
            <p className="text-muted hint">{copy.start.nameHint}</p>
          </div>
          <button type="submit" className="btn btn-primary btn-hero" disabled={startDisabled}>
            {copy.start.submit}
          </button>
        </form>
      )}

      <div className="host-unlock">
        <button
          type="button"
          className="btn btn-ghost btn-link"
          aria-expanded={state.hostBoxOpen}
          aria-controls="fq-host-box"
          onClick={() => dispatch({ type: 'toggleHostBox' })}
        >
          {copy.start.hostToggle}
        </button>

        {state.hostBoxOpen && (
          <form
            id="fq-host-box"
            className="code-box"
            onSubmit={(event) => {
              event.preventDefault();
              dispatch({ type: 'submitCode' });
            }}
          >
            <label className="label-strong" htmlFor="fq-code-start">
              {copy.start.codeLabel}
            </label>
            <div className="code-row">
              <input
                id="fq-code-start"
                className="input"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="go"
                placeholder={copy.start.codePlaceholder}
                value={state.code}
                onChange={(event) => dispatch({ type: 'setCode', value: event.target.value })}
              />
              <button type="submit" className="btn btn-secondary">
                {copy.start.codeSubmit}
              </button>
            </div>
            {state.codeWrong && (
              <p className="msg-error" role="alert">
                {copy.start.codeWrong}
              </p>
            )}
            {state.presenter && <p className="msg-ok">{copy.start.codeOk}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
