import prettier from 'prettier'
import parserHTML from 'prettier/parser-html.js'

export function formatHTML(html: string): string {
  return prettier.format(html, {
    parser: 'html'
  , plugins: [parserHTML]
  , htmlWhitespaceSensitivity: 'ignore'
  })
}
