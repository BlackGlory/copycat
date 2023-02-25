import { plainText } from './utils.js'
import { formatURL } from '@utils/format-url.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { pipeAsync } from 'extra-utils'
import { offscreen } from '@background/offscreen-client.js'
import { getConfig } from '@background/storage.js'
import { formatHTML } from '@utils/format-html.js'
import { CommandHandler } from './types.js'
import { createBBCodeLink } from '@utils/create-bbcode-link.js'
import { convertHTMLToBBCode } from '@utils/convert-html-to-bbcode.js'

export const commandLinkAsBBCode: CommandHandler = async (info, tab) => {
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
      , convertHTMLToBBCode
      )

      return plainText(createBBCodeLink(url, title))
    } else {
      return plainText(createBBCodeLink(info.linkUrl, info.linkText))
    }
  }
}
