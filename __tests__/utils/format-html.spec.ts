import { formatHTML } from '@utils/format-html.js'
import { dedent } from 'extra-tags'

test('formatHTML', () => {
  const html = dedent`
    <div>
    <p>Hello World</p>
    </div>
  `

  const result = formatHTML(html)

  expect(result).toBe(dedent`
    <div>
        <p>Hello World</p>
    </div>
  `)
})
