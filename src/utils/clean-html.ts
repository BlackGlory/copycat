import { flatMap as flatMapNode, stringifyNodes, parseNodes, isElement } from 'extra-dom'
import { IHTMLCleanHTMLConfig } from '@src/contract.js'
import { pipe } from 'extra-utils'
import { toArray } from '@blackglory/prelude'

export function cleanHTML(html: string, config: IHTMLCleanHTMLConfig): string {
  const allowlist = config.allowlist
    .map(item => ({
      elements: item.elements
        .split(',')
        .map(x => x.trim())
        .map(x => x.toLowerCase())
    , attributes: item.attributes
        .split(',')
        .map(x => x.trim())
        .map(x => x.toLowerCase())
    }))

  return pipe(
    parseNodes(html)
  , nodes => nodes.flatMap(node => flatMapNode(node, flatMapper))
  , stringifyNodes
  , text => text.trim()
  )

  function flatMapper(node: Node): Node[] {
    if (isElement(node)) {
      for (const { elements, attributes } of allowlist) {
        if (elements.includes(node.nodeName.toLowerCase())) {
          for (const attribute of node.getAttributeNames()) {
            if (!attributes.includes(attribute.toLowerCase())) {
              node.removeAttribute(attribute)
            }
          }

          return [node]
        }
      }

      const childNodes = toArray(node.childNodes)
      return childNodes.flatMap(flatMapper)
    } else {
      return [node]
    }
  }
}
