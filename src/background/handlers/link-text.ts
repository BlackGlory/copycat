import { plainText } from './utils.js'
import { CommandHandler } from './types.js'

export const commandLinkText: CommandHandler = (info, tab) => {
  if (info.linkText) {
    return plainText(info.linkText)
  }
}
