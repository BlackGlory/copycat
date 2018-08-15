import TurndownService = require('turndown/lib/turndown.cjs')
import { tables, highlightedCodeBlock } from 'turndown-plugin-gfm'

function createTurndownService(options: Turndown.TurndownServiceOptions = {}) {
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
  }).use(tables)
    .use(highlightedCodeBlock)
    .addRule('strikethrough', {
      filter: ['del', 's', 'strike'],
      replacement(content) {
        return '~~' + content + '~~'
      }
    })
}

export function convertHtmlToGhostMarkdown(html: string): string {
  const turndownService = createTurndownService()
  return turndownService.turndown(html)
}
