import { convertUrlToAbsoluteURL } from '../../../url/formatted/absolute'

function isRelativeUrl(url: string) {
  try {
    const obj = new URL(url)
    return false
  } catch (e) {
    return true
  }
}

export function convertHtmlToAbsoluteLinkHTML(html: string, baseUrl: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const fragment = template.content
  fragment.querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href') as string
      if (isRelativeUrl(url)) {
        ele.setAttribute('href', convertUrlToAbsoluteURL(url, baseUrl))
      }
    })
  fragment.querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src') as string
      if (isRelativeUrl(url)) {
        ele.setAttribute('src', convertUrlToAbsoluteURL(url, baseUrl))
      }
    })
  return template.innerHTML
}

export default convertHtmlToAbsoluteLinkHTML
