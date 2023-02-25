import { CommandHandler } from './types.js'
import { plainText } from './utils.js'
import { createPlainTextLink } from '@utils/create-plain-text-link.js'

export const commandTabLinkAsPlainText: CommandHandler = (info, tab) => {
  if (tab?.url) {
    return plainText(createPlainTextLink(tab.url, tab.title))
  }
}
