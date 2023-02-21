import { createDOMParser } from 'extra-dom'

export function convertHtmlToSafeHTML(html: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  document
    .querySelectorAll(['script', 'style', 'link', 'meta'].join(', '))
    .forEach(ele => ele.remove())

  return document.body.innerHTML
}
