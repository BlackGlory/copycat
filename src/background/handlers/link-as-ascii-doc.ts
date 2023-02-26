import { plainText } from './utils.js'
import { formatURL } from '@utils/format-url.js'
import { getConfig } from '@background/storage.js'
import { CommandHandler } from './types.js'
import { createAsciiDocLink } from '@utils/create-ascii-doc-link.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'

export const commandLinkAsAsciiDoc: CommandHandler = async (info, tab) => {
  if (info.linkUrl) {
    const config = await getConfig()
    const url = formatURL(
      info.linkUrl
    , info.frameUrl ?? info.pageUrl ?? tab?.url ?? info.linkUrl
    , config.url
    )

    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })
      // 依赖`getActiveElementTextContent`是因为Chrome给的`info.linkText`基本上是空的
      const linkText = await tabClient.getActiveElementTextContent()

      return plainText(createAsciiDocLink(url, linkText))
    } else {
      return plainText(createAsciiDocLink(url, info.linkText))
    }
  }
}
