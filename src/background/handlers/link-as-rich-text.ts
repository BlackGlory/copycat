import { richText } from './utils.js'
import { CommandHandler } from './types.js'
import { createHTMLLink } from '@utils/create-html-link.js'

export const commandLinkAsRichText: CommandHandler = async (info, tab) => {
  if (info.linkText && info.linkUrl) {
    return richText(createHTMLLink(info.linkUrl, info.linkText))
  }
}
