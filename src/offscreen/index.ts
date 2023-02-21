import { createServer } from '@delight-rpc/webextension'
import { IOffscreenAPI, OffscreenChannel } from '@src/contract.js'
import { convertHtmlToAbsoluteLinkHTML } from '@converters/convert-html-to-absolute-link-html.js'
import { convertHtmlToBBCode } from '@converters/convert-html-to-bbcode.js'
import { convertHtmlToBeautifyHTML } from '@converters/convert-html-to-beautify-html.js'
import { convertHtmlToCommonmarkMarkdown } from '@converters/convert-html-to-commonmark-markdown.js'
import { convertHtmlToGfmMarkdown } from '@converters/convert-html-to-gfm-markdown.js'
import { convertHtmlToGhostMarkdown } from '@converters/convert-html-to-ghost-markdown.js'
import { convertHtmlToNoAttrHTML } from '@converters/convert-html-to-no-attr-html.js'
import { convertHtmlToOnlyATagHTML } from '@converters/convert-html-to-only-a-tag-html.js'
import { convertHtmlToPlainText } from '@converters/convert-html-to-plain-text.js'
import { convertHtmlToRelativeLinkHTML } from '@converters/convert-html-to-relative-link-html.js'
import { convertHtmlToRootRelativeLinkHTML } from '@converters/convert-html-to-root-relative-link-html.js'
import { convertHtmlToSafeHTML } from '@converters/convert-html-to-safe-html.js'
import { convertMarkdownToBeautifyMarkdown } from '@converters/convert-markdown-to-beautify-markdown.js'
import { convertTextToDecodeEntitiesText } from '@converters/convert-text-to-decode-entities-text.js'
import { convertTextToRawString } from '@converters/convert-text-to-raw-string.js'
import { convertTextToTrimmedText } from '@converters/convert-text-to-trimmed-text.js'
import { convertUrlToAbsoluteURL } from '@converters/convert-url-to-absolute-url.js'
import { convertUrlToAudioHTML } from '@converters/convert-url-to-audio-html.js'
import { convertUrlToImageBBCode } from '@converters/convert-url-to-image-bbcode.js'
import { convertUrlToImageDataURI } from '@converters/convert-url-to-image-data-uri.js'
import { convertUrlToImageHTML } from '@converters/convert-url-to-image-html.js'
import { convertUrlToImageMarkdown } from '@converters/convert-url-to-image-markdown.js'
import { convertUrlToLinkBBCode } from '@converters/convert-url-to-link-bbcode.js'
import { convertUrlToLinkHTML } from '@converters/convert-url-to-link-html.js'
import { convertUrlToLinkMarkdown } from '@converters/convert-url-to-link-markdown.js'
import { convertUrlToLinkPlain } from '@converters/convert-url-to-link-plain.js'
import { convertUrlToRelativeURL } from '@converters/convert-url-to-relative-url.js'
import { convertUrlToRootRelativeURL } from '@converters/convert-url-to-root-relative-url.js'
import { convertUrlToVideoHTML } from '@converters/convert-url-to-video-html.js'
import { writeTextToClipboard } from '@utils/write-text-to-clipboard.js'
import { convertUrlToLinkOrgMode } from '@converters/convert-url-to-link-org-mode.js'
import { convertUrlToLinkAsciiDoc } from '@converters/convert-url-to-link-ascii-doc.js'

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
, convertUrlToLinkOrgMode
, convertUrlToLinkAsciiDoc
, convertUrlToRelativeURL
, convertUrlToRootRelativeURL
, convertUrlToVideoHTML
}, { channel: OffscreenChannel })
