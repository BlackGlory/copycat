import { loadConfigure } from '@src/configure'
import { convertHtmlToCommonmarkMarkdown } from './commonmark'
import { convertHtmlToGfmMarkdown } from './gfm'
import { convertHtmlToGhostMarkdown } from './ghost'

export function convertHtmlToMarkdown(html: string): string {
  const { markdownFlavor } = loadConfigure()
  switch (markdownFlavor) {
    case 'commonmark':
      return convertHtmlToCommonmarkMarkdown(html)
    case 'gfm':
      return convertHtmlToGfmMarkdown(html)
    case 'ghost':
      return convertHtmlToGhostMarkdown(html)
  }
}
