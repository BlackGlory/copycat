import TurndownService from 'turndown'

export function createTurndownService(options: Turndown.TurndownServiceOptions = {}) {
  return new TurndownService({
    headingStyle: 'atx'
  , hr: '---'
  , bulletListMarker: '*'
  , codeBlockStyle: 'fenced'
  , fence: '```'
  , emDelimiter: '*'
  , strongDelimiter: '**'
  , linkStyle: 'inlined'
  , ...options
  })
}

export function defaultReplacement(innerHTML: string, node: Turndown.Node) {
  return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
}

export function toMarkdown(html: string): string {
  const turndownService = createTurndownService()
    .addRule('strikethrough', {
      filter: ['del', 's', 'strike'],
      replacement(content) {
        return '~~' + content + '~~'
      }
    })
  return turndownService.turndown(html)
}

export function toMarkdownWithHtmlTags(html: string): string {
  const turndownService = createTurndownService({ defaultReplacement })
  return turndownService.turndown(html)
}
