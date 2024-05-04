import { test, expect } from 'vitest'
import { createMarkdownImage } from '@utils/create-markdown-image.js'

test('createMarkdownImage', () => {
  const result = createMarkdownImage('https://hello.world')

  expect(result).toBe('![](https://hello.world)')
})
