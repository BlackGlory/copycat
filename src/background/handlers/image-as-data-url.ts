import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { convertURLToDataURL } from '@utils/convert-url-to-data-url.js'

export const commandImageAsDataURL: CommandHandler = async (info, tab) => {
  if (info.mediaType === 'image' && info.srcUrl) {
    return plainText(
      await convertURLToDataURL(info.srcUrl)
    )
  }
}
