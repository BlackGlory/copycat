import TurndownService, { Options } from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

function createTurndownService(options: Options = {}) {
  return new TurndownService({
    headingStyle: 'atx'
  , hr: '---'
  , bulletListMarker: '*'
  , codeBlockStyle: 'fenced'
  , fence: '```'
  , emDelimiter: '*'
  , strongDelimiter: '**'
  , linkStyle: 'inlined'
  , keepReplacement(content: string): string {
      return content
    }
  }).use(gfm)
}

export function convertHtmlToGfmMarkdown(html: string): string {
  const turndownService = createTurndownService()
  return turndownService.turndown(html)
}
