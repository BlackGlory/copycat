declare module 'turndown-plugin-gfm' {
  export function strikethrough(turndownService: Turndown.TurndownService): void
  export function highlightedCodeBlock(turndownService: Turndown.TurndownService): void
  export function tables(turndownService: Turndown.TurndownService): void
  export function taskListItems(turndownService: Turndown.TurndownService): void
  export function gfm(turndownService: Turndown.TurndownService): void
}
