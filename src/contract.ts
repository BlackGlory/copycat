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

export type IMenuStore = Record<MenuContext, IMenuItem[]>

export interface IStorage {
  [StorageItemKey.Menu]: IMenuStore
  [StorageItemKey.Config]: IConfigStore
}

export interface IConfigStore {
  url: IURLConfig
  markdown: IMarkdownConfig
  html: IHTMLConfig
}

export interface IURLConfig {
  format: URLFormat
  encoding: URLEncoding
}

export interface IMarkdownConfig {
  bullet: MarkdownBullet
  bulletOrdered: MarkdownBulletOrdered
  emphasis: MarkdownEmphasis
  fence: MarkdownFence
  listItemIndent: MarkdownListItemIndent
  rule: MarkdownRule
  strong: MarkdownStrong
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

export enum MarkdownRule {
  '*'
, '-'
, '_'
}

export enum MarkdownStrong {
  '*'
, '_'
}

export interface IHTMLConfig {
  cleaner: IHTMLCleanerConfig
}

export interface IHTMLCleanerConfig {
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
  convertHTMLToBBCode(html: string): string
  convertHTMLToBeautifyHTML(html: string): string
  convertHTMLToMarkdown(html: string, config: IMarkdownConfig): string
  convertHTMLToNoAttrHTML(html: string): string
  convertHTMLToPlainText(html: string): string
  convertHTMLToRelativeLinkHTML(html: string, baseURL: string): string
  convertHTMLToRootRelativeLinkHTML(html: string, baseURL: string): string
  convertHTMLToCleanHTML(html: string, config: IHTMLCleanerConfig): string
  convertHTMLToSanitizedHTML(html: string): string
  convertMarkdownToBeautifyMarkdown(markdown: string): string
  convertTextToDecodeEntitiesText(text: string): string
  convertTextToRawString(text: string): string
  convertTextToJSONString(text: string): string
  convertTextToTrimmedText(text: string): string
  convertURLToAbsoluteURL(relativeURL: string, baseURL: string): string
  convertURLToAudioHTML(url: string): string
  convertURLToImageBBCode(url: string): string
  convertURLToImageDataURI(url: string, format?: ImageFormat): string
  convertURLToImageHTML(url: string): string
  convertURLToImageMarkdown(url: string): string
  convertURLToLinkBBCode(url: string, text?: string): string
  convertURLToLinkHTML(url: string, text?: string): string
  convertURLToLinkMarkdown(url: string, text?: string): string
  convertURLToLinkPlain(url: string, text?: string): string
  convertURLToLinkOrgMode(url: string, text?: string): string 
  convertURLToLinkAsciiDoc(url: string, text?: string): string
  convertURLToRelativeURL(absoluteURL: string, baseURL: string): string
  convertURLToRootRelativeURL(url: string, baseURL: string): string
  convertURLToVideoHTML(url: string): string
}

export enum URLFormat {
  Original
, Absolute
, Relative
, RootRelative
}

export enum URLEncoding {
  Original
, AlwaysEncode
, AlwaysDecode
}

export enum ImageFormat {
  JPEG
, WebP
, PNG
}
