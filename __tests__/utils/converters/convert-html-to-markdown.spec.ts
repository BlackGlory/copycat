import { convertHTMLToMarkdown } from '@converters/convert-html-to-markdown.js'
import { MarkdownBullet, MarkdownBulletOrdered, MarkdownEmphasis, MarkdownFence, MarkdownListItemIndent, MarkdownRule, MarkdownStrong } from '@src/contract.js'

test('convertHTMLToMarkdown', async () => {
  const html = '<em><strong>strong</strong>emphasis</em>'

  const result = await convertHTMLToMarkdown(html, {
    bullet: MarkdownBullet['*']
  , bulletOrdered: MarkdownBulletOrdered['.']
  , emphasis: MarkdownEmphasis['_']
  , fence: MarkdownFence['`']
  , listItemIndent: MarkdownListItemIndent.Space
  , rule: MarkdownRule['-']
  , strong: MarkdownStrong['*']
  })

  expect(result).toBe('_**strong**emphasis_')
})
