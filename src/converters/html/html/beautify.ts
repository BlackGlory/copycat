import * as beautify from 'js-beautify'

export function convertHtmlToBeautifyHTML(html: string): string {
  return beautify.html(html)
}
