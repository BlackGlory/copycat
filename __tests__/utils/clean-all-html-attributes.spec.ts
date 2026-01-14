import { test, expect } from 'vitest'
import { cleanAllHTMLAttributes } from '@utils/clean-all-html-attributes.js'

test('cleanAllHTMLAttributes', () => {
  const html = '<div foo="bar" bar="baz">text</div>'

  const result = cleanAllHTMLAttributes(html)

  expect(result).toBe('<div>text</div>')
})
