import { plainText } from './utils.js'
import { createMarkdownLink } from '@utils/create-markdown-link.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'

export const commandTabLinkAsMarkdown: CommandHandler = async (info, tab) => {
  if (tab?.url) {
    const config = await getConfig()
    const url = formatURL(tab.url, tab.url, config.url)

    return plainText(createMarkdownLink(url, tab.title))
  }
}
