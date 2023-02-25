import { plainText } from './utils.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { CommandHandler } from './types.js'

export const commandSelectionAsPlainText: CommandHandler = async (info, tab) => {
  if (tab?.id) {
    const tabClient = createTabClient<IFrameAPI>({
      tabId: tab.id
    , frameId: info.frameId
    })

    return plainText(await tabClient.getSelectionText())
  }
}
