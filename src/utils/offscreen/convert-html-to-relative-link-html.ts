import { convertURLToRelativeURL } from '@utils/convert-url-to-relative-url.js'
import { createDOMParser } from 'extra-dom'
import { isAbsoluteURL } from '@utils/is-absolute-url.js'

export function convertHTMLToRelativeLinkHTML(html: string, baseUrl: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  document
    .querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href')!
      if (isAbsoluteURL(url)) {
        ele.setAttribute('href', convertURLToRelativeURL(url, baseUrl))
      }
    })
  document
    .querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src')!
      if (isAbsoluteURL(url)) {
        ele.setAttribute('src', convertURLToRelativeURL(url, baseUrl))
      }
    })

  return document.body.innerHTML
}
