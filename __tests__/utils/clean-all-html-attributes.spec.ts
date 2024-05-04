import { test, expect } from 'vitest'
import { cleanAllHTMLAttributes } from '@utils/clean-all-html-attributes.js'

test('cleanAllHTMLAttributes', () => {
  const html = '<a href="../href">text</a>'

  const result = cleanAllHTMLAttributes(html)

  expect(result).toBe('<a>text</a>')
})
