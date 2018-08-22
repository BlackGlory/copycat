import {
  convertHtmlToCommonmarkMarkdown
, convertHtmlToGfmMarkdown
, convertHtmlToGhostMarkdown
} from '../../../src/converters/html/markdown'

test('convertHtmlToCommonmarkMarkdown', () => {
  expect(convertHtmlToCommonmarkMarkdown('<em><none>Hello*World</none></em>'))
    .toBe('*Hello\\*World*')
})

test('convertHtmlToGfmMarkdown', () => {
  expect(convertHtmlToGfmMarkdown('<em><none>Hello*World</none></em>'))
    .toBe('*Hello\\*World*')
})

test('convertHtmlToGhostMarkdown', () => {
  expect(convertHtmlToGhostMarkdown('<em><none>Hello*World</none></em>'))
    .toBe('*Hello\\*World*')
})
