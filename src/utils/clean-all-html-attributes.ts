import { getDOMParser } from '@utils/get-dom-parser.js'

export function cleanAllHTMLAttributes(html: string): string {
  const document = getDOMParser().parseFromString(html, 'text/html')

  for (const element of document.querySelectorAll('*')) {
    for (const attr of element.attributes) {
      element.removeAttribute(attr.name)
    }
  }

  return document.body.innerHTML
}
