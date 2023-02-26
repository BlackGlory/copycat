import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { offscreen } from '@background/offscreen-client.js'
import { ImageFormat } from '@src/contract.js'

export const commandImageAsDataURLPNG: CommandHandler = async (info, tab) => {
  if (info.mediaType === 'image' && info.srcUrl) {
    return plainText(
      await offscreen.convertImageURLToDataURL(info.srcUrl, ImageFormat.PNG)
    )
  }
}
