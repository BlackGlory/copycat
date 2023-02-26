import { richText } from './utils.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createHTMLLink } from '@utils/create-html-link.js'
import { CommandHandler } from './types.js'

export const commandFrameLinkAsRichText: CommandHandler = async (info, tab) => {
  if (info.frameUrl) {
    const config = await getConfig()
    const url = formatURL(info.frameUrl, info.frameUrl, config.url)

    if (tab?.id && tab.url) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })
      const title = await tabClient.getDocumentTitle()

      return richText(createHTMLLink(url, title))
    } else {
      return richText(createHTMLLink(url, tab?.title))
    }
  }
}
