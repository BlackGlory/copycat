export function createBBCodeLink(url: string, text: string = url): string {
  return `[url=${url}]${text}[/url]`
}
