import { flatMap, stringifyNodes, parseNodes, isElement } from 'extra-dom'
import { IHTMLCleanHTMLConfig } from '@src/contract.js'
import { pipe } from 'extra-utils'
import * as Iter from 'iterable-operator'

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
  , nodes => nodes.flatMap(node => flatMap(node, function fn(node: Node): Node[] {
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

        return pipe(
          node.childNodes
        , nodes => Iter.flatMap(nodes, fn)
        , Iter.toArray
        )
      } else {
        return [node]
      }
    }))
  , stringifyNodes
  , text => text.trim()
  )
}
