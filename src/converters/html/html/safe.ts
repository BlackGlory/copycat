export function convertHtmlToSafeHTML(html: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const fragment = template.content
  fragment.querySelectorAll(['script', 'style', 'link', 'meta'].join(', '))
    .forEach(ele => ele.remove())
  return template.innerHTML
}

export default convertHtmlToSafeHTML
