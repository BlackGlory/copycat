import { test, expect } from 'vitest'
import { createBBCodeImage } from '@utils/create-bbcode-image.js'

test('createBBCodeImage', () => {
  const result = createBBCodeImage('https://hello.world')

  expect(result).toBe('[img]https://hello.world[/img]')
})
