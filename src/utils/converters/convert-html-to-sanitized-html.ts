import DOMPurify from 'dompurify'

export function convertHTMLToSanitizedHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    FORBID_TAGS: ['style']
  })
}
