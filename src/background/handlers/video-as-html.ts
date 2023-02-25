import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createHTMLVideo } from '@utils/create-html-video.js'

export const commandVideoAsHTML: CommandHandler = async (info, tab) => {
  if (info.mediaType === 'video' && info.srcUrl) {
    if (tab?.url) {
      const config = await getConfig()
      const url = formatURL(
        info.srcUrl
      , info.frameUrl ?? tab.url
      , config.url
      )
      return plainText(createHTMLVideo(url))
    } else {
      return plainText(createHTMLVideo(info.srcUrl))
    }
  }
}
