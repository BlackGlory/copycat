export function convertUrlToImageMarkdown(url: string): string {
  return `![](${ url })`
}

export default convertUrlToImageMarkdown
