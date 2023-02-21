export function convertTextToRawString(text: string): string {
  return text.replace(/\\/g, String.raw`\\`)
    .replace(/\r/g, String.raw`\r`)
    .replace(/\t/g, String.raw`\t`)
    .replace(/\f/g, String.raw`\f`)
    .replace(/\n/g, String.raw`\n`)
    .replace(/'/g, String.raw`'`)
    .replace(/"/g, String.raw`"`)
}
