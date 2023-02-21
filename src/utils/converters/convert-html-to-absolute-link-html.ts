import { convertUrlToAbsoluteURL } from './convert-url-to-absolute-url'

export function convertHtmlToAbsoluteLinkHTML(html: string, baseUrl: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const fragment = template.content
  fragment.querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href')!
      if (isRelativeUrl(url)) {
        ele.setAttribute('href', convertUrlToAbsoluteURL(url, baseUrl))
      }
    })
  fragment.querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src')!
      if (isRelativeUrl(url)) {
        ele.setAttribute('src', convertUrlToAbsoluteURL(url, baseUrl))
      }
    })
  return template.innerHTML
}

function isRelativeUrl(url: string) {
  try {
    new URL(url)
    return false
  } catch (e) {
    return true
  }
}
