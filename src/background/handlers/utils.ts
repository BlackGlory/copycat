import { CommandResultType, CommandResult } from './types.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'

export function plainText(content: string): CommandResult {
  return {
    type: CommandResultType.PlainText
  , content
  }
}

export function richText(content: string): CommandResult {
  return {
    type: CommandResultType.RichText
  , content
  }
}

export async function getActiveElementTextContent(
  tabId: number
, frameId?: number
): Promise<string> {
  const tabClient = createTabClient<IFrameAPI>({ tabId, frameId })
  return await tabClient.getActiveElementTextContent()
}
