import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createHTMLAudio } from '@utils/create-html-audio.js'

export const commandAudioAsHTML: CommandHandler = async (info, tab) => {
  if (info.mediaType === 'audio' && info.srcUrl) {
    if (tab?.url) {
      const config = await getConfig()
      const url = formatURL(
        info.srcUrl
      , info.frameUrl ?? tab.url
      , config.url
      )

      return plainText(createHTMLAudio(url))
    } else {
      return plainText(createHTMLAudio(info.srcUrl))
    }
  }
}
