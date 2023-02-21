import html2bbcode from 'html2bbcode'

const { HTML2BBCode } = html2bbcode

export function convertHtmlToBBCode(html: string): string {
  return (new HTML2BBCode()).feed(html).toString()
}
