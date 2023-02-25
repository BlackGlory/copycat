import { plainText } from './utils.js'
import { createMarkdownLink } from '@utils/create-markdown-link.js'
import { CommandHandler } from './types.js'

export const commandTabLinkAsMarkdown: CommandHandler = (info, tab) => {
  if (tab?.url) {
    return plainText(createMarkdownLink(tab.url, tab.title))
  }
}
