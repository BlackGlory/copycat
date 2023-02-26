import { createServer } from '@delight-rpc/webextension'
import { IOffscreenAPI, OffscreenChannel } from '@src/contract.js'
import { writeTextToClipboard } from '@utils/write-text-to-clipboard.js'
import { writeHTMLToClipboard } from '@utils/write-html-to-clipboard.js'
import { sanitizeHTML } from '@src/utils/sanitize-html.js'
import { convertHTMLToPlainText } from '@utils/convert-html-to-plain-text.js'
import { convertHTMLToMarkdown } from '@utils/convert-html-to-markdown.js'
import { cleanAllHTMLAttributes } from '@utils/clean-all-html-attributes.js'
import { cleanHTML } from '@utils/clean-html.js'
import { formatURLsInHTML } from '@utils/format-urls-in-html.js'

createServer<IOffscreenAPI>({
  writeTextToClipboard
, writeHTMLToClipboard
, sanitizeHTML
, convertHTMLToPlainText
, cleanHTML
, convertHTMLToMarkdown
, cleanAllHTMLAttributes
, formatURLsInHTML
}, { channel: OffscreenChannel })
