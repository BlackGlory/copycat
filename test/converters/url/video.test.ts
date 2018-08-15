import { convertUrlToVideoHTML } from '../../../src/converters/url/video'

test('convertUrlToVideoHTML', () => {
  const result = convertUrlToVideoHTML('hello.mp3')
  expect(result).toBe(`<video controls src="hello.mp3"></video>`)
})
