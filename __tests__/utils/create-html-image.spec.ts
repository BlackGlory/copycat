import { test, expect } from 'vitest'
import { createHTMLImage } from '@utils/create-html-image.js'

test('createHTMLImage', () => {
  const result = createHTMLImage('https://hello.world')

  expect(result).toBe('<img src="https://hello.world" />')
})
