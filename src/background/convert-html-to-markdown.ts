import { MarkdownFlavor } from '@src/contract.js'
import { getConfig } from './storage.js'
import { offscreenClient } from './offscreen-client.js'

export async function convertHtmlToMarkdown(
  html: string
): Promise<string> {
  const { markdownFlavor } = await getConfig()

  switch (markdownFlavor) {
    case MarkdownFlavor.Commonmark:
      return await offscreenClient.convertHtmlToCommonmarkMarkdown(html)
    case MarkdownFlavor.GFM:
      return await offscreenClient.convertHtmlToGfmMarkdown(html)
    case MarkdownFlavor.Ghost:
      return await offscreenClient.convertHtmlToGhostMarkdown(html)
  }
}
