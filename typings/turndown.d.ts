declare module 'turndown' {
  export default Turndown.TurndownService
}

declare namespace Turndown {
  class TurndownService {
    constructor(options?: TurndownServiceOptions)
    addRule(key: string, rule: Rule): this
    escape(string: string): string
    keep(filter: Filter): this
    remove(filter: Filter): this
    turndown(input: string): string
    use(plugin: Plugin|Plugin[]): this
  }

  interface Node extends HTMLElement {
    isBlock: boolean
    isCode: boolean
    isBlank: boolean
    flankingWhitespace: boolean
  }

  type Filter = string|string[]|((node: Node, options: TurndownServiceOptions) => boolean)
  type Replacement = (content: string, node: Node, options: any) => string
  type Plugin = (turndownService: TurndownService) => void

  interface TurndownServiceOptions {
    headingStyle?: 'setext'|'atx'
    hr?: '***'|'---'|'___'
    bulletListMarker?: '-'|'+'|'*'
    codeBlockStyle?: 'indented'|'fenced'
    fence?: '```'|'~~~'
    emDelimiter?: '_'|'*'
    strongDelimiter?: '**'|'__'
    linkStyle?: 'inlined'|'referenced'
    linkReferenceStyle?: 'full'|'collapsed'|'shortcut'
    blankReplacement?: Replacement
    keepReplacement?: Replacement
    defaultReplacement?: Replacement
  }

  interface Rule {
    filter: Filter
    replacement: Replacement
  }
}
