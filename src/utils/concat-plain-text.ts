export function concatPlainText(text: string): string {
  return text
    .replace(/\s{1,}/g, ' ')
    .trim()
}
