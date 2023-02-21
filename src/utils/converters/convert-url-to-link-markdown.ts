export function convertUrlToLinkMarkdown(url: string, text?: string): string {
  if (text) {
    return `[${text}](${url})`
  } else {
    return `<${url}>`
  }
}
