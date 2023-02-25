import { plainText } from './utils.js'
import { createBBCodeLink } from '@utils/create-bbcode-link.js'
import { CommandHandler } from './types.js'

export const commandTabLinkAsBBCode: CommandHandler = (info, tab) => {
  if (tab?.url) {
    return plainText(createBBCodeLink(tab.url, tab.title))
  }
}
