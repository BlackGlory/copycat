import { plainText } from './utils.js'
import { CommandHandler } from './types.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'

export const commandLinkText: CommandHandler = async (info, tab) => {
  if (tab?.id) {
    const tabClient = createTabClient<IFrameAPI>({
      tabId: tab.id
    , frameId: info.frameId
    })
    // 依赖`getActiveElementTextContent`是因为Chrome给的`info.linkText`基本上是空的
    const linkText = await tabClient.getActiveElementTextContent()

    return plainText(linkText)
  } else {
    if (info.linkText) {
      return plainText(info.linkText)
    }
  }
}
