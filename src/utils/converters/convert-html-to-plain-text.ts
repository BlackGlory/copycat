import { createDOMParser } from 'extra-dom'

export function convertHTMLToPlainText(html: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  return document.body.textContent ?? ''
}
