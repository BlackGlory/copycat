import { flatMap, stringify, parse, isElement } from 'extra-dom'
import { IHTMLCleanerConfig } from '@src/contract.js'
import { pipe } from 'extra-utils'
import * as Iter from 'iterable-operator'

export function convertHTMLToCleanHTML(
  html: string
, config: IHTMLCleanerConfig
): string {
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
    parse(html)
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
  , stringify
  , text => text.trim()
  )
}
