import { plainText } from './utils.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createPlainTextLink } from '@utils/create-plain-text-link.js'

export const commandFrameLinkAsPlainText: CommandHandler = async (info, tab) => {
  if (info.frameUrl) {
    if (tab?.id && tab.url) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const config = await getConfig()
      const url = formatURL(info.frameUrl, tab.url, config.url)
      const title = await tabClient.getDocumentTitle()

      return plainText(createPlainTextLink(url, title))
    } else {
      return plainText(createPlainTextLink(info.frameUrl))
    }
  }
}
