import { convertHTMLToBeautifyHTML } from '@converters/convert-html-to-beautify-html.js'
import { dedent } from 'extra-tags'

test('convertHTMLToBeautifyHTML', () => {
  const result = convertHTMLToBeautifyHTML(dedent`
    <div>
    <p>Hello World</p>
    </div>
  `)

  expect(result).toBe('<div>\n    <p>Hello World</p>\n</div>')
})
