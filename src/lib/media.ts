const MEDIA_DIR = 'media/';

/**
 * Resolves a question's `photo` / `clip` value to a URL that survives being
 * served from a GitHub Pages subfolder. Bare file names are looked up in
 * `public/media/`; absolute paths and full URLs are passed through.
 */
export function mediaUrl(file: string | undefined): string | undefined {
  if (!file) return undefined;
  if (/^(https?:)?\/\//.test(file) || file.startsWith('/')) return file;
  return `${import.meta.env.BASE_URL}${MEDIA_DIR}${file}`;
}
