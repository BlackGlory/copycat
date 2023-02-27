import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createHTMLAudio } from '@utils/create-html-audio.js'

export const commandAudioAsHTML: CommandHandler = async (info, tab) => {
  if (info.mediaType === 'audio' && info.srcUrl) {
    const config = await getConfig()
    const url = formatURL(
      info.srcUrl
    , info.frameUrl ?? info.pageUrl ?? tab.url ?? info.srcUrl
    , config.url
    )

    return plainText(createHTMLAudio(url))
  }
}
