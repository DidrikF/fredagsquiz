interface Props {
  current: number;
  total: number;
}

/** Decorative — the adjacent "Spørsmål 3 av 9" line carries the same information. */
export function ProgressBar({ current, total }: Props) {
  const percent = total === 0 ? 0 : (current / total) * 100;
  return (
    <div className="progress" aria-hidden="true">
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
