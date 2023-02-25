import { CommandResultType, CommandResult } from './types.js'

export function plainText(content: string): CommandResult {
  return {
    type: CommandResultType.PlainText
  , content
  }
}

export function richText(content: string): CommandResult {
  return {
    type: CommandResultType.RichText
  , content
  }
}
