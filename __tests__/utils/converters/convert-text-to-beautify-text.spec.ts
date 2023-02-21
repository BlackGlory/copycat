import { convertMarkdownToBeautifyMarkdown } from '@converters/convert-markdown-to-beautify-markdown'

test('convertTextToBeautifyText', () => {
  const result = convertMarkdownToBeautifyMarkdown(
`



  Hello World



`
  )

  expect(result).toBe(
`
  Hello World
`
  )
})
