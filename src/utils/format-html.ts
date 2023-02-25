import beautify from 'js-beautify'

export function formatHTML(html: string): string {
  return beautify.html(html)
}
