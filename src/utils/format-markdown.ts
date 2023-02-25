import prettier from 'prettier'
import parserMarkdown from 'prettier/parser-markdown.js'

export function formatMarkdown(markdown: string): string {
  return prettier.format(markdown, {
    parser: 'markdown'
  , plugins: [parserMarkdown]
  })
}
