import { createServer } from '@delight-rpc/webextension'
import { IOffscreenAPI, OffscreenChannel } from '@src/contract.js'
import { writeTextToClipboard } from '@utils/write-text-to-clipboard.js'
import { writeHTMLToClipboard } from '@utils/write-html-to-clipboard.js'
import { sanitizeHTML } from '@src/utils/sanitize-html.js'

import { convertHTMLToAbsoluteLinkHTML } from '@src/utils/offscreen/convert-html-to-absolute-link-html.js'
import { convertHTMLToCleanHTML } from '@src/utils/offscreen/convert-html-to-clean-html.js'
import { convertHTMLToMarkdown } from '@src/utils/offscreen/convert-html-to-markdown.js'
import { convertHTMLToNoAttrHTML } from '@src/utils/offscreen/convert-html-to-no-attr-html.js'
import { convertHTMLToPlainText } from '@src/utils/offscreen/convert-html-to-plain-text.js'
import { convertHTMLToRelativeLinkHTML } from '@src/utils/offscreen/convert-html-to-relative-link-html.js'
import { convertHTMLToRootRelativeLinkHTML } from '@src/utils/offscreen/convert-html-to-root-relative-link-html.js'
import { convertMarkdownToBeautifyMarkdown } from '@src/utils/offscreen/convert-markdown-to-beautify-markdown.js'
import { convertTextToDecodeEntitiesText } from '@src/utils/offscreen/convert-text-to-decode-entities-text.js'
import { convertTextToTrimmedText } from '@src/utils/offscreen/convert-text-to-trimmed-text.js'
import { convertURLToAbsoluteURL } from '@src/utils/offscreen/convert-url-to-absolute-url.js'
import { convertURLToImageDataURI } from '@src/utils/offscreen/convert-url-to-image-data-uri.js'
import { convertURLToRelativeURL } from '@src/utils/offscreen/convert-url-to-relative-url.js'
import { convertURLToRootRelativeURL } from '@src/utils/offscreen/convert-url-to-root-relative-url.js'

createServer<IOffscreenAPI>({
  writeTextToClipboard
, writeHTMLToClipboard
, sanitizeHTML

, convertHTMLToAbsoluteLinkHTML
, convertHTMLToCleanHTML
, convertHTMLToMarkdown
, convertHTMLToNoAttrHTML
, convertHTMLToPlainText
, convertHTMLToRelativeLinkHTML
, convertHTMLToRootRelativeLinkHTML
, convertMarkdownToBeautifyMarkdown
, convertTextToDecodeEntitiesText
, convertTextToTrimmedText
, convertURLToAbsoluteURL
, convertURLToImageDataURI
, convertURLToRelativeURL
, convertURLToRootRelativeURL
}, { channel: OffscreenChannel })
