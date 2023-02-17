import { convertHtmlToCommonmarkMarkdown } from '@converters/html/markdown/commonmark'
import { convertHtmlToGfmMarkdown } from '@converters/html/markdown/gfm'
import { convertHtmlToGhostMarkdown } from '@converters/html/markdown/ghost'

test('convertHtmlToCommonmarkMarkdown', () => {
  const result = convertHtmlToCommonmarkMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})

test('convertHtmlToGfmMarkdown', () => {
  const result = convertHtmlToGfmMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})

test('convertHtmlToGhostMarkdown', () => {
  const result = convertHtmlToGhostMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})
