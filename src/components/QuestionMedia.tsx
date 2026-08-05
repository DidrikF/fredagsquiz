import { copy } from '../copy';
import type { PriceQuestion, YearQuestion } from '../data/questions';
import type { ClipPlayer } from '../lib/useClipPlayer';
import { mediaUrl } from '../lib/media';

interface PhotoProps {
  question: YearQuestion | PriceQuestion;
  /** The presenter gets a wider 16:9 block and no caption under it. */
  variant: 'participant' | 'presenter';
}

/** Photo block for year and price rounds. Falls back to a placeholder. */
export function QuestionPhoto({ question, variant }: PhotoProps) {
  const src = mediaUrl(question.photo);
  const frame = (
    <div className={`photo washed${variant === 'presenter' ? ' photo-host' : ''}`}>
      {src ? (
        <img src={src} alt="" />
      ) : (
        <div className="photo-placeholder" aria-hidden="true" />
      )}
    </div>
  );

  if (variant === 'presenter') return frame;

  return (
    <figure>
      {frame}
      <figcaption className="photo-caption">{question.photoHint}</figcaption>
    </figure>
  );
}

/** Sound rounds show no media to the participant. That is the point. */
export function SoundNotice() {
  return (
    <div className="sound-note">
      <div className="sound-note-icon" aria-hidden="true">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-accent-2-800)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 5a9 9 0 0 1 0 14" />
        </svg>
      </div>
      <p>{copy.quiz.soundNotice}</p>
    </div>
  );
}

export function clipButtonLabel(player: ClipPlayer): string {
  if (player.playing) return copy.host.clipStop;
  return player.hasPlayed ? copy.host.clipReplay : copy.host.clipPlay;
}
