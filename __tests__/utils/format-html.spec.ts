import { formatHTML } from '@utils/format-html.js'
import { dedent } from 'extra-tags'

test('formatHTML', async () => {
  const html = dedent`
    <div>
    <p>Hello World</p>
    </div>
  `

  const result = await formatHTML(html)

  expect(result).toBe(
    '<div>' + '\n'
  + '  <p>Hello World</p>' + '\n'
  + '</div>' + '\n'
  )
})
