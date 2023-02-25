import { createServer } from '@delight-rpc/webextension'
import { IOffscreenAPI, OffscreenChannel } from '@src/contract.js'
import { writeTextToClipboard } from '@utils/write-text-to-clipboard.js'
import { writeHTMLToClipboard } from '@utils/write-html-to-clipboard.js'
import { sanitizeHTML } from '@src/utils/sanitize-html.js'
import { convertHTMLToPlainText } from '@utils/convert-html-to-plain-text.js'
import { convertHTMLToMarkdown } from '@utils/convert-html-to-markdown.js'

import { convertHTMLToAbsoluteLinkHTML } from '@src/utils/offscreen/convert-html-to-absolute-link-html.js'
import { cleanHTML } from '@utils/clean-html.js'
import { convertHTMLToNoAttrHTML } from '@src/utils/offscreen/convert-html-to-no-attr-html.js'
import { convertHTMLToRelativeLinkHTML } from '@src/utils/offscreen/convert-html-to-relative-link-html.js'
import { convertHTMLToRootRelativeLinkHTML } from '@src/utils/offscreen/convert-html-to-root-relative-link-html.js'
import { convertURLToImageDataURI } from '@src/utils/offscreen/convert-url-to-image-data-uri.js'

createServer<IOffscreenAPI>({
  writeTextToClipboard
, writeHTMLToClipboard
, sanitizeHTML
, convertHTMLToPlainText
, cleanHTML
, convertHTMLToMarkdown

, convertHTMLToAbsoluteLinkHTML
, convertHTMLToNoAttrHTML
, convertHTMLToRelativeLinkHTML
, convertHTMLToRootRelativeLinkHTML
, convertURLToImageDataURI
}, { channel: OffscreenChannel })
