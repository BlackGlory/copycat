import { createTurndownService as createCommonmarkTurndownService, defaultReplacement } from './commonmark'
import TurndownService from 'turndown'

export function createTurndownService(options: Turndown.TurndownServiceOptions = {}) {
  return createCommonmarkTurndownService(options).use(strikethrough)
}

export function strikethrough(turndownService: TurndownService) {
  turndownService.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],
    replacement(content) {
      return '~~' + content + '~~'
    }
  })
}

export function toMarkdown(html: string): string {
  const turndownService = createTurndownService()
  return turndownService.turndown(html)
}

export function toMarkdownWithHtmlTags(html: string): string {
  const turndownService = createTurndownService({ defaultReplacement })
  return turndownService.turndown(html)
}
