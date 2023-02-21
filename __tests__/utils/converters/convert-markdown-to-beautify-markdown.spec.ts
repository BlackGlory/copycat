import { convertMarkdownToBeautifyMarkdown } from '@src/utils/converters/convert-markdown-to-beautify-markdown.js'
import { dedent } from 'extra-tags'

test('convertMarkdownToBeautifyMarkdown', () => {
  const result = convertMarkdownToBeautifyMarkdown(dedent`
    
    
    
    Hello World
    
    
    
  `)

  expect(result).toBe('\nHello World\n')
})
