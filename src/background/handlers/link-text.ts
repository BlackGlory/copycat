import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { getActiveElementTextContent } from './utils.js'

export const commandLinkText: CommandHandler = async (info, tab) => {
  if (tab?.id) {
    return plainText(
      // Chrome普遍不提供`info.linkText`
      info.linkText ?? await getActiveElementTextContent(tab.id, info.frameId)
    )
  } else {
    if (info.linkText) {
      return plainText(info.linkText)
    }
  }
}
