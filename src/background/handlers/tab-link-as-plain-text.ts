import { CommandHandler } from './types.js'
import { plainText } from './utils.js'
import { createPlainTextLink } from '@utils/create-plain-text-link.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'

export const commandTabLinkAsPlainText: CommandHandler = async (info, tab) => {
  if (tab.url) {
    const config = await getConfig()
    const url = formatURL(tab.url, tab.url, config.url)

    return plainText(createPlainTextLink(url, tab.title))
  }
}
