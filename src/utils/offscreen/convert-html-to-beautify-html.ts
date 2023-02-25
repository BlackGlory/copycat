import beautify from 'js-beautify'

export function convertHTMLToBeautifyHTML(html: string): string {
  return beautify.html(html)
}
