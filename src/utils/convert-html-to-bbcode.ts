import { HTML2BBCode } from 'html2bbcode'
import { lazy } from '@blackglory/prelude'

const getHTML2BBCode = lazy(() => new HTML2BBCode())

export function convertHTMLToBBCode(html: string): string {
  return getHTML2BBCode().feed(html).toString()
}
