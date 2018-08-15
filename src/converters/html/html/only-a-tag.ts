export function convertHtmlToOnlyATagHTML(html: string): string {
  const template = document.createElement('template')
  template.innerHTML = html
  const fragment = template.content
  const treeWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT)
  const container = document.createElement('div')
  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode
    if (node.nodeType === Node.TEXT_NODE) {
      container.appendChild(node.cloneNode())
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'A') {
      container.appendChild(node.cloneNode(true))
      treeWalker.nextNode()
    }
  }
  return container.innerHTML
}

export default convertHtmlToOnlyATagHTML
