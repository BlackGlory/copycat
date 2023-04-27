import { CommandHandler } from './types.js'
import { plainText } from './utils.js'

export const commandTabTitle: CommandHandler = async (info, tab) => {
  if (tab.title) {
    return plainText(tab.title)
  }
}
