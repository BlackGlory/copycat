import { richText } from './utils.js'
import { createHTMLLink } from '@utils/create-html-link.js'
import { CommandHandler } from './types.js'

export const commandTabLinkAsRichText: CommandHandler = (info, tab) => {
  if (tab?.url) {
    return richText(createHTMLLink(tab.url, tab.title))
  }
}
