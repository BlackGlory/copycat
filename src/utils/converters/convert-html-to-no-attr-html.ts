import { createDOMParser } from 'extra-dom'

export function convertHtmlToNoAttrHTML(html: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  document
    .querySelectorAll('*')
    .forEach(ele => {
      for (const attr of [...ele.attributes]) { // [...] is required
        ele.removeAttribute(attr.name)
      }
    })

  return document.body.innerHTML
}
