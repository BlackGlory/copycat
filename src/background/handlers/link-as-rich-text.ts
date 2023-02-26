import { richText } from './utils.js'
import { CommandHandler } from './types.js'
import { createHTMLLink } from '@utils/create-html-link.js'
import { formatURL } from '@utils/format-url.js'
import { getConfig } from '@background/storage.js'
import { getActiveElementTextContent } from './utils.js'

export const commandLinkAsRichText: CommandHandler = async (info, tab) => {
  if (info.linkUrl) {
    const config = await getConfig()
    const url = formatURL(
      info.linkUrl
    , info.frameUrl ?? info.pageUrl ?? tab?.url ?? info.linkUrl
    , config.url
    )

    if (tab?.id) {
      return richText(
        createHTMLLink(
          url
          // Chrome普遍不提供`info.linkText`
        , info.linkText ?? await getActiveElementTextContent(tab.id, info.frameId)
        )
      )
    } else {
      return richText(createHTMLLink(url, info.linkText))
    }
  }
}
