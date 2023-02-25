import { plainText } from './utils.js'
import { createHTMLLink } from '@utils/create-html-link.js'
import { CommandHandler } from './types.js'

export const commandTabLinkAsHTML: CommandHandler = (info, tab) => {
  if (tab?.url) {
    return plainText(createHTMLLink(tab.url, tab.title))
  }
}
