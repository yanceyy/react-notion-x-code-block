const ALIASES: Record<string, string> = {
  "plain text": "plaintext"
};

/**
 * Normalize language labels from Notion to Shiki-recognized language name
 */
export function langLabelConverter(lang: string) {
  if (lang in ALIASES) return ALIASES[lang];
  return lang;
}
