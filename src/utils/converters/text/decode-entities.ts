import * as ent from 'ent'

export function convertTextToDecodeEntitiesText(text: string): string {
  return ent.decode(text)
}
