export function convertUrlToLinkBBCode(url: string, text: string = url): string {
  return `[url=${ url }]${ text }[/url]`
}

export default convertUrlToLinkBBCode
