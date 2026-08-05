/** Non-breaking and narrow-no-break spaces, which Intl uses for grouping. */
const FANCY_SPACES = /[  ]/g;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Norwegian thousands grouping with a plain space, so it survives copy-paste. */
export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString('nb-NO').replace(FANCY_SPACES, ' ');
}

/** One decimal, Norwegian comma: 3.85 → "3,9". */
export function formatDecimal(value: number): string {
  return (Math.round(value * 10) / 10).toString().replace('.', ',');
}
