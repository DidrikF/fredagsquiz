const DEFAULT_REVEAL_CODE = 'lutefisk';

export interface QuizConfig {
  /** Shared secret for presenter mode and for unlocking the results. */
  revealCode: string;
  /** Show the copyable Slack line on the results screen. */
  showSlackSummary: boolean;
}

export const config: QuizConfig = {
  revealCode: import.meta.env.VITE_REVEAL_CODE?.trim() || DEFAULT_REVEAL_CODE,
  showSlackSummary: import.meta.env.VITE_SLACK_SUMMARY !== 'false',
};

export function matchesRevealCode(input: string): boolean {
  return input.trim().toLowerCase() === config.revealCode.trim().toLowerCase();
}

export function revealCodeLabel(): string {
  return config.revealCode.trim().toLowerCase();
}
