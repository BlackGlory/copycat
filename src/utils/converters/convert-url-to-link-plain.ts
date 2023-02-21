export function convertUrlToLinkPlain(url: string, text?: string): string {
  if (text) {
    return `${ text }\n${ url }`
  }
  return `${ url }`
}
