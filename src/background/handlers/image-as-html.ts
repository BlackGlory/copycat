import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createHTMLImage } from '@utils/create-html-image.js'

export const commandImageAsHTML: CommandHandler = async (info, tab) => {
  if (info.mediaType === 'image' && info.srcUrl) {
    const config = await getConfig()
    const url = formatURL(
      info.srcUrl
    , info.frameUrl ?? info.pageUrl ?? tab?.url ?? info.srcUrl
    , config.url
    )

    return plainText(createHTMLImage(url))
  }
}
