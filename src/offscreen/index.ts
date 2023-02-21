import { createServer } from '@delight-rpc/webextension'
import { IOffscreenAPI, OffscreenChannel } from '@src/contract'
import { convertHtmlToAbsoluteLinkHTML } from '@converters/convert-html-to-absolute-link-html'
import { convertHtmlToBBCode } from '@converters/convert-html-to-bbcode'
import { convertHtmlToBeautifyHTML } from '@converters/convert-html-to-beautify-html'
import { convertHtmlToCommonmarkMarkdown } from '@converters/convert-html-to-commonmark-markdown'
import { convertHtmlToGfmMarkdown } from '@converters/convert-html-to-gfm-markdown'
import { convertHtmlToGhostMarkdown } from '@converters/convert-html-to-ghost-markdown'
import { convertHtmlToNoAttrHTML } from '@converters/convert-html-to-no-attr-html'
import { convertHtmlToOnlyATagHTML } from '@converters/convert-html-to-only-a-tag-html'
import { convertHtmlToPlainText } from '@converters/convert-html-to-plain-text'
import { convertHtmlToRelativeLinkHTML } from '@converters/convert-html-to-relative-link-html'
import { convertHtmlToRootRelativeLinkHTML } from '@converters/convert-html-to-root-relative-link-html'
import { convertHtmlToSafeHTML } from '@converters/convert-html-to-safe-html'
import { convertMarkdownToBeautifyMarkdown } from '@converters/convert-markdown-to-beautify-markdown'
import { convertTextToDecodeEntitiesText } from '@converters/convert-text-to-decode-entities-text'
import { convertTextToRawString } from '@converters/convert-text-to-raw-string'
import { convertTextToTrimmedText } from '@converters/convert-text-to-trimmed-text'
import { convertUrlToAbsoluteURL } from '@converters/convert-url-to-absolute-url'
import { convertUrlToAudioHTML } from '@converters/convert-url-to-audio-html'
import { convertUrlToImageBBCode } from '@converters/convert-url-to-image-bbcode'
import { convertUrlToImageDataURI } from '@converters/convert-url-to-image-data-uri'
import { convertUrlToImageHTML } from '@converters/convert-url-to-image-html'
import { convertUrlToImageMarkdown } from '@converters/convert-url-to-image-markdown'
import { convertUrlToLinkBBCode } from '@converters/convert-url-to-link-bbcode'
import { convertUrlToLinkHTML } from '@converters/convert-url-to-link-html'
import { convertUrlToLinkMarkdown } from '@converters/convert-url-to-link-markdown'
import { convertUrlToLinkPlain } from '@converters/convert-url-to-link-plain'
import { convertUrlToRelativeURL } from '@converters/convert-url-to-relative-url'
import { convertUrlToRootRelativeURL } from '@converters/convert-url-to-root-relative-url'
import { convertUrlToVideoHTML } from '@converters/convert-url-to-video-html'
import { writeTextToClipboard } from '@utils/write-text-to-clipboard'

createServer<IOffscreenAPI>({
  writeTextToClipboard

, convertHtmlToAbsoluteLinkHTML
, convertHtmlToBBCode
, convertHtmlToBeautifyHTML
, convertHtmlToCommonmarkMarkdown
, convertHtmlToGfmMarkdown
, convertHtmlToGhostMarkdown
, convertHtmlToNoAttrHTML
, convertHtmlToOnlyATagHTML
, convertHtmlToPlainText
, convertHtmlToRelativeLinkHTML
, convertHtmlToRootRelativeLinkHTML
, convertHtmlToSafeHTML
, convertMarkdownToBeautifyMarkdown
, convertTextToDecodeEntitiesText
, convertTextToRawString
, convertTextToTrimmedText
, convertUrlToAbsoluteURL
, convertUrlToAudioHTML
, convertUrlToImageBBCode
, convertUrlToImageDataURI
, convertUrlToImageHTML
, convertUrlToImageMarkdown
, convertUrlToLinkBBCode
, convertUrlToLinkHTML
, convertUrlToLinkMarkdown
, convertUrlToLinkPlain
, convertUrlToRelativeURL
, convertUrlToRootRelativeURL
, convertUrlToVideoHTML
}, { channel: OffscreenChannel })
