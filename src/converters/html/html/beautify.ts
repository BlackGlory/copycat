import beautify = require('js-beautify')

export function convertHtmlToBeautifyHTML(html: string): string {
  return beautify.html(html)
}

export default convertHtmlToBeautifyHTML
