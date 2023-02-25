import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createMarkdownImage } from '@utils/create-markdown-image.js'

export const commandImageAsMarkdown: CommandHandler = async (info, tab) => {
  if (info.mediaType === 'image' && info.srcUrl) {
    if (tab && tab.url) {
      const config = await getConfig()
      const url = formatURL(
        info.srcUrl
      , info.frameUrl ?? tab.url
      , config.url
      )

      return plainText(createMarkdownImage(url))
    } else {
      return plainText(createMarkdownImage(info.srcUrl))
    }
  }
}
