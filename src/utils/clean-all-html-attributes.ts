import { parseFragment, stringifyFragment, removeAttributes } from 'extra-dom'

export function cleanAllHTMLAttributes(html: string): string {
  const fragment = parseFragment(html)

  for (const element of fragment.querySelectorAll('*')) {
    removeAttributes(element)
  }

  return stringifyFragment(fragment)
}
