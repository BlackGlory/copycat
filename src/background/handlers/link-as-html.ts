import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { createHTMLLink } from '@utils/create-html-link.js'
import { formatURL } from '@utils/format-url.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { pipeAsync } from 'extra-utils'
import { offscreen } from '@background/offscreen-client.js'
import { getConfig } from '@background/storage.js'
import { formatHTML } from '@utils/format-html.js'

export const commandLinkAsHTML: CommandHandler = async (info, tab) => {
  if (info.linkUrl) {
    if (tab && tab.id && tab.url) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const config = await getConfig()
      const url = formatURL(
        info.linkUrl
      , info.frameUrl ?? tab.url
      , config.url
      )
      const html = await tabClient.getActiveElementContent()
      const title = await pipeAsync(
        html
      , offscreen.sanitizeHTML
      , formatHTML
      )

      return plainText(createHTMLLink(url, title))
    } else {
      return plainText(createHTMLLink(info.linkUrl, info.linkText))
    }
  }
}
