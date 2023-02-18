import { loadConfigure, MarkdownFlavor } from '@src/config'
import { convertHtmlToCommonmarkMarkdown } from './commonmark'
import { convertHtmlToGfmMarkdown } from './gfm'
import { convertHtmlToGhostMarkdown } from './ghost'

export function convertHtmlToMarkdown(html: string): string {
  const { markdownFlavor } = loadConfigure()
  switch (markdownFlavor) {
    case MarkdownFlavor.Commonmark:
      return convertHtmlToCommonmarkMarkdown(html)
    case MarkdownFlavor.GFM:
      return convertHtmlToGfmMarkdown(html)
    case MarkdownFlavor.Ghost:
      return convertHtmlToGhostMarkdown(html)
  }
}
