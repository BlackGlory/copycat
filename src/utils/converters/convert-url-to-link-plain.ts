export function convertURLToLinkPlain(url: string, text?: string): string {
  if (text) {
    return `${text}\n${url}`
  } else {
    return `${url}`
  }
}
