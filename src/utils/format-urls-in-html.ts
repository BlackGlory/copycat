import { IURLConfig } from '@src/contract.js'
import { formatURL } from '@utils/format-url.js'
import { parseFragment, stringifyFragment } from 'extra-dom'

export function formatURLsInHTML(
  html: string
, baseUrl: string
, config: IURLConfig
): string {
  const fragment = parseFragment(html)

  for (const element of fragment.querySelectorAll('[href]')) {
    const url = element.getAttribute('href')
    if (url) {
      element.setAttribute('href', formatURL(url, baseUrl, config))
    }
  }

  for (const element of fragment.querySelectorAll('[src]')) {
    const url = element.getAttribute('src')
    if (url) {
      element.setAttribute('src', formatURL(url, baseUrl, config))
    }
  }

  return stringifyFragment(fragment)
}
