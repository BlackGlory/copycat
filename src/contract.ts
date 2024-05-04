export enum SpecialMessage {
  UpdateActiveFrameId = 'UpdateActiveFrameId'
}

export enum StorageItemKey {
  Menu = 'menu'
, Config = 'config'
}

export interface IStorage {
  [StorageItemKey.Menu]: IMenuStore
  [StorageItemKey.Config]: IConfigStore
}

export type IMenuStore = Array<{
  context: MenuContext
  items: IMenuItem[]
}>

export interface IMenuItem {
  id: string
  visible: boolean
}

export enum MenuContext {
  Page = 'page'
, Frame = 'frame'
, Link = 'link'
, Selection = 'selection'
, Image = 'image'
, Audio = 'audio'
, Video = 'video'
}

export interface IConfigStore {
  url: IURLConfig
  html: IHTMLConfig
  markdown: IMarkdownConfig
}

export interface IURLConfig {
  format: URLFormat
  encoding: URLEncoding
}

export enum URLFormat {
  Original
, Absolute
, Relative
, RootRelative
}

export enum URLEncoding {
  Original
, Encode
, Decode
}

export interface IMarkdownConfig {
  emphasis: MarkdownEmphasis
  strong: MarkdownStrong
  bulletUnordered: MarkdownBullet
  bulletOrdered: MarkdownBulletOrdered
  listItemIndent: MarkdownListItemIndent
  thematicBreak: MarkdownThematicBreak
  fence: MarkdownFence
}

export enum MarkdownBullet {
  '-'
, '*'
, '+'
}

export enum MarkdownBulletOrdered {
  '.'
, ')'
}

export enum MarkdownEmphasis {
  '*'
, '_'
}

export enum MarkdownFence {
  '`'
, '~'
}

export enum MarkdownListItemIndent {
  Space
, Tab
}

export enum MarkdownThematicBreak {
  '*'
, '-'
, '_'
}

export enum MarkdownStrong {
  '*'
, '_'
}

export interface IHTMLConfig {
  formatHTML: boolean
  cleanHTML: IHTMLCleanHTMLConfig
}

export interface IHTMLCleanHTMLConfig {
  allowlist: IHTMLCleanerAllowlistItem[]
}

export interface IHTMLCleanerAllowlistItem {
  elements: string
  attributes: string
}

export interface IFrameAPI {
  getSelectionHTML(): string | null
  getSelectionText(): string | null
  getActiveElementTextContent(): string | null
  getDocumentTitle(): string
}

export const OffscreenChannel = 'offscreen'

export interface IBackgroundAPI {
  getConfig(): IConfigStore
  setConfig(config: IConfigStore): null

  getMenu(): IMenuStore
  setMenu(menu: IMenuStore): null
}

export interface IOffscreenAPI {
  writeTextToClipboard(text: string): null
  writeHTMLToClipboard(html: string): null
  sanitizeHTML(html: string): string
  convertHTMLToPlainText(html: string): string
  cleanHTML(html: string, config: IHTMLCleanHTMLConfig): string
  convertHTMLToMarkdown(html: string, config: IMarkdownConfig): string
  cleanAllHTMLAttributes(html: string): string
  formatURLsInHTML(html: string, baseURL: string, config: IURLConfig): string
}
