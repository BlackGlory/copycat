import TurndownService, { Options } from 'turndown'

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
  }).addRule('strikethrough', {
    // @ts-ignore
    filter: ['del', 's', 'strike'],
    replacement(content) {
      return '~~' + content + '~~'
    }
  })
}

export function convertHtmlToCommonmarkMarkdown(html: string): string {
  const turndownService = createTurndownService()
  return turndownService.turndown(html)
}
