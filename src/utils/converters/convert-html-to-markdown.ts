import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkStringify from 'remark-stringify'
import remarkGfm from 'remark-gfm'

export async function convertHTMLToMarkdown(html: string): Promise<string> {
  const file = await unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify, {
      bullet: '*'
    , fence: '`'
    , fences: true
    , emphasis: '*'
    , strong: '*'
    , incrementListMarker: true
    , rule: '-'
    })
    .process(html)

  return file
    .toString()
    .trim()
}
