import { convertUrlToVideoHTML } from '@converters/convert-url-to-video-html.js'

test('convertUrlToVideoHTML', () => {
  const result = convertUrlToVideoHTML('hello.mp3')

  expect(result).toBe(`<video controls src="hello.mp3"></video>`)
})
