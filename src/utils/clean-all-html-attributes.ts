import { parseFragment, stringifyFragment } from 'extra-dom'

export function cleanAllHTMLAttributes(html: string): string {
  const fragment = parseFragment(html)

  for (const element of fragment.querySelectorAll('*')) {
    for (const name of element.getAttributeNames()) {
      element.removeAttribute(name)
    }
  }

  return stringifyFragment(fragment)
}
