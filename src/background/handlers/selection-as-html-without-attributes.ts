import { plainText } from './utils.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { CommandHandler } from './types.js'
import { pipeAsync } from 'extra-utils'
import { offscreen } from '@background/offscreen-client.js'
import { formatHTML } from '@utils/format-html.js'

export const commandSelectionAsHTMLWithoutAttributes: CommandHandler = async (info, tab) => {
  if (tab?.id) {
    const tabClient = createTabClient<IFrameAPI>({
      tabId: tab.id
    , frameId: info.frameId
    })

    const html = await tabClient.getSelectionHTML()
    return plainText(
      await pipeAsync(
        html
      , offscreen.sanitizeHTML
      , offscreen.cleanAllHTMLAttributes
      , formatHTML
      )
    )
  }
}
