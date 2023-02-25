export function createHTMLLink(url: string, text: string = url): string {
  return `<a href="${url}">${text}</a>`
}
