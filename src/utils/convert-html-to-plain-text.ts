import { getDOMParser } from '@utils/get-dom-parser.js'

export function convertHTMLToPlainText(html: string): string {
  const document = getDOMParser().parseFromString(html, 'text/html')

  return document.body.textContent ?? ''
}
