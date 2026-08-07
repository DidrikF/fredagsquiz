import type { Dispatch } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { clipButtonLabel, QuestionPhoto } from '../components/QuestionMedia';
import { copy } from '../copy';
import { QUESTION_COUNT, questionAt } from '../data/questions';
import type { ClipPlayer } from '../lib/useClipPlayer';
import type { QuizAction, QuizState } from '../state/quizState';

interface Props {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
  player: ClipPlayer;
}

export function HostScreen({ state, dispatch, player }: Props) {
  const question = questionAt(state.idx);
  const isLast = state.idx + 1 >= QUESTION_COUNT;

  return (
    <div className="screen screen-host">
      <div className="q-meta">
        <span className="tag tag-accent">{copy.host.tag}</span>
        <span className="tag tag-accent-2">{copy.kind[question.kind]}</span>
        <span className="q-count">{copy.quiz.progress(state.idx + 1, QUESTION_COUNT)}</span>
      </div>
      <ProgressBar current={state.idx + 1} total={QUESTION_COUNT} />

      <h2 className="q-prompt-host">{question.prompt}</h2>
      {question.kind !== 'sound' && (
        <p className="text-muted q-hint-host">{question.photoHint}</p>
      )}

      {question.kind === 'sound' ? (
        <div className="clip-panel">
          <p className="clip-name">{question.clipName}</p>
          <button type="button" className="btn btn-primary btn-play" onClick={player.toggle}>
            {clipButtonLabel(player)}
          </button>
          <p className="text-muted clip-caption">{copy.host.clipCaption}</p>
          {!player.hasFile && <p className="clip-missing">{copy.clip.missing}</p>}
        </div>
      ) : (
        <QuestionPhoto question={question} variant="presenter" />
      )}

      <div className="host-actions">
        <button
          type="button"
          className="btn btn-primary btn-reveal"
          onClick={() => dispatch({ type: 'openReveal' })}
        >
          {copy.host.reveal}
        </button>
        <div className="host-nav">
          <button
            type="button"
            className="btn btn-secondary"
            disabled={state.idx === 0}
            onClick={() => dispatch({ type: 'hostPrev' })}
          >
            {copy.host.prev}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch({ type: 'hostNext' })}
          >
            {isLast ? copy.host.finish : copy.host.next}
          </button>
        </div>
      </div>

      <div className="host-foot">
        <p className="text-muted">{copy.host.noSpoiler}</p>
        <button
          type="button"
          className="btn btn-ghost btn-link"
          onClick={() => dispatch({ type: 'openFacit' })}
        >
          {copy.facit.open}
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
