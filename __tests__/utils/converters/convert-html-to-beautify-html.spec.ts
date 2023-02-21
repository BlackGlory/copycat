import { convertHtmlToBeautifyHTML } from '@converters/convert-html-to-beautify-html.js'
import { dedent } from 'extra-tags'

test('convertHtmlToBeautifyHTML', () => {
  const result = convertHtmlToBeautifyHTML(dedent`
    <div>
    <p>Hello World</p>
    </div>
  `)

  expect(result).toBe('<div>\n    <p>Hello World</p>\n</div>')
})
