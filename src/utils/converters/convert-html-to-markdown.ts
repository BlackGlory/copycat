import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkStringify from 'remark-stringify'
import remarkGfm from 'remark-gfm'
import { IMarkdownConfig, MarkdownBullet, MarkdownBulletOrdered, MarkdownEmphasis, MarkdownFence, MarkdownListItemIndent, MarkdownRule, MarkdownStrong } from '@src/contract.js'
import { go } from '@blackglory/prelude'

export async function convertHTMLToMarkdown(
  html: string
, config: IMarkdownConfig
): Promise<string> {
  const file = await unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify, {
      closeAtx: false
    , fences: true
    , incrementListMarker: true
    , ruleSpaces: true
    , tightDefinitions: true
    , bullet: go(() => {
        switch (config.bullet) {
          case MarkdownBullet['*']: return '*'
          case MarkdownBullet['+']: return '+'
          case MarkdownBullet['-']: return '-'
        }
      })
    , bulletOrdered: go(() => {
        switch (config.bulletOrdered) {
          case MarkdownBulletOrdered[')']: return ')'
          case MarkdownBulletOrdered['.']: return '.'
        }
      })
    , emphasis: go(() => {
        switch (config.emphasis) {
          case MarkdownEmphasis['*']: return '*'
          case MarkdownEmphasis['_']: return '_'
        }
      })
    , fence: go(() => {
        switch (config.fence) {
          case MarkdownFence['`']: return '`'
          case MarkdownFence['~']: return '~'
        }
      })
    , listItemIndent: go(() => {
        switch (config.listItemIndent) {
          case MarkdownListItemIndent.Space: return 'one'
          case MarkdownListItemIndent.Tab: return 'tab'
        }
      })
    , rule: go(() => {
        switch (config.rule) {
          case MarkdownRule['*']: return '*'
          case MarkdownRule['-']: return '-'
          case MarkdownRule['_']: return '_'
        }
      })
    , strong: go(() => {
        switch (config.strong) {
          case MarkdownStrong['*']: return '*'
          case MarkdownStrong['_']: return '_'
        }
      })
    })
    .process(html)

  return file
    .toString()
    .trim()
}
