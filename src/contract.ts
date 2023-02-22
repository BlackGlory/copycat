export enum StorageItemKey {
  Config = 'config'
, Menu = 'menu'
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
  [StorageItemKey.Config]: IConfigStore
  [StorageItemKey.Menu]: IMenuStore
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

export enum MarkdownFlavor {
  Commonmark
, GitHubFlavoredMarkdown
}

export enum ImageFormat {
  JPEG
, WebP
, PNG
}

export interface IConfigStore {
  urlFormat: URLFormat
  urlEncoding: URLEncoding
  markdownFlavor: MarkdownFlavor
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
  convertHTMLToCommonmarkMarkdown(html: string): string
  convertHTMLToGfmMarkdown(html: string): string
  convertHTMLToNoAttrHTML(html: string): string
  convertHTMLToOnlyATagHTML(html: string): string
  convertHTMLToPlainText(html: string): string
  convertHTMLToRelativeLinkHTML(html: string, baseURL: string): string
  convertHTMLToRootRelativeLinkHTML(html: string, baseURL: string): string
  convertHTMLToCleanHTML(html: string): string
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
