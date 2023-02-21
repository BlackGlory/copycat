import { convertUrlToAbsoluteURL } from './convert-url-to-absolute-url.js'
import { createDOMParser } from 'extra-dom'

export function convertHtmlToAbsoluteLinkHTML(html: string, baseUrl: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  document
    .querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href')!
      if (isRelativeUrl(url)) {
        ele.setAttribute('href', convertUrlToAbsoluteURL(url, baseUrl))
      }
    })
  document
    .querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src')!
      if (isRelativeUrl(url)) {
        ele.setAttribute('src', convertUrlToAbsoluteURL(url, baseUrl))
      }
    })

  return document.body.innerHTML
}

function isRelativeUrl(url: string) {
  try {
    new URL(url)
    return false
  } catch (e) {
    return true
  }
}
