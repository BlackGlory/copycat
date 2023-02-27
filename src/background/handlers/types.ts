import browser from 'webextension-polyfill'
import { Awaitable } from '@blackglory/prelude'

export interface IInfo {
  pageUrl?: string
  frameUrl?: string
  frameId?: number
  linkText?: string
  linkUrl?: string
  mediaType?: string
  srcUrl?: string
}

export type CommandHandler = (
  info: IInfo
, tab: browser.Tabs.Tab
) => Awaitable<CommandResult | undefined>

export interface CommandResult {
  type: CommandResultType
  content: string
}

export enum CommandResultType {
  PlainText
, RichText
}
