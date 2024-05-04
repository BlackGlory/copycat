import { test, expect } from 'vitest'
import { convertHTMLToPlainText } from '@utils/convert-html-to-plain-text.js'

test('convertHTMLToPlainText', () => {
  const html = '<p>Hello World</p>'

  const result = convertHTMLToPlainText(html)

  expect(result).toBe('Hello World')
})
