/**
 * `**bold**` inside a plain-text frontmatter string, such as a tagline.
 *
 * Frontmatter isn't run through Markdown, so this is the one bit of it we
 * support: `emphasisHtml` escapes the text and turns each `**…**` pair into
 * `<strong>`, for use with `set:html`; `stripEmphasis` drops the markers for
 * places that need plain text, like the meta description. An unpaired `**`
 * is left as literal asterisks rather than failing the build.
 */
const PAIR = /\*\*(.+?)\*\*/g;

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const emphasisHtml = (text: string) =>
  escapeHtml(text).replace(PAIR, '<strong>$1</strong>');

export const stripEmphasis = (text: string) => text.replace(PAIR, '$1');
