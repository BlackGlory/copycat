import { MarkdownFlavor } from '@src/contract.js'
import { getConfig } from './storage.js'
import { offscreenClient } from './offscreen-client.js'

export async function convertHTMLToMarkdown(
  html: string
): Promise<string> {
  const { markdownFlavor } = await getConfig()

  switch (markdownFlavor) {
    case MarkdownFlavor.Commonmark:
      return await offscreenClient.convertHTMLToCommonmarkMarkdown(html)
    case MarkdownFlavor.GFM:
      return await offscreenClient.convertHTMLToGfmMarkdown(html)
    case MarkdownFlavor.Ghost:
      return await offscreenClient.convertHTMLToGhostMarkdown(html)
  }
}
