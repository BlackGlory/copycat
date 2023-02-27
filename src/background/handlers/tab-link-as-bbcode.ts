import { plainText } from './utils.js'
import { createBBCodeLink } from '@utils/create-bbcode-link.js'
import { CommandHandler } from './types.js'
import { formatURL } from '@utils/format-url.js'
import { getConfig } from '@background/storage.js'

export const commandTabLinkAsBBCode: CommandHandler = async (info, tab) => {
  if (tab.url) {
    const config = await getConfig()
    const url = formatURL(tab.url, tab.url, config.url)

    return plainText(createBBCodeLink(url, tab.title))
  }
}
