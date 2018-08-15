import {
  convertHtmlToCommonmarkMarkdown
, convertHtmlToGfmMarkdown
, convertHtmlToGhostMarkdown
} from '../../../src/converters/html/markdown'

test('convertHtmlToCommonmarkMarkdown', () => {
  expect(convertHtmlToCommonmarkMarkdown('<del><none>Hello World</none></del>'))
    .toBe('~~Hello World~~')
})

test('convertHtmlToGfmMarkdown', () => {
  expect(convertHtmlToGfmMarkdown('<del><none>Hello World</none></del>'))
    .toBe('~Hello World~')
})

test('convertHtmlToGhostMarkdown', () => {
  expect(convertHtmlToGhostMarkdown('<del><none>Hello World</none></del>'))
    .toBe('~~Hello World~~')
})
