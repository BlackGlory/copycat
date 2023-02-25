import { plainText } from './utils.js'
import { createOrgModeLink } from '@utils/create-org-mode-link.js'
import { CommandHandler } from './types.js'

export const commandTabLinkAsOrgMode: CommandHandler = (info, tab) => {
  if (tab?.url) {
    return plainText(createOrgModeLink(tab.url, tab.title))
  }
}
