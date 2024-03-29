import { plainText } from './utils.js'
import { formatURL } from '@utils/format-url.js'
import { getConfig } from '@background/storage.js'
import { CommandHandler } from './types.js'
import { createOrgModeLink } from '@utils/create-org-mode-link.js'
import { getActiveElementTextContent } from './utils.js'

export const commandLinkAsOrgMode: CommandHandler = async (info, tab) => {
  if (info.linkUrl) {
    const config = await getConfig()
    const url = formatURL(
      info.linkUrl
    , info.frameUrl ?? info.pageUrl ?? tab.url ?? info.linkUrl
    , config.url
    )

    if (tab.id) {
      return plainText(
        createOrgModeLink(
          url
          // Chrome普遍不提供`info.linkText`
        , info.linkText ?? await getActiveElementTextContent(tab.id, info.frameId)
        )
      )
    } else {
      return plainText(createOrgModeLink(url, info.linkText))
    }
  }
}
