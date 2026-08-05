import { useEffect, useReducer } from 'react';
import { RevealOverlay } from './components/RevealOverlay';
import { questionAt } from './data/questions';
import { mediaUrl } from './lib/media';
import { useClipPlayer } from './lib/useClipPlayer';
import { HostEndScreen } from './screens/HostEndScreen';
import { HostScreen } from './screens/HostScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { StartScreen } from './screens/StartScreen';
import { WaitingScreen } from './screens/WaitingScreen';
import { createInitialState, persistState, quizReducer } from './state/quizState';

export function App() {
  const [state, dispatch] = useReducer(quizReducer, undefined, createInitialState);

  const question = questionAt(state.idx);
  const clipSrc = question.kind === 'sound' ? mediaUrl(question.clip) : undefined;
  const player = useClipPlayer(clipSrc);

  // Progress is written on every change, so a reload lands where it left off.
  useEffect(() => {
    persistState(state);
  }, [state]);

  const revealOpen = state.revealOpen && state.presenter;

  // Escape leaves the projector view, and the page behind it must not scroll.
  useEffect(() => {
    if (!revealOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch({ type: 'closeReveal' });
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [revealOpen]);

  // A presenter can never be parked on the participant screen.
  const screen = state.screen === 'quiz' && state.presenter ? 'host' : state.screen;

  return (
    <div className="app">
      {screen === 'start' && <StartScreen state={state} dispatch={dispatch} />}
      {screen === 'quiz' && <QuizScreen state={state} dispatch={dispatch} />}
      {screen === 'host' && <HostScreen state={state} dispatch={dispatch} player={player} />}
      {screen === 'hostend' && <HostEndScreen dispatch={dispatch} />}
      {screen === 'waiting' && <WaitingScreen state={state} dispatch={dispatch} />}
      {screen === 'results' && <ResultsScreen state={state} dispatch={dispatch} />}

      {revealOpen && <RevealOverlay state={state} dispatch={dispatch} player={player} />}

      {state.presenter && clipSrc && (
        <audio
          ref={player.audioRef}
          src={clipSrc}
          preload="auto"
          onEnded={player.handleEnded}
          onError={player.handleError}
        />
      )}
    </div>
  );
}
