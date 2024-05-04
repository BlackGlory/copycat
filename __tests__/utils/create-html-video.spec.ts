import { test, expect } from 'vitest'
import { createHTMLVideo } from '@utils/create-html-video.js'

test('createHTMLVideo', () => {
  const result = createHTMLVideo('hello.mp3')

  expect(result).toBe(`<video controls src="hello.mp3"></video>`)
})
