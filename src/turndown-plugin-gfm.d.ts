declare module 'turndown-plugin-gfm' {
  import TurndownService from 'turndown'

  export function strikethrough(turndownService: TurndownService): void
  export function highlightedCodeBlock(turndownService: TurndownService): void
  export function tables(turndownService: TurndownService): void
  export function taskListItems(turndownService: TurndownService): void
  export function gfm(turndownService: TurndownService): void
}
