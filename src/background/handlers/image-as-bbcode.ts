import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createBBCodeImage } from '@utils/create-bbcode-image.js'

export const commandImageAsBBCode: CommandHandler = async (info, tab) => {
  if (info.mediaType === 'image' && info.srcUrl) {
    if (tab?.url) {
      const config = await getConfig()
      const url = formatURL(
        info.srcUrl
      , info.frameUrl ?? tab.url
      , config.url
      )

      return plainText(createBBCodeImage(url))
    } else {
      return plainText(createBBCodeImage(info.srcUrl))
    }
  }
}
