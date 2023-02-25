export enum StorageItemKey {
  Menu = 'menu'
, Config = 'config'
}

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
, Video = 'video'
, Audio = 'audio'
}

export type IMenuStore = Array<{
  context: MenuContext
, items: IMenuItem[]
}>

export interface IStorage {
  [StorageItemKey.Menu]: IMenuStore
  [StorageItemKey.Config]: IConfigStore
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
  getSelectionHTML(): string
  getSelectionText(): string
  getActiveElementContent(): string
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

  convertHTMLToAbsoluteLinkHTML(html: string, baseURL: string): string
  convertHTMLToBeautifyHTML(html: string): string
  convertHTMLToMarkdown(html: string, config: IMarkdownConfig): string
  convertHTMLToNoAttrHTML(html: string): string
  convertHTMLToPlainText(html: string): string
  convertHTMLToRelativeLinkHTML(html: string, baseURL: string): string
  convertHTMLToRootRelativeLinkHTML(html: string, baseURL: string): string
  convertHTMLToCleanHTML(html: string, config: IHTMLCleanHTMLConfig): string
  convertHTMLToSanitizedHTML(html: string): string
  convertMarkdownToBeautifyMarkdown(markdown: string): string
  convertTextToDecodeEntitiesText(text: string): string
  convertTextToTrimmedText(text: string): string
  convertURLToAbsoluteURL(relativeURL: string, baseURL: string): string
  convertURLToImageDataURI(url: string, format?: ImageFormat): string
  convertURLToRelativeURL(absoluteURL: string, baseURL: string): string
  convertURLToRootRelativeURL(url: string, baseURL: string): string
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

export enum ImageFormat {
  JPEG
, WebP
, PNG
}
