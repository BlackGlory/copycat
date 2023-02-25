import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { createPlainTextLink } from '@utils/create-plain-text-link.js'

export const commandLinkAsPlainText: CommandHandler = (info, tab) => {
  if (info.linkText && info.linkUrl) {
    return plainText(createPlainTextLink(info.linkUrl, info.linkText))
  }
}
