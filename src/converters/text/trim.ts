export function convertTextToTrimmedText(text: string): string {
  return text
    .replace(/^\s+/, '')
    .replace(/\s+$/, '')
}
