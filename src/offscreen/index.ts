import { createServer } from '@delight-rpc/webextension'
import { IOffscreenAPI, OffscreenChannel } from '@src/contract.js'
import { writeTextToClipboard } from '@utils/write-text-to-clipboard.js'
import { writeHTMLToClipboard } from '@utils/write-html-to-clipboard.js'
import { convertHTMLToAbsoluteLinkHTML } from '@converters/convert-html-to-absolute-link-html.js'
import { convertHTMLToBBCode } from '@converters/convert-html-to-bbcode.js'
import { convertHTMLToBeautifyHTML } from '@converters/convert-html-to-beautify-html.js'
import { convertHTMLToCommonmarkMarkdown } from '@converters/convert-html-to-commonmark-markdown.js'
import { convertHTMLToGfmMarkdown } from '@converters/convert-html-to-gfm-markdown.js'
import { convertHTMLToNoAttrHTML } from '@converters/convert-html-to-no-attr-html.js'
import { convertHTMLToOnlyATagHTML } from '@converters/convert-html-to-only-a-tag-html.js'
import { convertHTMLToPlainText } from '@converters/convert-html-to-plain-text.js'
import { convertHTMLToRelativeLinkHTML } from '@converters/convert-html-to-relative-link-html.js'
import { convertHTMLToRootRelativeLinkHTML } from '@converters/convert-html-to-root-relative-link-html.js'
import { convertHTMLToSafeHTML } from '@converters/convert-html-to-safe-html.js'
import { convertMarkdownToBeautifyMarkdown } from '@converters/convert-markdown-to-beautify-markdown.js'
import { convertTextToDecodeEntitiesText } from '@converters/convert-text-to-decode-entities-text.js'
import { convertTextToRawString } from '@converters/convert-text-to-raw-string.js'
import { convertTextToTrimmedText } from '@converters/convert-text-to-trimmed-text.js'
import { convertURLToAbsoluteURL } from '@converters/convert-url-to-absolute-url.js'
import { convertURLToAudioHTML } from '@converters/convert-url-to-audio-html.js'
import { convertURLToImageBBCode } from '@converters/convert-url-to-image-bbcode.js'
import { convertURLToImageDataURI } from '@converters/convert-url-to-image-data-uri.js'
import { convertURLToImageHTML } from '@converters/convert-url-to-image-html.js'
import { convertURLToImageMarkdown } from '@converters/convert-url-to-image-markdown.js'
import { convertURLToLinkBBCode } from '@converters/convert-url-to-link-bbcode.js'
import { convertURLToLinkHTML } from '@converters/convert-url-to-link-html.js'
import { convertURLToLinkMarkdown } from '@converters/convert-url-to-link-markdown.js'
import { convertURLToLinkPlain } from '@converters/convert-url-to-link-plain.js'
import { convertURLToRelativeURL } from '@converters/convert-url-to-relative-url.js'
import { convertURLToRootRelativeURL } from '@converters/convert-url-to-root-relative-url.js'
import { convertURLToVideoHTML } from '@converters/convert-url-to-video-html.js'
import { convertURLToLinkOrgMode } from '@converters/convert-url-to-link-org-mode.js'
import { convertURLToLinkAsciiDoc } from '@converters/convert-url-to-link-ascii-doc.js'
import { convertTextToJSONString } from '@converters/convert-text-to-json-string.js'

createServer<IOffscreenAPI>({
  writeTextToClipboard
, writeHTMLToClipboard

, convertHTMLToAbsoluteLinkHTML
, convertHTMLToBBCode
, convertHTMLToBeautifyHTML
, convertHTMLToCommonmarkMarkdown
, convertHTMLToGfmMarkdown
, convertHTMLToNoAttrHTML
, convertHTMLToOnlyATagHTML
, convertHTMLToPlainText
, convertHTMLToRelativeLinkHTML
, convertHTMLToRootRelativeLinkHTML
, convertHTMLToSafeHTML
, convertMarkdownToBeautifyMarkdown
, convertTextToDecodeEntitiesText
, convertTextToRawString
, convertTextToJSONString
, convertTextToTrimmedText
, convertURLToAbsoluteURL
, convertURLToAudioHTML
, convertURLToImageBBCode
, convertURLToImageDataURI
, convertURLToImageHTML
, convertURLToImageMarkdown
, convertURLToLinkBBCode
, convertURLToLinkHTML
, convertURLToLinkMarkdown
, convertURLToLinkPlain
, convertURLToLinkOrgMode
, convertURLToLinkAsciiDoc
, convertURLToRelativeURL
, convertURLToRootRelativeURL
, convertURLToVideoHTML
}, { channel: OffscreenChannel })
