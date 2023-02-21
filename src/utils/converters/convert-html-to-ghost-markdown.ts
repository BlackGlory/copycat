import TurndownService from 'turndown'
import { tables, highlightedCodeBlock } from 'turndown-plugin-gfm'

export function convertHtmlToGhostMarkdown(html: string): string {
  const turndownService = createTurndownService()
  return turndownService.turndown(html)
}

function createTurndownService() {
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
      // @ts-ignore
      filter: ['del', 's', 'strike'],
      replacement(content) {
        return '~~' + content + '~~'
      }
    })
}
