import { parseFragment, stringifyFragment } from 'extra-dom'

export function cleanAllHTMLAttributes(html: string): string {
  const fragment = parseFragment(html)
  
  for (const element of fragment.querySelectorAll('*')) {
    for (const attr of element.attributes) {
      element.removeAttribute(attr.name)
    }
  }

  return stringifyFragment(fragment)
}
