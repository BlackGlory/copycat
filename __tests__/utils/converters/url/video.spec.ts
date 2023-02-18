import { convertUrlToVideoHTML } from '@converters/url/video/html'

test('convertUrlToVideoHTML', () => {
  const result = convertUrlToVideoHTML('hello.mp3')

  expect(result).toBe(`<video controls src="hello.mp3"></video>`)
})
