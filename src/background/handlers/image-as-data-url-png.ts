import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { offscreen } from '@background/offscreen-client.js'
import { ImageFormat } from '@src/contract.js'

export const commandImageAsDataURLPNG: CommandHandler = async ({ mediaType, srcUrl }) => {
  if (mediaType === 'image' && srcUrl) {
    return plainText(
      await offscreen.convertImageURLToDataURL(srcUrl, ImageFormat.PNG)
    )
  }
}
