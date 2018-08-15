export function convertUrlToLinkMarkdown(url: string, text: string = url): string {
  return `[${ text }](${ url })`
}

export default convertUrlToLinkMarkdown
