import { parseFragment } from 'extra-dom'

export function convertHTMLToPlainText(html: string): string {
  const fragment = parseFragment(html)

  return fragment.textContent ?? ''
}
