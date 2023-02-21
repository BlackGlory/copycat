import { convertUrlToRelativeURL } from './convert-url-to-relative-url.js'
import { createDOMParser } from 'extra-dom'

export function convertHtmlToRelativeLinkHTML(html: string, baseUrl: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  document
    .querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href')!
      if (isAbsoluteURL(url)) {
        ele.setAttribute('href', convertUrlToRelativeURL(url, baseUrl))
      }
    })
  document
    .querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src')!
      if (isAbsoluteURL(url)) {
        ele.setAttribute('src', convertUrlToRelativeURL(url, baseUrl))
      }
    })

  return document.body.innerHTML
}

function isAbsoluteURL(url: string) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}
