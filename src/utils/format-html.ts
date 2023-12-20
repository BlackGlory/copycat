import prettier from 'prettier'
import parserHTML from 'prettier/parser-html.js'

export async function formatHTML(html: string): Promise<string> {
  return await prettier.format(html, {
    parser: 'html'
  , plugins: [parserHTML]
  , htmlWhitespaceSensitivity: 'ignore'
  })
}
