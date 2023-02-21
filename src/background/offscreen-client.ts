import { createBackgroundClient } from '@delight-rpc/webextension'
import { IOffscreenAPI, OffscreenChannel } from '@src/contract'

export const offscreenClient = createBackgroundClient<IOffscreenAPI>({
  channel: OffscreenChannel
})
