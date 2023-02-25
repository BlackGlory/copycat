import { plainText } from './utils.js'
import { formatURL } from '@utils/format-url.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { pipeAsync } from 'extra-utils'
import { offscreen } from '@background/offscreen-client.js'
import { getConfig } from '@background/storage.js'
import { formatHTML } from '@utils/format-html.js'
import { createMarkdownLink } from '@utils/create-markdown-link.js'
import { formatMarkdown } from '@utils/format-markdown.js'
import { CommandHandler } from './types.js'

export const commandLinkAsMarkdown: CommandHandler = async (info, tab) => {
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
      const text = await pipeAsync(
        html
      , offscreen.sanitizeHTML
      , formatHTML
      , html => offscreen.convertHTMLToMarkdown(html, config.markdown)
      , formatMarkdown
      )

      return plainText(createMarkdownLink(url, text))
    } else {
      return plainText(createMarkdownLink(info.linkUrl, info.linkText))
    }
  }
}
