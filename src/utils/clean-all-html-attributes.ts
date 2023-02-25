import { createDOMParser } from 'extra-dom'

export function cleanAllHTMLAttributes(html: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  for (const element of document.querySelectorAll('*')) {
    for (const attr of element.attributes) {
      element.removeAttribute(attr.name)
    }
  }

  return document.body.innerHTML
}
