export function convertHtmlToNoAttrHTML(html: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const fragment = template.content
  fragment.querySelectorAll('*')
    .forEach(ele => {
      for (const attr of [...ele.attributes]) { // [...] is required
        ele.removeAttribute(attr.name)
      }
    })
  return template.innerHTML
}
