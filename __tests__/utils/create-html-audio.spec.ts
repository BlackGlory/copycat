import { test, expect } from 'vitest'
import { createHTMLAudio } from '@utils/create-html-audio.js'

test('createHTMLAudio', () => {
  const result = createHTMLAudio('hello.mp3')

  expect(result).toBe(`<audio controls src="hello.mp3"></audio>`)
})
