export enum StorageItemKey {
  Config = 'config'
}

export interface IStorage {
  [StorageItemKey.Config]: IConfigStorage
}

export enum URLFormat {
  Original = 'original'
, Absolute = 'absolute'
, Relative = 'relative'
, RootRelative = 'root-relative'
}

export enum MarkdownFlavor {
  Commonmark = 'commonmark'
, GFM = 'gfm'
, Ghost = 'ghost'
}

export enum ImageFormat {
  JPEG = 'jpeg'
, WebP = 'webp'
, PNG = 'png'
}

export interface IConfigStorage {
  urlFormat: URLFormat
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

  convertHtmlToAbsoluteLinkHTML(html: string, baseUrl: string): string
  convertHtmlToBBCode(html: string): string
  convertHtmlToBeautifyHTML(html: string): string
  convertHtmlToCommonmarkMarkdown(html: string): string
  convertHtmlToGfmMarkdown(html: string): string
  convertHtmlToGhostMarkdown(html: string): string
  convertHtmlToNoAttrHTML(html: string): string
  convertHtmlToOnlyATagHTML(html: string): string
  convertHtmlToPlainText(html: string): string
  convertHtmlToRelativeLinkHTML(html: string, baseUrl: string): string
  convertHtmlToRootRelativeLinkHTML(html: string, baseUrl: string): string
  convertHtmlToSafeHTML(html: string): string
  convertMarkdownToBeautifyMarkdown(markdown: string): string
  convertTextToDecodeEntitiesText(text: string): string
  convertTextToRawString(text: string): string
  convertTextToTrimmedText(text: string): string
  convertUrlToAbsoluteURL(relativeUrl: string, baseUrl: string): string
  convertUrlToAudioHTML(url: string): string
  convertUrlToImageBBCode(url: string): string
  convertUrlToImageDataURI(url: string, format?: ImageFormat): string
  convertUrlToImageHTML(url: string): string
  convertUrlToImageMarkdown(url: string): string
  convertUrlToLinkBBCode(url: string, text?: string): string
  convertUrlToLinkHTML(url: string, text?: string): string
  convertUrlToLinkMarkdown(url: string, text?: string): string
  convertUrlToLinkPlain(url: string, text?: string): string
  convertUrlToLinkOrgMode(url: string, text?: string): string 
  convertUrlToLinkAsciiDoc(url: string, text?: string): string
  convertUrlToRelativeURL(absoluteUrl: string, baseUrl: string): string
  convertUrlToRootRelativeURL(url: string, baseUrl: string): string
  convertUrlToVideoHTML(url: string): string
}
