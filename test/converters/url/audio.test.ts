import { convertUrlToAudioHTML } from '../../../src/converters/url/audio'

test('convertUrlToAudioHTML', () => {
  expect(convertUrlToAudioHTML('hello.mp3'))
    .toBe(`<audio controls src="hello.mp3"></audio>`)
})
