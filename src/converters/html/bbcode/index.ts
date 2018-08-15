import { HTML2BBCode } from 'html2bbcode'

export function convertHtmlToBBCode(html: string): string {
  return (new HTML2BBCode()).feed(html).toString()
}

export default convertHtmlToBBCode
