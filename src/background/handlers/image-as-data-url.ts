import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { offscreen } from '@background/offscreen-client.js'

export const commandImageAsDataURL: CommandHandler = async ({ mediaType, srcUrl }, tab) => {
  if (mediaType === 'image' && srcUrl) {
    return plainText(
      await offscreen.convertImageURLToDataURL(srcUrl)
    )
  }
}
