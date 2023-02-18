import { convertUrlToRootRelativeURL } from '@converters/url/formatted/root-relative'

export function convertHtmlToRootRelativeLinkHTML(html: string, baseUrl: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const fragment = template.content
  fragment.querySelectorAll('[href]')
    .forEach(ele => {
      const url = ele.getAttribute('href') as string
      ele.setAttribute('href', convertUrlToRootRelativeURL(url, baseUrl))
    })
  fragment.querySelectorAll('[src]')
    .forEach(ele => {
      const url = ele.getAttribute('src') as string
      ele.setAttribute('src', convertUrlToRootRelativeURL(url, baseUrl))
    })
  return template.innerHTML
}
