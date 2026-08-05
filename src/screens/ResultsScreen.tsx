import { useEffect, useMemo, useRef } from 'react';
import type { Dispatch } from 'react';
import { config } from '../config';
import { copy } from '../copy';
import type { DistanceRow, ResultRow, SoundRow } from '../lib/results';
import { buildResults } from '../lib/results';
import type { QuizAction, QuizState } from '../state/quizState';

const COPIED_RESET_MS = 2000;

interface Props {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

export function ResultsScreen({ state, dispatch }: Props) {
  const displayName = state.name.trim() || copy.results.anonymous;
  const results = useMemo(
    () => buildResults(state.answers, displayName),
    [state.answers, displayName],
  );
  const summaryRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!state.copied) return;
    const timer = window.setTimeout(
      () => dispatch({ type: 'setCopied', value: false }),
      COPIED_RESET_MS,
    );
    return () => clearTimeout(timer);
  }, [state.copied, dispatch]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(results.summary);
      dispatch({ type: 'setCopied', value: true });
    } catch {
      selectText(summaryRef.current);
    }
  };

  return (
    <div className="screen screen-results">
      <div>
        <p className="results-name">{displayName}</p>
        <h1 className="results-total">
          {results.total}
          <span>{copy.results.outOf(results.maxScore)}</span>
        </h1>
        <p className="results-verdict">{results.verdict}</p>
      </div>

      <div className="results-strip" aria-hidden="true">
        {results.emojiStrip}
      </div>

      {results.rows.map((row) => (
        <ResultCard key={row.key} row={row} />
      ))}

      {config.showSlackSummary && (
        <div className="summary-card">
          <h2>{copy.results.summaryTitle}</h2>
          <pre ref={summaryRef}>{results.summary}</pre>
          <button type="button" className="btn btn-primary" onClick={handleCopy}>
            {state.copied ? copy.results.copied : copy.results.copy}
          </button>
        </div>
      )}

      <button
        type="button"
        className="btn btn-secondary btn-restart"
        onClick={() => dispatch({ type: 'restart' })}
      >
        {copy.results.restart}
      </button>
    </div>
  );
}

function ResultCard({ row }: { row: ResultRow }) {
  return (
    <div className="result-card">
      <div className="result-head">
        <span className="tag tag-neutral">{row.kindLabel}</span>
        <span className="result-points">
          {row.points}
          <span>{copy.results.points}</span>
        </span>
      </div>
      <p className="result-prompt">{row.prompt}</p>

      {row.kind === 'distance' ? <NumberLine row={row} /> : <SoundVerdict row={row} />}

      <p className="text-muted result-note">{row.note}</p>
      {row.source && (
        <a className="result-source" href={row.source} target="_blank" rel="noopener noreferrer">
          {copy.results.source}
        </a>
      )}
    </div>
  );
}

/**
 * The page the quiz is remembered by: the guess above the line, the truth
 * below it, and the span between them filled in. Direction is always stated
 * in words underneath, never carried by colour alone.
 */
function NumberLine({ row }: { row: DistanceRow }) {
  return (
    <div>
      <div className="numberline">
        <div className="numberline-track" />
        <div
          className="numberline-gap"
          style={{ left: `${row.gapLeftPercent}%`, width: `${row.gapWidthPercent}%` }}
        />
        <div className="numberline-mark numberline-guess" style={{ left: `${row.guessPercent}%` }}>
          <span className="caption">{copy.results.guessCaption}</span>
          <span className="value">{row.guessLabel}</span>
          <span className="numberline-dot" />
        </div>
        <div className="numberline-mark numberline-truth" style={{ left: `${row.truthPercent}%` }}>
          <span className="numberline-tick" />
          <span className="value">{row.truthLabel}</span>
          <span className="caption text-muted">{copy.results.truthCaption}</span>
        </div>
      </div>
      <p className="numberline-gaplabel">{row.gapLabel}</p>
    </div>
  );
}

function SoundVerdict({ row }: { row: SoundRow }) {
  return (
    <div className="pick-list">
      <div className={`pick ${row.correct ? 'pick-right' : 'pick-wrong'}`}>
        <span className="pick-mark" aria-hidden="true">
          {row.correct ? '✓' : '✕'}
        </span>
        <span>{copy.results.yourPick(row.guessLabel)}</span>
      </div>
      <div className="pick">
        <span className="pick-mark" aria-hidden="true">
          ✓
        </span>
        <span>{copy.results.correctPick(row.truthLabel)}</span>
      </div>
    </div>
  );
}

function selectText(element: HTMLElement | null): void {
  if (!element) return;
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}
