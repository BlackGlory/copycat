export enum StorageItemKey {
  Config = 'config'
}

export interface IStorage {
  [StorageItemKey.Config]: IConfigStorage
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
, GFM
, Ghost
}

export enum ImageFormat {
  JPEG
, WebP
, PNG
}

export interface IConfigStorage {
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
  getConfig(): IConfigStorage
  setConfig(config: IConfigStorage): null
}

export interface IOffscreenAPI {
  writeTextToClipboard(text: string): null
  writeHTMLToClipboard(html: string): null

  convertHTMLToAbsoluteLinkHTML(html: string, baseURL: string): string
  convertHTMLToBBCode(html: string): string
  convertHTMLToBeautifyHTML(html: string): string
  convertHTMLToCommonmarkMarkdown(html: string): string
  convertHTMLToGfmMarkdown(html: string): string
  convertHTMLToGhostMarkdown(html: string): string
  convertHTMLToNoAttrHTML(html: string): string
  convertHTMLToOnlyATagHTML(html: string): string
  convertHTMLToPlainText(html: string): string
  convertHTMLToRelativeLinkHTML(html: string, baseURL: string): string
  convertHTMLToRootRelativeLinkHTML(html: string, baseURL: string): string
  convertHTMLToSafeHTML(html: string): string
  convertMarkdownToBeautifyMarkdown(markdown: string): string
  convertTextToDecodeEntitiesText(text: string): string
  convertTextToRawString(text: string): string
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
