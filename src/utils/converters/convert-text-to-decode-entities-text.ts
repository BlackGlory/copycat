import { decode } from 'entities'

export function convertTextToDecodeEntitiesText(text: string): string {
  return decode(text)
}
