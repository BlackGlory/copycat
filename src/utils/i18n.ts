export function i18n(message: string): string {
  return chrome.i18n.getMessage(message)
}
