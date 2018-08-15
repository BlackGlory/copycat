function removeExtraLine(text: string): string {
  return text.replace(/^\s+^/mg, '\n').replace(/$\s+$/mg, '\n')
}

function removeLineTailBlank(text: string) {
  return text.split('\n').map(line => line.trimRight()).join('\n')
}

export function convertMarkdownToBeautifyMarkdown(markdown: string): string {
  return removeExtraLine(removeLineTailBlank(markdown))
}

export default convertMarkdownToBeautifyMarkdown
