export function convertHtmlToPlainText(html: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const fragment = template.content
  return fragment.textContent!
}
