import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { offscreen } from '@background/offscreen-client.js'
import { ImageFormat } from '@src/contract.js'

export const commandImageAsDataURLWebP: CommandHandler = async ({ mediaType, srcUrl }) => {
  if (mediaType === 'image' && srcUrl) {
    return plainText(
      await offscreen.convertImageURLToDataURL(srcUrl, ImageFormat.WebP)
    )
  }
}
