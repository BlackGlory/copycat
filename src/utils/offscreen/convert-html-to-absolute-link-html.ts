import { convertURLToAbsoluteURL } from '@utils/convert-url-to-absolute-url.js'
import { createDOMParser } from 'extra-dom'
import { isRelativeURL } from '@utils/is-relative-url.js'

export function convertHTMLToAbsoluteLinkHTML(html: string, baseUrl: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  document
    .querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href')!
      if (isRelativeURL(url)) {
        ele.setAttribute('href', convertURLToAbsoluteURL(url, baseUrl))
      }
    })
  document
    .querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src')!
      if (isRelativeURL(url)) {
        ele.setAttribute('src', convertURLToAbsoluteURL(url, baseUrl))
      }
    })

  return document.body.innerHTML
}
