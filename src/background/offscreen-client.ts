import { createBackgroundClient } from '@delight-rpc/webextension'
import { IOffscreenAPI, OffscreenChannel } from '@src/contract.js'

export const offscreen = createBackgroundClient<IOffscreenAPI>({
  channel: OffscreenChannel
})
