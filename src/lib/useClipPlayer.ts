import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

/** How long the play state lasts when a question has no audio file yet. */
const SIMULATED_CLIP_MS = 3000;

export interface ClipPlayer {
  playing: boolean;
  /** True once the clip has been played at least once for this question. */
  hasPlayed: boolean;
  /** False when the question has no file, or the file could not be loaded. */
  hasFile: boolean;
  toggle: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
  handleEnded: () => void;
  handleError: () => void;
}

/**
 * Owns the single <audio> element on the presenter side. A question without a
 * clip file — or with one that fails to load — falls back to a simulated
 * three second play state, so the run-through still works before the real
 * assets land.
 */
export function useClipPlayer(src: string | undefined): ClipPlayer {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [failed, setFailed] = useState(false);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  // A new question means a new clip — nothing may keep playing across it.
  useEffect(() => {
    stop();
    setHasPlayed(false);
    setFailed(false);
  }, [src, stop]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleError = useCallback(() => {
    setFailed(true);
    stop();
  }, [stop]);

  const usable = Boolean(src) && !failed;

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      return;
    }
    setHasPlayed(true);
    setPlaying(true);

    const audio = audioRef.current;
    if (usable && audio) {
      audio.currentTime = 0;
      void audio.play().catch(handleError);
      return;
    }
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setPlaying(false);
    }, SIMULATED_CLIP_MS);
  }, [handleError, playing, stop, usable]);

  return { playing, hasPlayed, hasFile: usable, toggle, audioRef, handleEnded: stop, handleError };
}
