import { formatMarkdown } from '@utils/format-markdown.js'
import { dedent } from 'extra-tags'

test('formatMarkdown', () => {
  const result = formatMarkdown(dedent`
    
    
    
    Hello World
    
    
    
  `)

  expect(result).toBe(
    'Hello World' + '\n'
  )
})
