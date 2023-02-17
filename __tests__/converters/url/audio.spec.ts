import { convertUrlToAudioHTML } from '@converters/url/audio/html'

test('convertUrlToAudioHTML', () => {
  const result = convertUrlToAudioHTML('hello.mp3')

  expect(result).toBe(`<audio controls src="hello.mp3"></audio>`)
})
