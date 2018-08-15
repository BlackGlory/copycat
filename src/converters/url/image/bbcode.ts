export function convertUrlToImageBBCode(url: string): string {
  return `[img]${ url }[/img]`
}

export default convertUrlToImageBBCode
