import { convertUrlToRootRelativeURL } from './convert-url-to-root-relative-url.js'
import { createDOMParser } from 'extra-dom'

export function convertHtmlToRootRelativeLinkHTML(
  html: string
, baseUrl: string
): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  document
    .querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href')!
      ele.setAttribute('href', convertUrlToRootRelativeURL(url, baseUrl))
    })
  document.querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src')!
      ele.setAttribute('src', convertUrlToRootRelativeURL(url, baseUrl))
    })

  return document.body.innerHTML
}
