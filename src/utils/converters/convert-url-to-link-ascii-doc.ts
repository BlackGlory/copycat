export function convertUrlToLinkAsciiDoc(url: string, text?: string): string {
  if (text) {
    return `${url}[${text}]`
  } else {
    return url
  }
}
