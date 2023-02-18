export function convertUrlToLinkHTML(url: string, text: string = url): string {
  return `<a href="${ url }">${ text }</a>`
}
