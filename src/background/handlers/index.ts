import { offscreen } from '@background/offscreen-client.js'
import { commandAudioAsHTML } from './audio-as-html.js'
import { commandFrameLinkAsAsciiDoc } from './frame-link-as-ascii-doc.js'
import { commandFrameLinkAsBBCode } from './frame-link-as-bbcode.js'
import { commandFrameLinkAsHTML } from './frame-link-as-html.js'
import { commandFrameLinkAsMarkdown } from './frame-link-as-markdown.js'
import { commandFrameLinkAsOrgMode } from './frame-link-as-org-mode.js'
import { commandFrameLinkAsPlainText } from './frame-link-as-plain-text.js'
import { commandFrameLinkAsRichText } from './frame-link-as-rich-text.js'
import { commandImageAsBBCode } from './image-as-bbcode.js'
import { commandImageAsDataURL } from './image-as-data-url.js'
import { commandImageAsHTML } from './image-as-html.js'
import { commandImageAsMarkdown } from './image-as-markdown.js'
import { commandLinkAsAsciiDoc } from './link-as-ascii-doc.js'
import { commandLinkAsBBCode } from './link-as-bbcode.js'
import { commandLinkAsHTML } from './link-as-html.js'
import { commandLinkAsMarkdown } from './link-as-markdown.js'
import { commandLinkAsOrgMode } from './link-as-org-mode.js'
import { commandLinkAsPlainText } from './link-as-plain-text.js'
import { commandLinkAsRichText } from './link-as-rich-text.js'
import { commandLinkText } from './link-text.js'
import { commandSelectionAsBBCode } from './selection-as-bbcode.js'
import { commandSelectionAsCleanHTML } from './selection-as-clean-html.js'
import { commandSelectionAsHTMLWithoutAttributes } from './selection-as-html-without-attributes.js'
import { commandSelectionAsHTML } from './selection-as-html.js'
import { commandSelectionAsJSON } from './selection-as-json.js'
import { commandSelectionAsMarkdown } from './selection-as-markdown.js'
import { commandSelectionAsPlainText } from './selection-as-plain-text.js'
import { commandTabLinkAsAsciiDoc } from './tab-link-as-ascii-doc.js'
import { commandTabLinkAsBBCode } from './tab-link-as-bbcode.js'
import { commandTabLinkAsHTML } from './tab-link-as-html.js'
import { commandTabLinkAsMarkdown } from './tab-link-as-markdown.js'
import { commandTabLinkAsOrgMode } from './tab-link-as-org-mode.js'
import { commandTabLinkAsPlainText } from './tab-link-as-plain-text.js'
import { commandTabLinkAsRichText } from './tab-link-as-rich-text.js'
import { CommandHandler, CommandResult, CommandResultType } from './types.js'
import { commandVideoAsHTML } from './video-as-html.js'

interface ICommandHandlers {
  [id: string]: CommandHandler
}

export const commandHandlers: ICommandHandlers = {
  commandTabLinkAsPlainText
, commandTabLinkAsRichText
, commandTabLinkAsHTML
, commandTabLinkAsMarkdown
, commandTabLinkAsOrgMode
, commandTabLinkAsAsciiDoc
, commandTabLinkAsBBCode

, commandFrameLinkAsPlainText
, commandFrameLinkAsRichText
, commandFrameLinkAsHTML
, commandFrameLinkAsMarkdown
, commandFrameLinkAsOrgMode
, commandFrameLinkAsAsciiDoc
, commandFrameLinkAsBBCode

, commandLinkText
, commandLinkAsPlainText
, commandLinkAsRichText
, commandLinkAsHTML
, commandLinkAsMarkdown
, commandLinkAsOrgMode
, commandLinkAsAsciiDoc
, commandLinkAsBBCode

, commandSelectionAsPlainText
, commandSelectionAsJSON
, commandSelectionAsMarkdown
, commandSelectionAsHTML
, commandSelectionAsHTMLWithoutAttributes
, commandSelectionAsCleanHTML
, commandSelectionAsBBCode

, commandImageAsHTML
, commandImageAsMarkdown
, commandImageAsBBCode
, commandImageAsDataURL

, commandAudioAsHTML

, commandVideoAsHTML
}

export async function handleCommandResult(result: CommandResult): Promise<void> {
  switch (result.type) {
    case CommandResultType.PlainText: {
      await offscreen.writeTextToClipboard(result.content)
      break
    }
    case CommandResultType.RichText: {
      await offscreen.writeHTMLToClipboard(result.content)
    }
  }
}
