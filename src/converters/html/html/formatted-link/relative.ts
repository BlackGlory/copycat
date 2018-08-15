import { convertUrlToRelativeURL } from '../../../url/formatted/relative'

function isAbsoluteURL(url: string) {
  try {
    const obj = new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export function convertHtmlToRelativeLinkHTML(html: string, baseUrl: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const fragment = template.content
  fragment.querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href') as string
      if (isAbsoluteURL(url)) {
        ele.setAttribute('href', convertUrlToRelativeURL(url, baseUrl))
      }
    })
  fragment.querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src') as string
      if (isAbsoluteURL(url)) {
        ele.setAttribute('src', convertUrlToRelativeURL(url, baseUrl))
      }
    })
  return template.innerHTML
}

export default convertHtmlToRelativeLinkHTML
