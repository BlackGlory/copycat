import { createDOMParser } from 'extra-dom'

export function convertHtmlToOnlyATagHTML(html: string): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  const treeWalker = document.createTreeWalker(
    document.body
  , NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT
  )

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
