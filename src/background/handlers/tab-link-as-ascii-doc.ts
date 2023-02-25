import { plainText } from './utils.js'
import { createAsciiDocLink } from '@utils/create-ascii-doc-link.js'
import { CommandHandler } from './types.js'

export const commandTabLinkAsAsciiDoc: CommandHandler = (info, tab) => {
  if (tab?.url) {
    return plainText(createAsciiDocLink(tab.url, tab.title))
  }
}
