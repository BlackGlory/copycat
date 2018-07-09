import { createTurndownService as createCommonmarkTurndownService, defaultReplacement } from './commonmark'
import { gfm } from 'turndown-plugin-gfm'

export function createTurndownService(options: Turndown.TurndownServiceOptions = {}) {
  return createCommonmarkTurndownService().use(gfm)
}

export function toMarkdown(html: string): string {
  const turndownService = createTurndownService()
  return turndownService.turndown(html)
}

export function toMarkdownWithHtmlTags(html: string): string {
  const turndownService = createTurndownService({ defaultReplacement })
  return turndownService.turndown(html)
}
